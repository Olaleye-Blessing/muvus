import AsideSectionLists from "../components/Aside/AsideSectionLists";
import LoadingIndicator from "../components/LoadingIndicator";
import LoadMoreContainer from "../components/LoadMoreContainer";
import { getUniqueObjectList } from "../utils/getUniqueObjectList";
import PopularMedia from "./PopularMedia";

const HomePopularPeople = ({
    popularPeopleDetail: { status, error, results, total_pages },
    currentPage,
    handleLoadMore,
}) => {
    if (status === "idle") return null;
    // console.log(results);
    results = [...getUniqueObjectList([...results], "id")];

    return (
        <AsideSectionLists header="Popular People">
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

export default HomePopularPeople;
