import LoadingIndicator from "../components/LoadingIndicator";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultMain from "../components/SearchResultMain";
import { getUniqueObjectList } from "../utils/getUniqueObjectList";

const SearchResultContainer = ({
    searchQueryDetail,
    query,
    handleSearchCathegoryChange,
    status,
    error,
    results,
    total_pages,
    currentPage,
    handleLoadMore,
}) => {
    results = [...getUniqueObjectList([...results], "id")];

    results = [...results].filter(
        ({ backdrop_path, poster_path, profile_path }) =>
            backdrop_path || poster_path || profile_path
    );

    let filteredResults =
        searchQueryDetail.cathegory !== "all"
            ? [...results].filter(
                  (media) => media.media_type === searchQueryDetail.cathegory
              )
            : [...results];

    return (
        <>
            <SearchResultHeader
                {...searchQueryDetail}
                query={query}
                handleSearchCathegoryChange={handleSearchCathegoryChange}
            />

            {filteredResults.length > 0 && (
                <SearchResultMain
                    {...searchQueryDetail}
                    results={filteredResults}
                />
            )}
            {status === "error" && <div className="error">{error}</div>}

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

export default SearchResultContainer;
