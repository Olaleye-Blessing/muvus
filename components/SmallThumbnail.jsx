import Image from "next/image";
import { getGenreName } from "../utils/getGenreName";
import { imageLoader } from "../utils/imageLoader";

const SmallThumbnail = ({
    vote_average,
    backdrop_path,
    poster_path,
    name,
    title,
    genres,
    genre_ids,
}) => {
    let src = backdrop_path || poster_path;
    if (!src) return null;

    const genreString = (genre_ids) =>
        genre_ids
            .map((id) => getGenreName(genres, id))
            .slice(0, 2)
            .join(", ");

    return (
        <article className="smallThumbnail">
            <figure className="smallThumbnail__img">
                <Image
                    loader={imageLoader}
                    src={src}
                    width={35}
                    height={50}
                    layout="responsive"
                />
            </figure>
            <div className="smallThumbnail__detail">
                <h4 className="smallThumbnail__detail-name">{name || title}</h4>
                <p className="smallThumbnail__detail-genres">
                    {genreString(genre_ids)}
                </p>
                <div className="smallThumbnail__detail-tmdb">
                    <figure>
                        <figcaption>TMDB</figcaption>
                    </figure>
                    <p className="smallThumbnail__detail-vote">
                        {vote_average}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default SmallThumbnail;
