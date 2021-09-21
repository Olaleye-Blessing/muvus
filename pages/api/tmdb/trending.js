import { fetchData } from "../../../utils/fetchData";
const TMDB_KEY = process.env.TMDB_KEY;

const trendingMedia = async (req, res) => {
    let { cathegory } = req.query;

    let trendingUrl = `https://api.themoviedb.org/3/trending/${cathegory}/day?api_key=${TMDB_KEY}`;

    let cathegoryGenresUrl = new URL(
        `https://api.themoviedb.org/3/genre/${cathegory}/list?api_key=${TMDB_KEY}&language=en-US`
    );

    try {
        let [trendingReq, genresReq] = await Promise.all([
            fetch(trendingUrl),
            fetch(cathegoryGenresUrl),
        ]);
        let [trending, genres] = await Promise.all([
            trendingReq.json(),
            genresReq.json(),
        ]);
        let { results: trendingResult } = trending;

        return res.status(200).json({
            data: { trending: trendingResult, genres: genres.genres },
        });
    } catch (error) {
        return res.status(500).json({ status: "failed" });
    }
};

export default trendingMedia;
