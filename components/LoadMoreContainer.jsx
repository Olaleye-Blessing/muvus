import LoadingIndicator from "./LoadingIndicator";

const LoadMoreContainer = ({
    results,
    status,
    handleLoadMore,
    listContent,
    total_pages,
    currentPage,
    error,
}) => {
    return (
        <>
            {results.length > 0 && listContent}
            {status === "error" && <div className="error">{error}</div>}
            {status === "fetched" && results.length === 0 && (
                <div className="error -mt-4 mb-4">No result found</div>
            )}
            {/* show load more if: data is fetched, there's more than one page of total data and current page is less than total pages */}
            {status === "fetched" &&
                total_pages > 1 &&
                currentPage < total_pages && (
                    <div className="load__more-cont">
                        <button
                            className="btn__outline btn__outline-red load__more-btn"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )}
            {status === "fetching" && <LoadingIndicator />}
        </>
    );
};

export default LoadMoreContainer;
