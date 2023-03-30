import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={250}
        height={250}
        viewBox="0 0 240 243"
        backgroundColor="#dbdbdb"
        foregroundColor="#bababa"
    >
        <rect x="0" y="0" rx="4" ry="4" width="240" height="168" />
        <rect x="10" y="221" rx="4" ry="4" width="150" height="21" />
        <rect x="10" y="180" rx="4" ry="4" width="180" height="31" />
    </ContentLoader>
);

export default Skeleton;
