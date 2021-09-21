import LoadingIndicator from "../components/LoadingIndicator";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultMain from "../components/SearchResultMain";

const SearchResultContainer = ({
    searchQueryDetail,
    query,
    handleSearchCathegoryChange,
    status,
    error,
    data,
}) => {
    return (
        <>
            <SearchResultHeader
                {...searchQueryDetail}
                query={query}
                handleSearchCathegoryChange={handleSearchCathegoryChange}
            />
            {status === "fetching" && <LoadingIndicator />}
            {status === "error" && <div>{error}</div>}
            {status === "fetched" && (
                <SearchResultMain {...searchQueryDetail} data={data} />
            )}
        </>
    );
};

export default SearchResultContainer;
