import { useState, useEffect } from 'react';

import styles from './ScrollToTop.module.scss';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300 && window.innerWidth >= 1200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            type="button"
            className={styles.scrollBtn}
            onClick={scrollToTop}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            <span />
        </button>
    );
};

export default ScrollToTop;
