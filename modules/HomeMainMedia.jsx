import LoadingIndicator from "../components/LoadingIndicator";
// import Media from "../components/Media";
import MediaLists from "./MediaLists";

const HomeMainMedia = ({ genreMedia: { results }, category, genreName }) => {
    results = [...results].map((medium) => ({
        ...medium,
        media_type: category,
    }));

    return (
        <section className="media__cont">
            <header>
                <h2 className="media__cont-header">
                    <span className="">{category.toUpperCase()}</span> /{" "}
                    <span className="">{genreName}</span>
                </h2>
            </header>
            <MediaLists media={results} />
        </section>
    );
};

export default HomeMainMedia;
