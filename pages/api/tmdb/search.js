import { fetchData } from "../../../utils/fetchData";
const TMDB_KEY = process.env.TMDB_KEY;

const searchForMedia = async (req, res) => {
    let { page, q } = req.query;
    if (!page) page = 1;

    let url = new URL(`https://api.themoviedb.org/3/search/multi`);
    url.searchParams.set("api_key", TMDB_KEY);
    url.searchParams.set("language", "en-US");
    url.searchParams.set("query", q);
    url.searchParams.set("page", page);
    url.searchParams.set("include_adult", true);

    try {
        let data = await fetchData(url);
        return res.status(200).json({ status: true, data });
    } catch (error) {
        return res.status(500).json({ status: "failed" });
    }
};

export default searchForMedia;
