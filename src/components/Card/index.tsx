import { FC } from 'react';
import { CharData } from './types';

import styles from './Card.module.scss';

const Card: FC<CharData> = ({ name, species, image }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={name} />
            <h2>{name.length >= 17 ? `${name.slice(0, 18)}...` : name}</h2>
            <p>{species}</p>
        </div>
    );
};

export default Card;
