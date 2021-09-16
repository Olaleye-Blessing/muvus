import MediaLists from "./../modules/MediaLists";
const SearchResultMain = ({ results, cathegory }) => {
    let filteredResults =
        cathegory !== "all"
            ? [...results].filter((media) => media.media_type === cathegory)
            : [...results];
    return (
        <section>
            {filteredResults.length === 0 ? (
                <div className="search__noresult">No Result Found</div>
            ) : (
                <MediaLists media={filteredResults} />
            )}
        </section>
    );
    // if (filteredResults.length === 0) {
    //     return (
    //         <section>
    //             <div>No Result Found</div>
    //         </section>
    //     );
    // }
    // return (
    //     <section>
    //         <MediaLists media={filteredResults} />
    //     </section>
    // );
};

export default SearchResultMain;
