import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";

const Media = ({
    backdrop_path,
    poster_path,
    overview,
    name,
    title,
    profile_path,
    known_for_department,
    media_type,
    id,
}) => {
    let src = backdrop_path || poster_path || profile_path;

    if (!src) return null;

    return (
        // <article className="">
        // <Link href={`/${media_type}/${id}`}>
        <Link href={`/mediaDetail/${media_type}/${id}`}>
            <a className="media__link group">
                <figure className="media__img">
                    <Image
                        loader={imageLoader}
                        src={src}
                        width={1920}
                        height={1080}
                        layout="responsive"
                    />
                </figure>
                {(overview || known_for_department) && (
                    <p className="media__overview">
                        {overview || known_for_department}
                    </p>
                )}
                <h3 className="media__title">{name || title}</h3>
            </a>
        </Link>
        // </article>
    );
};

export default Media;
