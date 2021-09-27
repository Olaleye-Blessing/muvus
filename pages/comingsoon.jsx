import Head from "next/head";
import { useState } from "react";
import useLoadMore from "../hooks/useLoadMore";
import MediaLists from "../modules/MediaLists";
import LoadMoreContainer from "./../components/LoadMoreContainer";

const comingsoon = () => {
    const [page, setPage] = useState(1);

    let result = useLoadMore(`/api/tmdb/upcoming?cathegory=null`, page);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    if (result.status === "idle") return null;

    return (
        <>
            <Head>
                <title>Upcoming Movies || MUVUS</title>
            </Head>
            <main className="py-5">
                <header>
                    <h1>Upcoming Movies</h1>
                </header>
                <section className="mt-8">
                    <LoadMoreContainer
                        {...result}
                        currentPage={page}
                        handleLoadMore={handleLoadMore}
                        listContent={<MediaLists media={result.results} />}
                    />
                </section>
            </main>
        </>
    );
};

export default comingsoon;
