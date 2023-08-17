import { join } from 'node:path';
import { GuStack, GuStringParameter } from '@guardian/cdk/lib/constructs/core';
import {
	GuSecurityGroup,
	GuVpc,
	SubnetType,
} from '@guardian/cdk/lib/constructs/ec2';
import {
	GuAllowPolicy,
	GuInstanceRole,
} from '@guardian/cdk/lib/constructs/iam';
import { GuClassicLoadBalancer } from '@guardian/cdk/lib/constructs/loadbalancing';
import type { App } from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import { LoadBalancingProtocol } from 'aws-cdk-lib/aws-elasticloadbalancing';
import { CfnInclude } from 'aws-cdk-lib/cloudformation-include';
import type { DCRProps } from './types';

export class DotcomRendering extends GuStack {
	constructor(scope: App, id: string, props: DCRProps) {
		super(scope, id, props);

		const { app, region, stack, stage } = props;

		const ssmPrefix = `/${stage}/${stack}/${app}`;

		// This fetches the VPC using the SSM parameter defined for this account
		// and specifies the CIDR block to use with it here
		const vpcCidrBlock = '10.248.136.0/22';
		const vpc = GuVpc.fromIdParameter(this, 'vpc', { vpcCidrBlock });
		const publicSubnets = GuVpc.subnetsFromParameter(this, {
			type: SubnetType.PUBLIC,
		});

		const lbSecurityGroup = new GuSecurityGroup(
			this,
			'InternalLoadBalancerSecurityGroup',
			{
				app,
				description:
					'Allows HTTP and HTTPS inbound connections from within the VPC',
				vpc,
				ingresses: [
					{
						range: Peer.ipv4(vpc.vpcCidrBlock),
						port: 80,
						description: 'TCP 80 ingress',
					},
					{
						range: Peer.ipv4(vpc.vpcCidrBlock),
						port: 443,
						description: 'TCP 443 ingress',
					},
				],
			},
		);
		this.overrideLogicalId(lbSecurityGroup, {
			logicalId: 'InternalLoadBalancerSecurityGroup',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const loadBalancer = new GuClassicLoadBalancer(
			this,
			'InternalLoadBalancer',
			{
				app,
				vpc,
				accessLoggingPolicy: {
					enabled: true,
					s3BucketName: new GuStringParameter(
						this,
						'ELBLogsParameter',
						{
							default: `${ssmPrefix}/elb.logs.bucketName`,
							fromSSM: true,
							description: 'S3 Bucket Name for ELB logs',
						},
					).valueAsString,
					emitInterval: 5,
					s3BucketPrefix: `ELBLogs/${stack}/${app}/${stage}`,
				},
				crossZone: true,
				healthCheck: {
					interval: Duration.seconds(30),
					port: 9000,
					protocol: LoadBalancingProtocol.HTTP,
					timeout: Duration.seconds(10),
					healthyThreshold: 2,
					unhealthyThreshold: 10,
					path: '/_healthcheck',
				},
				listeners: [
					{
						externalPort: 80,
						externalProtocol: LoadBalancingProtocol.HTTP,
						internalPort: 9000,
						internalProtocol: LoadBalancingProtocol.HTTP,
					},
				],
				subnetSelection: { subnets: publicSubnets },
				propertiesToOverride: {
					LoadBalancerName: `${stack}-${stage}-${app}-ELB`,
					// Note: this does not prevent the GuClassicLoadBalancer
					// from creating a default security group, though it does
					// override which one is used/associated with the load balancer
					SecurityGroups: [lbSecurityGroup.securityGroupId],
				},
			},
		);
		this.overrideLogicalId(loadBalancer, {
			logicalId: 'InternalLoadBalancer',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const instanceSecurityGroup = new GuSecurityGroup(
			this,
			'InstanceSecurityGroup',
			{
				app,
				description: 'rendering instance',
				vpc,
				ingresses: [
					{
						range: Peer.ipv4(vpcCidrBlock),
						port: 9000,
						description: 'TCP 9000 ingress',
					},
				],
			},
		);
		this.overrideLogicalId(instanceSecurityGroup, {
			logicalId: 'InstanceSecurityGroup',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const instanceRole = new GuInstanceRole(this, {
			app,
			additionalPolicies: [
				//todo: do we need the first two policies? They are provided by default?
				new GuAllowPolicy(this, 'AllowPolicyGetArtifactsBucket', {
					actions: ['s3:GetObject'],
					resources: ['arn:aws:s3:::aws-frontend-artifacts/*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyCloudwatchLogs', {
					actions: ['cloudwatch:*', 'logs:*'],
					resources: ['*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeEc2Autoscaling', {
					actions: [
						'ec2:DescribeTags',
						'ec2:DescribeInstances',
						'autoscaling:DescribeAutoScalingGroups',
						'autoscaling:DescribeAutoScalingInstances',
					],
					resources: ['*'],
				}),
				new GuAllowPolicy(this, 'AllowPolicyDescribeDecryptKms', {
					actions: ['kms:Decrypt', 'kms:DescribeKey'],
					resources: [
						`arn:aws:kms:${region}:${this.account}:FrontendConfigKey`,
					],
				}),
				new GuAllowPolicy(this, 'AllowPolicyGetSsmParamsByPath', {
					actions: ['ssm:GetParametersByPath', 'ssm:GetParameter'],
					resources: [
						`arn:aws:ssm:${region}:${this.account}:parameter/frontend/*`,
						`arn:aws:ssm:${region}:${this.account}:parameter/dotcom/*`,
					],
				}),
			],
		});
		this.overrideLogicalId(instanceRole, {
			logicalId: 'InstanceRole',
			reason: 'Retaining a stateful resource previously defined in YAML',
		});

		const yamlTemplateFilePath = join(
			__dirname,
			'../..',
			'cloudformation.yml',
		);

		new CfnInclude(this, 'YamlTemplate', {
			templateFile: yamlTemplateFilePath,
			parameters: {
				VpcId: vpc.vpcId,
				InstanceSecurityGroup: instanceSecurityGroup.securityGroupId,
				InternalLoadBalancer: loadBalancer.loadBalancerName,
				InstanceRole: instanceRole.roleName,
			},
		});

		new CfnOutput(this, 'LoadBalancerUrl', {
			value: loadBalancer.loadBalancerDnsName,
		});
	}
}
