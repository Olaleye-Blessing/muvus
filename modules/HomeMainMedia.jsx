import LoadingIndicator from "../components/LoadingIndicator";
import Media from "../components/Media";

const HomeMainMedia = ({ genreMedia: { results }, cathegory, genreName }) => {
    return (
        <section className="media__cont">
            <header>
                <h2 className="media__cont-header">
                    <span className="">{cathegory.toUpperCase()}</span> /{" "}
                    <span className="">{genreName}</span>
                </h2>
            </header>
            <ul className="media__lists">
                {results.map((media) => {
                    return (
                        <li
                            key={media.name || media.title}
                            className="media__list"
                        >
                            <Media {...media} />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default HomeMainMedia;
