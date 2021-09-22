import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
    let router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchQueryChange = (query) => setSearchQuery(query);

    const handleRemoveSearchPage = () => {
        setSearchQuery("");
        router.push("/");
    };

    const handleOnSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery) return;

        router.push(`/search?q=${searchQuery}`);
    };

    // remove search query upon leaving search page
    useEffect(() => {
        if (router.pathname !== "/search") {
            setSearchQuery("");
        }
    }, [router.pathname]);

    return (
        <AppContext.Provider
            value={{
                searchQuery,
                handleSearchQueryChange,
                handleOnSearch,
                handleRemoveSearchPage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
