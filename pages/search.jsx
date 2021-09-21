import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import SearchResultContainer from "../modules/SearchResultContainer";

const Search = () => {
    let router = useRouter();
    let query = router.query.q;

    const [searchQueryDetail, setsearchQueryDetail] = useState({
        cathegory: "all",
    });

    let url = query && `/api/tmdb/search?q=${query}&page=${1}`;

    let result = useFetch(url);

    const handleSearchCathegoryChange = (cathegory) =>
        setsearchQueryDetail({ ...searchQueryDetail, cathegory });

    // this page just mounted
    if (result.status === "idle") return null;

    return (
        <main className="search">
            {query ? (
                <SearchResultContainer
                    searchQueryDetail={searchQueryDetail}
                    query={query}
                    handleSearchCathegoryChange={handleSearchCathegoryChange}
                    {...result}
                />
            ) : (
                <header>
                    <h2>Search for Something</h2>
                </header>
            )}
        </main>
    );
};

export default Search;
