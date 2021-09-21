import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import SearchResultContainer from "../modules/SearchResultContainer";
import { fetchData } from "../utils/fetchData";

const Search = () => {
    let router = useRouter();
    let query = router.query.q;

    const [searchQueryDetail, setsearchQueryDetail] = useState({
        cathegory: "all",
        loading: false,
        error: null,
        results: [],
        page: 1,
        total_pages: 1,
    });

    const handleSearchCathegoryChange = (cathegory) =>
        setsearchQueryDetail({ ...searchQueryDetail, cathegory });

    useEffect(() => {
        if (!query) return;

        let abortFetch = new AbortController();

        const fetchResult = async (e) => {
            setsearchQueryDetail({
                ...searchQueryDetail,
                page: 1,
                loading: true,
            });
            try {
                let {
                    data: { total_pages, results },
                } = await fetchData(
                    `/api/tmdb/search?q=${query}&page=${searchQueryDetail.page}`,
                    abortFetch.signal
                );
                setsearchQueryDetail({
                    ...searchQueryDetail,
                    loading: false,
                    total_pages,
                    results,
                });
            } catch (error) {
                setsearchQueryDetail({
                    ...searchQueryDetail,
                    loading: false,
                    error: error.message || "There was an error",
                });
                console.log(error);
            }
        };

        fetchResult();

        return () => abortFetch.abort();
    }, [query]);

    return (
        <main className="search">
            {query ? (
                <SearchResultContainer
                    searchQueryDetail={searchQueryDetail}
                    query={query}
                    handleSearchCathegoryChange={handleSearchCathegoryChange}
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
