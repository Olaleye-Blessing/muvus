import SearchInput from "../components/SearchInput";
import { useAppContext } from "../context/appContext";

const NavSearchForm = ({ navSize }) => {
    let { handleOnSearch, handleSearchQueryChange, searchQueryDetail } =
        useAppContext();

    return (
        <form
            className={`nav__search-form ${navSize}`}
            onSubmit={handleOnSearch}
        >
            <SearchInput
                {...searchQueryDetail}
                handleSearchQueryChange={handleSearchQueryChange}
            />
        </form>
    );
};

NavSearchForm.defaultProps = {
    navSize: "nav__search-form-sm",
};

export default NavSearchForm;
