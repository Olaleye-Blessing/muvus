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

    const [category, setCategory] = useState(router.query.category || "tv");

    const [popularPeoplePage, setPopularPeoplePage] = useState(1);
    const [popularMediaPage, setPopularMediaPage] = useState(1);

    let popularPeopleDetail = useLoadMore(
        `/api/tmdb/popular?category=person`,
        popularPeoplePage
    );

    let popularMediaDetail = useLoadMore(
        `/api/tmdb/popular?category=${category}`,
        popularMediaPage
    );

    let trendingDetails = useFetch(`/api/tmdb/trending?category=${category}`);

    const handleChangeCategory = (val) => setCategory(val);

    // this helps when the category is chosen from navbar
    useEffect(() => {
        // category = undefined onMount
        if (!router.query.category) return;

        setCategory(router.query.category);
        setPopularMediaPage(1);
    }, [router.query.category]);

    let headTitle = "",
        headCategory = router.query.category,
        headGenre = router.query.genre;

    // determine head title
    if (headCategory) {
        headTitle = headCategory;
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
                    {`${category}(${genreName}) || MUVUS - All about movies, tv series, people and community
                    groups.`}
                </title> */}
                <title>{headTitle}</title>
            </Head>
            <main className="home__layout-main">
                <HomeHeader
                    headerDetails={trendingDetails}
                    genreName={genreName}
                    category={category}
                    router={router}
                    handleChangeCategory={handleChangeCategory}
                />
                <HomeMainMedia
                    genreName={genreName}
                    genreMedia={genreMedia}
                    category={category}
                />
            </main>

            <Aside>
                <HomePopularMedia
                    currentPage={popularMediaPage}
                    handleLoadMore={() => {
                        setPopularMediaPage((prev) => prev + 1);
                    }}
                    popularMediaDetail={popularMediaDetail}
                    category={category}
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

    let { category, genre } = context.query;
    if (!category) {
        category = "tv";
    }

    let categoryGenres = await fetch(
        `https://api.themoviedb.org/3/genre/${category}/list?api_key=${TMDB_KEY}&language=en-US`
    );

    categoryGenres = await categoryGenres.json();

    if (!genre) {
        genre = categoryGenres.genres[0].id;
    }

    let url = new URL(`https://api.themoviedb.org/3/discover/${category}`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("page", 1);
    url.searchParams.set("timezone", "America%2FNew_York");
    url.searchParams.set("with_genres", genre);
    url.searchParams.set("include_null_first_air_dates", false);
    url.searchParams.set("with_watch_monetization_types", "flatrate");

    let genreMedia = await fetch(url).then((res) => res.json());
    let genreName = [...categoryGenres.genres].find(
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
