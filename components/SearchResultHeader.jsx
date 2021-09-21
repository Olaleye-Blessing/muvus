import { useAppContext } from "../context/appContext";

const SearchResultHeader = ({
    query,
    cathegory,
    handleSearchCathegoryChange,
}) => {
    let { handleRemoveSearchPage } = useAppContext();

    let cathegories = [
        { text: "All", cathegory: "all" },
        { text: "Tv Shows", cathegory: "tv" },
        { text: "Movies", cathegory: "movie" },
        { text: "People", cathegory: "person" },
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
                {cathegories.map(({ text, cathegory: cath }) => (
                    <li key={text} className={`cathegories__list`}>
                        <button
                            className={`cathegories__btn ${
                                cathegory === cath ? "btn-active" : ""
                            }`}
                            onClick={() => handleSearchCathegoryChange(cath)}
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
