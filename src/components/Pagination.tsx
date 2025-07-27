import { setPage } from "../store/movieSlice";
import { fetchMovies } from "../store/movieThunk";
import { useAppDispatch } from "../store/store";
import './Pagination.css';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

export const Pagination = ({ totalItems, itemsPerPage, currentPage }: PaginationProps) => {
    const dispatch = useAppDispatch();

    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        dispatch(setPage(page));
        dispatch(fetchMovies());
        window.scrollTo({ top: 0, behavior: 'smooth'});
    };

    if (totalPages <= 1) return null;

    //рассчитываем диапазон стр для отображения
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    //корректируем диапазон если он слишком близок к краям
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination__button pagination__button--prev"
            aria-label="Previous page"
            >
                ← Previous
            </button>

            <div className="pagination__pages">
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="pagination__page"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="pagination__ellipsis">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`pagination__page ${
                            page === currentPage ? 'pagination__page-active' : ''
                        }`}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="pagination__ellipsis">...</span>
                        )}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="pagination__page"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination__button pagination__button--next"
            aria-label="Next page"
            >
                Next →
            </button>
        </div>
    );
};