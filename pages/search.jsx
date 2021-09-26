import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useLoadMore from "../hooks/useLoadMore";
import SearchResultContainer from "../modules/SearchResultContainer";

const Search = () => {
    let router = useRouter();
    let query = router.query.q;

    const [searchQueryDetail, setsearchQueryDetail] = useState({
        cathegory: "all",
        page: router.query.page || 1,
    });

    let url = query && `/api/tmdb/search?q=${query}`;

    let result = useLoadMore(url, searchQueryDetail.page);

    useEffect(() => {
        setsearchQueryDetail({ ...searchQueryDetail, page: 1 });
    }, [query]);

    const handleLoadMore = () => {
        setsearchQueryDetail((prev) => ({ ...prev, page: prev.page + 1 }));
    };

    const handleSearchCathegoryChange = (cathegory) =>
        setsearchQueryDetail({ ...searchQueryDetail, cathegory });

    // this page just mounted
    if (result.status === "idle") {
        if (!query) {
            return (
                <header className="mt-5 pl-5">
                    <h2>Search for Something</h2>
                </header>
            );
        }

        return null;
    }

    return (
        <main className="search">
            <SearchResultContainer
                searchQueryDetail={searchQueryDetail}
                query={query}
                handleSearchCathegoryChange={handleSearchCathegoryChange}
                handleLoadMore={handleLoadMore}
                {...result}
                currentPage={searchQueryDetail.page}
            />
        </main>
    );
};

export default Search;
