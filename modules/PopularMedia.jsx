import SmallThumbnail from "../components/SmallThumbnail";

const PopularMedia = ({ cathegory, media }) => {
    return (
        <section className="popular__media">
            <header className="popular__media-header">
                <h3>Popular {cathegory}</h3>
            </header>
            <ul className="popular__media-lists">
                {media.map((medium) => (
                    <li key={medium.id} className="popular__media-list">
                        <SmallThumbnail {...medium} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PopularMedia;
