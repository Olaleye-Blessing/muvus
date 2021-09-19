import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    let router = useRouter();
    const [searchQueryDetail, setsearchQueryDetail] = useState({
        query: "",
        cathegory: "all",
        showSearch: false,
        loading: false,
        error: null,
        results: [],
        page: 1,
        total_pages: 1,
    });

    const handleSearchQueryChange = (query) =>
        setsearchQueryDetail({ ...searchQueryDetail, query });

    const handleSearchCathegoryChange = (cathegory) =>
        setsearchQueryDetail({ ...searchQueryDetail, cathegory });

    const handleRemoveSearchPage = () => {
        setsearchQueryDetail({
            ...searchQueryDetail,
            showSearch: false,
            query: "",
        });
    };

    const handleOnSearch = async (e) => {
        e.preventDefault();

        if (router.pathname !== "/") {
            router.push("/");
        }

        setsearchQueryDetail({
            ...searchQueryDetail,
            loading: true,
            showSearch: true,
        });
        try {
            let {
                data: { total_pages, results },
            } = await fetchData(
                `/api/tmdb/search?q=${searchQueryDetail.query}&page=${searchQueryDetail.page}`
            );
            setsearchQueryDetail({
                ...searchQueryDetail,
                loading: false,
                total_pages,
                results,
                showSearch: true,
            });
        } catch (error) {
            setsearchQueryDetail({
                ...searchQueryDetail,
                loading: false,
                error: error.message || "There was an error",
                showSearch: true,
            });
            console.log(error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                searchQueryDetail,
                handleSearchQueryChange,
                handleOnSearch,
                handleSearchCathegoryChange,
                handleRemoveSearchPage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
