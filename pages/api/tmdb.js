// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const TMDB_KEY = process.env.TMDB_KEY;

export default async function tmdb(req, res) {
    let { category, popularMediaPage } = req.query;
    console.log({ category, popularMediaPage });

    let [trendingMediaRes, PopularMediaRes] = await Promise.all([
        fetch(
            `https://api.themoviedb.org/3/trending/${category}/day?api_key=${TMDB_KEY}`
        ),
        fetch(
            `https://api.themoviedb.org/3/${category}/popular?api_key=${TMDB_KEY}&language=en-US&page=${popularMediaPage}`
        ),
    ]);

    let [trendingMedia, PopularMedia] = await Promise.all([
        trendingMediaRes.json(),
        PopularMediaRes.json(),
    ]);

    res.status(200).json({ trendingMedia, PopularMedia });
}
