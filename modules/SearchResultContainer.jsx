import LoadingIndicator from "../components/LoadingIndicator";
import LoadMoreContainer from "../components/LoadMoreContainer";
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

            <LoadMoreContainer
                results={filteredResults}
                status={status}
                handleLoadMore={handleLoadMore}
                listContent={
                    <SearchResultMain
                        {...searchQueryDetail}
                        results={filteredResults}
                    />
                }
                total_pages={total_pages}
                currentPage={currentPage}
                error={error}
            />
        </>
    );
};

export default SearchResultContainer;
