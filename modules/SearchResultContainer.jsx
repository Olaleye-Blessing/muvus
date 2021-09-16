import LoadingIndicator from "../components/LoadingIndicator";
import SearchResultHeader from "../components/SearchResultHeader";
import SearchResultMain from "../components/SearchResultMain";

const SearchResultContainer = ({ searchQueryDetail }) => {
    // if (searchQueryDetail.loading) return <LoadingIndicator />;

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
