import { Placeholder } from './Placeholder';

type ClientOnlyProps = {
	clientOnly: true;
	placeholderHeight?: number;
};

type NonClientOnlyProps = {
	clientOnly?: false;
	placeholderHeight?: never;
};

type DefaultProps = (ClientOnlyProps | NonClientOnlyProps) & {
	deferUntil?: never;
	rootMargin?: never;
	children: JSX.Element;
};

type VisibleProps = (ClientOnlyProps | NonClientOnlyProps) & {
	deferUntil: 'visible';
	rootMargin?: string;
	children: JSX.Element;
};

type IdleProps = (ClientOnlyProps | NonClientOnlyProps) & {
	deferUntil: 'idle';
	rootMargin?: never;
	children: JSX.Element;
};

type InteractionProps = {
	deferUntil: 'interaction';
	clientOnly?: never;
	placeholderHeight?: never;
	rootMargin?: never;
	children: JSX.Element;
};

type HashProps = {
	deferUntil: 'hash';
	clientOnly: true;
	placeholderHeight?: never;
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * Props
 *
 * We use a union type here to support conditional typing. This means you
 * can only supply placeholderHeight if clientOnly is true.
 */
type Props =
	| DefaultProps
	| VisibleProps
	| IdleProps
	| InteractionProps
	| HashProps;

const decideChildren = (
	children: JSX.Element,
	clientOnly?: boolean,
	placeholderHeight?: number,
) => {
	if (!clientOnly) return children; // Server side rendering
	if (placeholderHeight !== undefined && placeholderHeight > 0)
		return (
			<Placeholder
				height={placeholderHeight}
				shouldShimmer={false}
				backgroundColor="transparent"
			/>
		); // Portal using placeholder
	return null; // Portal not using placeholder (this also includes placeholderHeight === 0 - this is intentional)
};

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param {HydrateProps | ClientOnlyProps} props - JSX Props
 * @param {JSX.IntrinsicElements["gu-island"]} props.deferUntil - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 *      - interaction - Execute when component is clicked on in the viewport
 * @param {boolean} props.clientOnly - Should the component be server side rendered
 * @param {number} props.placeholderHeight - The height for the placeholder element
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element
 */
export const Island = ({
	deferUntil,
	clientOnly,
	placeholderHeight,
	rootMargin,
	children,
}: Props) => (
	<gu-island
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- Type definitions on children are limited
		name={children.type.name}
		deferUntil={deferUntil}
		props={JSON.stringify(children.props)}
		clientOnly={clientOnly}
		rootMargin={rootMargin}
	>
		{decideChildren(children, clientOnly, placeholderHeight)}
	</gu-island>
);

/**
 * If JavaScript is disabled, hide client-only islands
 */
export const islandNoscriptStyles = `
<style>
	gu-island[clientOnly=true] { display: none; }
</style>
`;
