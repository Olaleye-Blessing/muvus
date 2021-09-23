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
    results = [...getUniqueObjectList([...results], "id")];

    return (
        <AsideSectionLists header="Popular People">
            <LoadMoreContainer
                results={results}
                status={status}
                handleLoadMore={handleLoadMore}
                listContent={
                    <PopularMedia media={results} media_type="person" />
                }
                total_pages={total_pages}
                currentPage={currentPage}
                error={error}
            />
        </AsideSectionLists>
    );
};

export default HomePopularPeople;
