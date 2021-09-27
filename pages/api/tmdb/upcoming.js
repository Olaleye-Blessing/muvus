import { fetchData } from "../../../utils/fetchData";

const TMDB_KEY = process.env.TMDB_KEY;

const popularMedia = async (req, res) => {
    let { page } = req.query;

    let url = new URL(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );
    try {
        let upcoming = await fetchData(url);
        let { page: currentPage, results, total_pages } = upcoming;
        return res
            .status(200)
            .json({ data: { currentPage, results, total_pages } });
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message });
    }
};

export default popularMedia;
