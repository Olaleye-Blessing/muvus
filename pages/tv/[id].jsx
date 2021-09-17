import { fetchData } from "../../utils/fetchData";
import { imageLoader } from "../../utils/imageLoader";
import Image from "next/image";
import MediaPageGenres from "../../components/MediaPageGenres";
import { useRouter } from "next/dist/client/router";
import { AiFillYoutube } from "react-icons/ai";
import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Modal from "../../components/Modal";

const TMDB_KEY = process.env.TMDB_KEY;

const movie = ({ data }) => {
    let router = useRouter();

    const [showTrailer, setShowTrailer] = useState(false);

    let {
        backdrop_path,
        poster_path,
        name,
        overview,
        first_air_date,
        genres,
        videos: { results: trailers },
    } = data;
    let src = backdrop_path || poster_path;

    genres = [...genres].map((genre) => ({
        ...genre,
        path: `/?cathegory=tv&genre=${genre.id}`,
    }));

    const handleGenreClicked = (path) => router.push(path);

    let youTubeTrailers = [...trailers].filter(
        ({ type, site }) => type === "Trailer" && site === "YouTube"
    );

    let youTubeTrailerId =
        youTubeTrailers.length > 0 ? youTubeTrailers[0].key : null;

    let youTubeUrl = `https://www.youtube.com/watch?v=${youTubeTrailerId}`;

    const handleModalClose = () => {
        setShowTrailer(false);
    };

    return (
        <main className="mediaPage">
            <figure className="mediaPage__img">
                <Image
                    loader={imageLoader}
                    layout="fill"
                    src={src}
                    objectFit="cover"
                />
            </figure>
            <section className="mediaPage__detail">
                <header className="mediaPage__header">
                    <h1 className="mediaPage__head">
                        <span className="mediaPage__title">{name}</span>
                        <span className="mediaPage__dot">.</span>
                        <span className="mediaPage__date">
                            {first_air_date}
                        </span>
                    </h1>
                </header>
                <p className="mediaPage__overview">{overview}</p>

                <MediaPageGenres
                    genres={genres}
                    handleGenreClicked={handleGenreClicked}
                />
                <section>
                    {youTubeTrailerId && (
                        <p>
                            <button
                                className="text-red-primary text-xl"
                                onClick={() => setShowTrailer(true)}
                            >
                                <AiFillYoutube />
                            </button>
                        </p>
                    )}

                    {showTrailer && (
                        <Modal title={name} handleModalClose={handleModalClose}>
                            <ReactPlayer
                                url={youTubeUrl}
                                onEnded={() => setShowTrailer(false)}
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={true}
                            />
                        </Modal>
                    )}
                </section>
            </section>
        </main>
    );
};

/*

*/

export const getServerSideProps = async (context) => {
    let { id } = context.query;

    let url = new URL(`https://api.themoviedb.org/3/tv/${id}`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("append_to_response", "videos");

    try {
        let result = await fetchData(url);
        return {
            props: {
                data: result,
            },
        };
    } catch (error) {
        return {
            props: {
                error,
            },
        };
    }
};

export default movie;
