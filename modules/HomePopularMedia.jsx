import AsideSectionLists from "../components/Aside/AsideSectionLists";
import LoadingIndicator from "../components/LoadingIndicator";
import { getGenreName } from "../utils/getGenreName";
import PopularMedia from "./PopularMedia";

const HomePopularMedia = ({ popularMediaDetail, cathegory, genres }) => {
    if (popularMediaDetail.status === "null") return null;

    if (popularMediaDetail.status === "fetching" || !genres) {
        return <LoadingIndicator />;
    }

    let {
        data: {
            data: { popularMedia: media },
        },
    } = popularMediaDetail;

    const genreStrings = (genre_ids) =>
        genre_ids
            .map((id) => getGenreName(genres, id))
            .slice(0, 2)
            .join(", ");

    media = [...media].map((medium) => {
        let genreString = genreStrings(medium.genre_ids);
        return { ...medium, genreString };
    });

    return (
        <AsideSectionLists header={`Popular ${cathegory}`}>
            <PopularMedia media={media} />
        </AsideSectionLists>
    );
};

export default HomePopularMedia;
