import { useAppContext } from "../context/appContext";

const SearchResultHeader = ({
    query,
    category,
    handleSearchCategoryChange,
}) => {
    let { handleRemoveSearchPage } = useAppContext();

    let cathegories = [
        { text: "All", category: "all" },
        { text: "Tv Shows", category: "tv" },
        { text: "Movies", category: "movie" },
        { text: "People", category: "person" },
    ];

    return (
        <header className="search__header">
            <div className="search__header-cont">
                <h1 className="search__header-title">
                    Search Result for{" "}
                    <span className="search__header-span">{query}</span>
                </h1>
                <div className="search__goHome">
                    <button
                        className="backHome"
                        onClick={handleRemoveSearchPage}
                    >
                        Go Home
                    </button>
                </div>
            </div>
            <ul className="cathegories">
                {cathegories.map(({ text, category: cath }) => (
                    <li key={text} className={`cathegories__list`}>
                        <button
                            className={`cathegories__btn ${
                                category === cath ? "btn-active" : ""
                            }`}
                            onClick={() => handleSearchCategoryChange(cath)}
                        >
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default SearchResultHeader;
