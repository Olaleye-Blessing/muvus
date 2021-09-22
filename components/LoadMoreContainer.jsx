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
