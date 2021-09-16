import { fetchData } from "../../utils/fetchData";

const TMDB_KEY = process.env.TMDB_KEY;

const movie = ({ data }) => {
    console.log(data);
    return <div>movie</div>;
};

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
