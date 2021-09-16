import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import HomeSlider from "../components/HomeSlider";
import LoadingIndicator from "../components/LoadingIndicator";
import HomeFavouriteMedia from "../modules/HomeFavouriteMedia";
import HomeHeader from "../modules/HomeHeader";
import HomeMainMedia from "../modules/HomeMainMedia";
import HomePopularMedia from "../modules/HomePopularMedia";
import { fetchData } from "../utils/fetchData";

const TMDB_KEY = process.env.TMDB_KEY;

const Home = ({ genreMedia, genreId, genreName }) => {
    let router = useRouter();

    const [cathegory, setCathegory] = useState(router.query.cathegory || "tv");
    const [popularMediaDetail, setPopularMediaDetail] = useState({
        loading: true,
        media: [],
        error: null,
        page: 1,
        total_pages: 1,
    });
    const [trendingDetail, setTrendingDetail] = useState({
        loading: true,
        error: null,
        media: [],
        genres: [],
    });

    const handleChangeCathegory = (val) => setCathegory(val);

    useEffect(() => {
        setPopularMediaDetail({
            ...popularMediaDetail,
            media: [],
            loading: true,
            page: 1,
            total_pages: 1,
        });
        setTrendingDetail({
            ...trendingDetail,
            media: [],
            genres: [],
            loading: true,
        });
        let abortFetch = new AbortController();
        const fetchTrending = async () => {
            // setTrendingDetail({ ...trendingDetail, loading: true });
            try {
                let {
                    data: { trending, genres },
                } = await fetchData(
                    `/api/tmdb/trending?cathegory=${cathegory}`,
                    abortFetch.signal
                );
                setTrendingDetail({
                    ...trendingDetail,
                    loading: false,
                    error: null,
                    media: trending,
                    genres,
                });
            } catch (error) {
                setTrendingDetail({
                    ...trendingDetail,
                    loading: false,
                    error: error.message || "There is an error",
                });
            }
        };
        const fetchPopular = async () => {
            // setPopularMediaDetail({ ...popularMediaDetail, loading: true });

            try {
                let { data: popular } = await fetchData(
                    `/api/tmdb/popular?cathegory=${cathegory}&page=${popularMediaDetail.page}`,
                    abortFetch.signal
                );

                setPopularMediaDetail({
                    ...popularMediaDetail,
                    loading: false,
                    error: null,
                    page: popular.currentPage,
                    media: popular.popularMedia,
                    total_pages: popular.total_pages,
                });
            } catch (error) {
                setPopularMediaDetail({
                    ...popularMediaDetail,
                    loading: false,
                    error: error.message || "There is an error",
                });
            }
        };

        fetchTrending();
        fetchPopular();

        return () => abortFetch.abort();
    }, [cathegory]);

    return (
        <>
            <main className="home__layout-main">
                <HomeHeader
                    headerDetails={trendingDetail}
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
            <aside className="home__aside">
                <HomePopularMedia
                    popularMediaDetail={popularMediaDetail}
                    cathegory={cathegory}
                    genres={trendingDetail.genres}
                />
                <HomeFavouriteMedia />
            </aside>
        </>
    );
};

export const getServerSideProps = async (context) => {
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
            genreId: genre,
            genreName,
        },
    };
};

export default Home;
