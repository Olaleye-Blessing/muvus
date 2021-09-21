import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useState } from "react";

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
        console.log({ for: searchQuery });

        if (!searchQuery) return;

        router.push(`/search?q=${searchQuery}`);
    };

    console.log(searchQuery);
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
