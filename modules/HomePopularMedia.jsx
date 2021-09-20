import AsideSectionLists from "../components/Aside/AsideSectionLists";
import LoadingIndicator from "../components/LoadingIndicator";
import { getGenreName } from "../utils/getGenreName";
import PopularMedia from "./PopularMedia";

const HomePopularMedia = ({
    popularMediaDetail: { loading, media, error, page, total_pages },
    cathegory,
    genres,
}) => {
    if (loading || genres.length === 0) {
        return <LoadingIndicator />;
    }

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
    // return <PopularMedia cathegory={cathegory} media={media} />;
};

export default HomePopularMedia;
