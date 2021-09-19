import LoadingIndicator from "../components/LoadingIndicator";
import PopularMedia from "./PopularMedia";

const HomePopularPeople = ({
    popularMediaDetail: { loading, people, error, page, total_pages },
}) => {
    if (loading) return <LoadingIndicator />;

    return <PopularMedia cathegory="People" media={people} />;
};

export default HomePopularPeople;
