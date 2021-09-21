import LoadingIndicator from "../components/LoadingIndicator";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultMain from "../components/SearchResultMain";

const SearchResultContainer = ({
    searchQueryDetail,
    query,
    handleSearchCathegoryChange,
}) => {
    return (
        <>
            <SearchResultHeader
                {...searchQueryDetail}
                query={query}
                handleSearchCathegoryChange={handleSearchCathegoryChange}
            />
            {searchQueryDetail.loading && <LoadingIndicator />}
            {!searchQueryDetail.loading && (
                <SearchResultMain {...searchQueryDetail} />
            )}
        </>
    );
};

export default SearchResultContainer;
