import { getUniqueObjectList } from "../utils/getUniqueObjectList";
import MediaLists from "./../modules/MediaLists";
const SearchResultMain = ({ cathegory, results }) => {
    // results = [...getUniqueObjectList([...results], "id")];

    // results = [...results].filter(
    //     ({ backdrop_path, poster_path, profile_path }) =>
    //         backdrop_path || poster_path || profile_path
    // );

    // let filteredResults =
    //     cathegory !== "all"
    //         ? [...results].filter((media) => media.media_type === cathegory)
    //         : [...results];
    return (
        <section>
            {results.length === 0 ? (
                <div className="search__noresult">No Result Found</div>
            ) : (
                <MediaLists media={results} />
            )}
        </section>
    );
};

export default SearchResultMain;
