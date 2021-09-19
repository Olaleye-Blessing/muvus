import LoadingIndicator from "../components/LoadingIndicator";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultMain from "../components/SearchResultMain";

const SearchResultContainer = ({ searchQueryDetail }) => {
    return (
        <main className="search">
            <SearchResultHeader {...searchQueryDetail} />
            {searchQueryDetail.loading && <LoadingIndicator />}
            {!searchQueryDetail.loading && (
                <SearchResultMain {...searchQueryDetail} />
            )}
        </main>
    );
};

export default SearchResultContainer;
