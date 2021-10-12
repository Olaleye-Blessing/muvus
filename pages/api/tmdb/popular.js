import { fetchData } from "../../../utils/fetchData";
import { TMDB_KEY } from "../../../constants";

const popularMedia = async (req, res) => {
    let { category, page } = req.query;

    let url = new URL(
        `https://api.themoviedb.org/3/${category}/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`
    );
    try {
        let popular = await fetchData(url);
        let { page: currentPage, results, total_pages } = popular;
        return res
            .status(200)
            .json({ data: { currentPage, results, total_pages } });
    } catch (error) {
        return res.status(500).json({ status: "failed", error: error.message });
    }
};

export default popularMedia;
