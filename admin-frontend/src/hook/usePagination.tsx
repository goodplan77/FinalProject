import { useState } from 'react';

function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.max(0, indexOfLastItem - itemsPerPage);
    const currentItems = data.slice(indexOfFirstItem, Math.min(indexOfLastItem, totalItems));

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return {
        currentItems,
        totalPages,
        currentPage,
        goToPage,
    };
}

export default usePagination;
