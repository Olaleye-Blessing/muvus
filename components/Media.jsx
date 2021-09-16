import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";

const Media = ({ backdrop_path, poster_path, overview, name, title }) => {
    let src = backdrop_path || poster_path;

    if (!src) return null;

    return (
        // <article className="">
        <Link href={`/`}>
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
                {overview && <p className="media__overview">{overview}</p>}
                <h3 className="media__title">{name || title}</h3>
            </a>
        </Link>
        // </article>
    );
};

export default Media;
