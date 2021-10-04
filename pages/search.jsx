import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useLoadMore from "../hooks/useLoadMore";
import SearchResultContainer from "../modules/SearchResultContainer";

const Search = () => {
    let router = useRouter();
    let query = router.query.q;

    const [searchQueryDetail, setsearchQueryDetail] = useState({
        category: "all",
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

    const handleSearchCategoryChange = (category) =>
        setsearchQueryDetail({ ...searchQueryDetail, category });

    // this page just mounted
    if (result.status === "idle") {
        if (!query) {
            return (
                <>
                    <Head>
                        <title>No Search Query, no results</title>
                    </Head>
                    <header className="mt-5 pl-5">
                        <h2>Search for Something</h2>
                    </header>
                </>
            );
        }

        return null;
    }

    return (
        <>
            <Head>
                <title>{`Search: "${query}"`}</title>
            </Head>
            <main className="search">
                <SearchResultContainer
                    searchQueryDetail={searchQueryDetail}
                    query={query}
                    handleSearchCategoryChange={handleSearchCategoryChange}
                    handleLoadMore={handleLoadMore}
                    {...result}
                    currentPage={searchQueryDetail.page}
                />
            </main>
        </>
    );
};

export default Search;
