import { fetchData } from "../../../utils/fetchData";

const TMDB_KEY = process.env.TMDB_KEY;

const popularMedia = async (req, res) => {
    let { cathegory, page } = req.query;

    let url = new URL(
        `https://api.themoviedb.org/3/${cathegory}/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );
    try {
        let popular = await fetchData(url);
        let { page: currentPage, results: popularMedia, total_pages } = popular;
        return res
            .status(200)
            .json({ data: { currentPage, popularMedia, total_pages } });
    } catch (error) {
        return res.status(500).json({ status: "failed" });
    }
};

export default popularMedia;
