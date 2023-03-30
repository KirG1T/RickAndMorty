import { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);

    const goToPage = (pageNumber) => {
        onPageChange(pageNumber);

        // Update visible pages
        let newVisiblePages = [...visiblePages];
        if (pageNumber === 1) {
            newVisiblePages = [1, 2, 3, 4, 5];
        } else if (pageNumber === totalPages) {
            newVisiblePages = [
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        } else if (pageNumber === visiblePages[0] + 1) {
            newVisiblePages.shift();
            newVisiblePages.push(pageNumber + 2);
        } else if (pageNumber === visiblePages[visiblePages.length - 1] - 1) {
            newVisiblePages.pop();
            newVisiblePages.unshift(pageNumber - 2);
        }
        setVisiblePages(newVisiblePages);
    };

    return (
        <>
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            >
                Prev
            </button>
            {visiblePages[0] > 1 && <span>...</span>}
            {visiblePages.map((pageNumber) => (
                <button
                    type="button"
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    disabled={currentPage === pageNumber}
                >
                    {pageNumber}
                </button>
            ))}
            {visiblePages[visiblePages.length - 1] < totalPages && (
                <span>...</span>
            )}
            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        </>
    );
};
