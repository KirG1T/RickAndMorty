import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
    return (
        <div className={styles.root}>
            <h1>🙃</h1>
            <h2>Nothing found</h2>
            <p>Sorry, this page is missing</p>
        </div>
    );
};

export default NotFoundBlock;
