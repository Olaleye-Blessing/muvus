import { RiSearch2Line } from "react-icons/ri";

const SearchInput = ({
    handleSearchQueryChange,
    query,
    cathegory,
    showSearch,
}) => {
    return (
        <div className="form__search-cont">
            <span className="nav__search-icon">
                <RiSearch2Line />
            </span>
            <input
                type="search"
                value={query}
                name="query"
                id="query"
                className="nav__search-input"
                onChange={(e) => handleSearchQueryChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
