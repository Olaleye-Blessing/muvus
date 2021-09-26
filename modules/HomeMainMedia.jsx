import LoadingIndicator from "../components/LoadingIndicator";
// import Media from "../components/Media";
import MediaLists from "./MediaLists";

const HomeMainMedia = ({ genreMedia: { results }, cathegory, genreName }) => {
    results = [...results].map((medium) => ({
        ...medium,
        media_type: cathegory,
    }));

    return (
        <section className="media__cont">
            <header>
                <h2 className="media__cont-header">
                    <span className="">{cathegory.toUpperCase()}</span> /{" "}
                    <span className="">{genreName}</span>
                </h2>
            </header>
            <MediaLists media={results} />
        </section>
    );
};

export default HomeMainMedia;
