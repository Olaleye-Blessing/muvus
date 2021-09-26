import Head from "next/head";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Aside from "../components/Aside/Index";
import useLoadMore from "../hooks/useLoadMore";
import HomeHeader from "../modules/HomeHeader";
import HomeMainMedia from "../modules/HomeMainMedia";
import HomePopularMedia from "../modules/HomePopularMedia";
import HomePopularPeople from "../modules/HomePopularPeople";
import useFetch from "./../hooks/useFetch";

const TMDB_KEY = process.env.TMDB_KEY;

const Home = ({ genreMedia, genreName }) => {
    let router = useRouter();

    const [cathegory, setCathegory] = useState(router.query.cathegory || "tv");

    const [popularPeoplePage, setPopularPeoplePage] = useState(1);
    const [popularMediaPage, setPopularMediaPage] = useState(1);

    let popularPeopleDetail = useLoadMore(
        `/api/tmdb/popular?cathegory=person`,
        popularPeoplePage
    );

    let popularMediaDetail = useLoadMore(
        `/api/tmdb/popular?cathegory=${cathegory}`,
        popularMediaPage
    );

    let trendingDetails = useFetch(`/api/tmdb/trending?cathegory=${cathegory}`);

    const handleChangeCathegory = (val) => setCathegory(val);

    // this helps when the cathegory is chosen from navbar
    useEffect(() => {
        // cathegory = undefined onMount
        if (!router.query.cathegory) return;

        setCathegory(router.query.cathegory);
        setPopularMediaPage(1);
    }, [router.query.cathegory]);

    let headTitle = "",
        headCathegory = router.query.cathegory,
        headGenre = router.query.genre;

    // determine head title
    if (headCathegory) {
        headTitle = headCathegory;
        if (headGenre) {
            headTitle += `(${genreName})`;
        }
        headTitle += " || ";
    } else {
        if (headGenre) {
            headTitle = `${genreName} || `;
        }
    }
    headTitle += `MUVUS - All about movies, tv series, people and community groups.`;
    return (
        <>
            <Head>
                {/* <title>
                    {`${cathegory}(${genreName}) || MUVUS - All about movies, tv series, people and community
                    groups.`}
                </title> */}
                <title>{headTitle}</title>
            </Head>
            <main className="home__layout-main">
                <HomeHeader
                    headerDetails={trendingDetails}
                    genreName={genreName}
                    cathegory={cathegory}
                    router={router}
                    handleChangeCathegory={handleChangeCathegory}
                />
                <HomeMainMedia
                    genreName={genreName}
                    genreMedia={genreMedia}
                    cathegory={cathegory}
                />
            </main>

            <Aside>
                <HomePopularMedia
                    currentPage={popularMediaPage}
                    handleLoadMore={() => {
                        setPopularMediaPage((prev) => prev + 1);
                    }}
                    popularMediaDetail={popularMediaDetail}
                    cathegory={cathegory}
                    genres={
                        trendingDetails.status === "fetched" &&
                        trendingDetails.data.data.genres
                    }
                />
                <HomePopularPeople
                    popularPeopleDetail={popularPeopleDetail}
                    currentPage={popularPeoplePage}
                    handleLoadMore={() => {
                        setPopularPeoplePage((prev) => prev + 1);
                    }}
                />
            </Aside>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    let { cathegory, genre } = context.query;
    if (!cathegory) {
        cathegory = "tv";
    }

    let cathegoryGenres = await fetch(
        `https://api.themoviedb.org/3/genre/${cathegory}/list?api_key=${TMDB_KEY}&language=en-US`
    );

    cathegoryGenres = await cathegoryGenres.json();

    if (!genre) {
        genre = cathegoryGenres.genres[0].id;
    }

    let url = new URL(`https://api.themoviedb.org/3/discover/${cathegory}`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("page", 1);
    url.searchParams.set("timezone", "America%2FNew_York");
    url.searchParams.set("with_genres", genre);
    url.searchParams.set("include_null_first_air_dates", false);
    url.searchParams.set("with_watch_monetization_types", "flatrate");

    let genreMedia = await fetch(url).then((res) => res.json());
    let genreName = [...cathegoryGenres.genres].find(
        ({ name, id }) => +id === +genre
    ).name;

    return {
        props: {
            genreMedia,
            genreName,
            session,
        },
    };
};

export default Home;
