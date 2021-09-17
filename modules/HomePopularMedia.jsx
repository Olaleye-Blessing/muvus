import LoadingIndicator from "../components/LoadingIndicator";
import SmallThumbnail from "../components/SmallThumbnail";

const HomePopularMedia = ({
    popularMediaDetail: { loading, media, error, page, total_pages },
    cathegory,
    genres,
}) => {
    if (loading || genres.length === 0) {
        return <LoadingIndicator />;
    }

    return (
        <section className="popular__media">
            <header className="popular__media-header">
                <h3>Popular {cathegory}</h3>
            </header>
            <ul className="popular__media-lists">
                {media.map((medium) => (
                    <li
                        key={medium.name || medium.title}
                        className="popular__media-list"
                    >
                        <SmallThumbnail {...medium} genres={genres} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default HomePopularMedia;
