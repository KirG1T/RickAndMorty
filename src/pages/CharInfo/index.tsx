import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSelectedCharacter } from '../../api/axios';

import styles from './CharInfo.module.scss';

const CharInfo: FC = () => {
    const { id } = useParams();

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['character', id],
        queryFn: () => {
            if (typeof id === 'string') {
                return getSelectedCharacter(id);
            }
            return undefined;
        },
    });

    if (isError) {
        return <span>Error: {(error as Error).message}</span>;
    }

    return (
        <>
            <Link to="/" className={styles.link}>
                <div className={styles.back}>
                    <button type="button">GO BACK</button>
                </div>
            </Link>

            {isLoading === false && (
                <div className={styles.char__container}>
                    <div className={styles.char__imageWrapper}>
                        <img src={data?.data.image} alt={data?.data.name} />
                    </div>
                    <h2 className={styles.char__name}>{data?.data.name}</h2>
                    <p className={styles.char__infoTitle}>Informations</p>
                    <div className={styles.char__infoWrapper}>
                        <div>
                            <h3>Gender</h3>
                            <span>{data?.data.gender}</span>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <span>{data?.data.status}</span>
                        </div>
                        <div>
                            <h3>Specie</h3>
                            <span>{data?.data.species}</span>
                        </div>
                        <div>
                            <h3>Origin</h3>
                            <span>{data?.data.origin?.name}</span>
                        </div>
                        <div>
                            <h3>Type</h3>
                            <span>
                                {data?.data.type ? data?.data.type : 'unknown'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CharInfo;
