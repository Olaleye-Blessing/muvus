import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";

const SmallThumbnail = ({
    vote_average,
    backdrop_path,
    poster_path,
    name,
    title,
    genreString,
    known_for_department,
    popularity,
    profile_path,
}) => {
    let src = backdrop_path || poster_path || profile_path;
    if (!src) return null;

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
                <h5 className="smallThumbnail__detail-name">{name || title}</h5>
                <p className="smallThumbnail__detail-genres">
                    {genreString || known_for_department}
                </p>
                <div className="smallThumbnail__detail-tmdb">
                    <figure>
                        <figcaption>TMDB</figcaption>
                    </figure>
                    <p className="smallThumbnail__detail-vote">
                        {Number(vote_average || popularity).toFixed(1)}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default SmallThumbnail;
