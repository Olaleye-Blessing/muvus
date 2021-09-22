import AsideSectionLists from "../components/Aside/AsideSectionLists";
import LoadingIndicator from "../components/LoadingIndicator";
import LoadMoreContainer from "../components/LoadMoreContainer";
import { getGenreName } from "../utils/getGenreName";
import { getUniqueObjectList } from "../utils/getUniqueObjectList";
import PopularMedia from "./PopularMedia";

const HomePopularMedia = ({
    popularMediaDetail: { status, error, results, total_pages },
    cathegory,
    genres,
    handleLoadMore,
    currentPage,
}) => {
    if (status === "idle") return null;

    if (!genres) {
        return <LoadingIndicator />;
    }

    const genreStrings = (genre_ids) =>
        genre_ids
            .map((id) => getGenreName(genres, id))
            .slice(0, 2)
            .join(", ");

    results = [...results].map((medium) => {
        let genreString = genreStrings(medium.genre_ids);
        return { ...medium, genreString };
    });

    results = [...getUniqueObjectList([...results], "id")];

    return (
        <AsideSectionLists header={`Popular ${cathegory}`}>
            <LoadMoreContainer
                results={results}
                status={status}
                handleLoadMore={handleLoadMore}
                listContent={<PopularMedia media={results} />}
                total_pages={total_pages}
                currentPage={currentPage}
            />
            {/* {results.length > 0 && <PopularMedia media={results} />}
            {status === "fetched" &&
                total_pages > 1 &&
                currentPage < total_pages && (
                    <div className="load__more-cont">
                        <button
                            className="btn__outline btn__outline-red load__more-btn"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )}
            {status === "fetching" && <LoadingIndicator />} */}
        </AsideSectionLists>
    );
};

export default HomePopularMedia;
