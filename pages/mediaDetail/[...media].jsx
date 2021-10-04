import Head from "next/head";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import MediaPageGenres from "../../components/MediaPageGenres";
import Modal from "../../components/Modal";
import { fetchData } from "../../utils/fetchData";
import { imageLoader } from "../../utils/imageLoader";

const TMDB_KEY = process.env.TMDB_KEY;

const Detail = ({ data: { result, category } }) => {
    let router = useRouter();
    const [showTrailer, setShowTrailer] = useState(false);

    let {
        backdrop_path,
        poster_path,
        title,
        name,
        overview,
        release_date,
        first_air_date,
        genres,
        videos,
        birthday,
        profile_path,
        biography,
    } = result;

    let src = backdrop_path || poster_path || profile_path;

    let trailers = null;
    let youTubeTrailers = [];

    if (category !== "person") {
        trailers = videos.results;

        genres = [...genres].map((genre) => ({
            ...genre,
            path: `/?category=${category}&genre=${genre.id}`,
        }));

        youTubeTrailers = [...trailers].filter(
            ({ type, site }) => type === "Trailer" && site === "YouTube"
        );
    }

    const handleGenreClicked = (path) => router.push(path);

    let youTubeTrailerId =
        youTubeTrailers.length > 0 ? youTubeTrailers[0].key : null;

    let youTubeUrl = `https://www.youtube.com/watch?v=${youTubeTrailerId}`;

    const handleModalClose = () => {
        setShowTrailer(false);
    };

    return (
        <>
            <Head>
                <title>
                    {`${
                        name || title
                    } || ${category.toUpperCase()} || MUVUS - All about movies, tv series, people and community
                    groups.`}
                </title>
            </Head>
            <main className="mediaPage">
                {src && (
                    <figure className="mediaPage__img">
                        <Image
                            loader={imageLoader}
                            layout="fill"
                            src={src}
                            objectFit="cover"
                        />
                    </figure>
                )}
                <section className="mediaPage__detail">
                    <header className="mediaPage__header">
                        <h1 className="mediaPage__head">
                            <span className="mediaPage__title">
                                {title || name}
                            </span>
                            <span className="mediaPage__dot">.</span>
                            <span className="mediaPage__date">
                                {release_date || first_air_date || birthday}
                            </span>
                        </h1>
                    </header>
                    <p className="mediaPage__overview">
                        {overview || biography}
                    </p>

                    {category !== "person" && (
                        <>
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
                                    <Modal
                                        title={title || name}
                                        handleModalClose={handleModalClose}
                                    >
                                        <ReactPlayer
                                            url={youTubeUrl}
                                            onEnded={() =>
                                                setShowTrailer(false)
                                            }
                                            width="100%"
                                            height="100%"
                                            controls={true}
                                            playing={true}
                                        />
                                    </Modal>
                                )}
                            </section>
                        </>
                    )}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    let {
        media: [category, id],
    } = context.query;

    let url = new URL(`https://api.themoviedb.org/3/${category}/${id}`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set(
        "append_to_response",
        category === "person" ? "credits" : "videos"
    );

    try {
        let result = await fetchData(url);
        return {
            props: {
                data: { result, category },
                session,
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

export default Detail;
