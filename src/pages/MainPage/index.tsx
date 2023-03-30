/* eslint-disable no-nested-ternary */
import { FC, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';

import Title from '../../assets/Title.png';
import styles from './MainPage.module.scss';
import { getCharacters } from '../../api/axios';
import { CharData } from '../../components/Card/types';
import ScrollToTop from '../../components/ScrollToTop';

const MainPage: FC = () => {
    const [name, setName] = useState('');
    const [debouncedName, setDebouncedName] = useState('');

    const { isLoading, isError, data, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ['characters', debouncedName],
            queryFn: ({ pageParam = 1 }) =>
                getCharacters(pageParam, debouncedName),
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                return lastPage.data.info.next ? nextPage : undefined;
            },
            retry: false,
            keepPreviousData: true,
        });

    useEffect(() => {
        // Сохранение позиции скролла
        const storedPosition = localStorage.getItem('scrollPosition');
        if (storedPosition) {
            window.scrollTo(0, parseInt(storedPosition, 10));
        }

        // Реализация бесконечного скролла
        let fetching = false;

        const onScroll = async () => {
            const { scrollingElement } = document;

            if (scrollingElement) {
                const { scrollHeight, scrollTop, clientHeight } =
                    scrollingElement;

                if (!fetching && scrollHeight - scrollTop <= clientHeight) {
                    fetching = true;
                    if (hasNextPage) await fetchNextPage();

                    fetching = false;
                }
            }
        };

        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [fetchNextPage, hasNextPage]);

    useEffect(() => {
        let fetching = false;

        const onTouchMove = async () => {
            const { scrollingElement } = document;

            if (scrollingElement) {
                const { scrollHeight, scrollTop, clientHeight } =
                    scrollingElement;

                const isEndOfPage =
                    scrollHeight - scrollTop <= clientHeight + 1;

                if (!fetching && isEndOfPage && hasNextPage) {
                    fetching = true;
                    await fetchNextPage();
                    fetching = false;
                }
            }
        };

        document.addEventListener('touchmove', onTouchMove);

        return () => {
            document.removeEventListener('touchmove', onTouchMove);
        };
    }, [fetchNextPage, hasNextPage]);

    const updateSearchValue = useMemo(
        () =>
            debounce((str) => {
                setDebouncedName(str);
            }, 500),
        []
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        localStorage.setItem('name', inputText);
        if (/^[a-zA-Z0-9\s]*$/.test(inputText)) {
            setName(inputText.length > 0 ? inputText : '');
            updateSearchValue(inputText);
        }
    };

    // Установка кода из localStorage в стейт
    useEffect(() => {
        const nameInLocalStorage = localStorage.getItem('name');
        if (nameInLocalStorage) {
            setName(nameInLocalStorage);
            setDebouncedName(nameInLocalStorage);
        }
    }, []);

    // Код для удаления выделенного текста в инпуте
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
            const input = event.target as HTMLInputElement;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const { value } = input;

            if (start !== end && start && end) {
                event.preventDefault();
                input.value = value.slice(0, start) + value.slice(end);
                input.setSelectionRange(start, start);
            }
        }
    };

    // Сохранение позиции скролла
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset;
            localStorage.setItem('scrollPosition', scrollPosition.toString());
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <img src={Title} alt="Rick and Morty Title" />
                <div className={styles.input__wrapper}>
                    <input
                        value={name}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder="Filter by name..."
                        tabIndex={0}
                    />
                </div>
                <div className={!isError ? `${styles.grid__container}` : ''}>
                    {isLoading ? (
                        // eslint-disable-next-line react/no-array-index-key
                        [...new Array(20)].map((_, i) => <Skeleton key={i} />)
                    ) : !isError ? (
                        data.pages.map((page) => {
                            return page.data.results.map((char: CharData) => (
                                <Link
                                    to={`/character/${char.id}`}
                                    key={char.id}
                                    tabIndex={0}
                                >
                                    <Card
                                        id={char.id}
                                        name={char.name}
                                        species={char.species}
                                        image={char.image}
                                    />
                                </Link>
                            ));
                        })
                    ) : (
                        <span className={styles.notFound}>Not found</span>
                    )}
                </div>
            </div>
            <ScrollToTop />
        </>
    );
};

export default MainPage;
