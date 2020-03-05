import React from 'react';
import { css } from 'emotion';

import { border } from '@guardian/src-foundations/palette';

import { ShareCount } from '@frontend/web/components/ShareCount';
import { CommentCount } from '@frontend/web/components/CommentCount';
import { useApi } from '@root/src/web/lib/api';
import { formatCount } from '@root/src/web/lib/formatCount';
import { joinUrl } from '@root/src/web/lib/joinUrl';

type Props = {
    ajaxUrl: string;
    pageId: string;
    shortUrlId: string;
    pillar: Pillar;
};

type ShareCountType = {
    path: string;
    share_count: number;
    refreshStatus: boolean;
};

type CountType = {
    id: string;
    count: number;
};

type CommentCountsType = {
    counts: CountType[];
};

const containerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const NumbersBorder = () => (
    <div
        data-testid="numbers-border"
        className={css`
            height: 40px;
            margin-left: 4px;
            margin-right: 4px;
            border-left: 1px solid ${border.secondary};
        `}
    />
);

export const Counts = ({ ajaxUrl, pageId, shortUrlId, pillar }: Props) => {
    const shareUrl = joinUrl([ajaxUrl, 'sharecount', `${pageId}.json`]);
    const { data: shareData, error: shareError } = useApi<ShareCountType>(
        shareUrl,
    );

    const commentUrl = joinUrl([
        ajaxUrl,
        `discussion/comment-counts.json?shortUrls=${shortUrlId}`,
    ]);
    const { data: commentData, error: commentError } = useApi<
        CommentCountsType
    >(commentUrl);

    if (shareError) {
        window.guardian.modules.sentry.reportError(
            shareError,
            'share-comment-counts',
        );
    }

    if (commentError) {
        window.guardian.modules.sentry.reportError(
            commentError,
            'comment-count',
        );
    }

    // Or false because we use these vars to decide if to render or not and react sees 0 as truthy
    const hasShareData = (shareData && shareData.share_count) || false;
    const hasCommentData =
        (commentData &&
            commentData.counts &&
            commentData.counts[0] &&
            commentData.counts[0].count) ||
        false;
    if (!hasShareData && !hasCommentData) {
        return null;
    }

    const { short: shareShort, long: shareLong } = formatCount(
        (shareData && shareData.share_count) || 0,
    );

    const { short: commentShort, long: commentLong } = formatCount(
        (commentData &&
            commentData.counts &&
            commentData.counts[0] &&
            commentData.counts[0].count) ||
            0,
    );

    return (
        <div className={containerStyles}>
            {hasShareData && <ShareCount short={shareShort} long={shareLong} />}
            {hasShareData && hasCommentData && <NumbersBorder />}
            {hasCommentData && (
                <CommentCount
                    short={commentShort}
                    long={commentLong}
                    pillar={pillar}
                />
            )}
        </div>
    );
};
