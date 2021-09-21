import AsideSectionLists from "../components/Aside/AsideSectionLists";
import LoadingIndicator from "../components/LoadingIndicator";
import PopularMedia from "./PopularMedia";

const HomePopularPeople = ({
    popularPeopleDetail: { status, error, data },
}) => {
    if (status === "idle") return null;

    return (
        <AsideSectionLists header="Popular People">
            {status === "fetching" && <LoadingIndicator />}
            {status === "fetched" && (
                <PopularMedia media={data.data.popularMedia} />
            )}
        </AsideSectionLists>
    );
};

export default HomePopularPeople;
