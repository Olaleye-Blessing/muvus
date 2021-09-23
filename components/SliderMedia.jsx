import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";
import MediaLink from "./MediaLink";

const SliderMedia = ({
    media_type,
    id,
    name,
    title,
    first_air_date,
    overview,
    backdrop_path,
    poster_path,
}) => {
    return (
        <MediaLink
            linkClassName="scroll__media-link scroll__media"
            media_type={media_type}
            id={id}
        >
            <figure className="scroll__media-img">
                <Image
                    loader={imageLoader}
                    layout="fill"
                    src={backdrop_path || poster_path}
                />
            </figure>
            <div className="scroll__media-detail scroll__media-overlay">
                <h2>{name || title}</h2>
                <p className="">{first_air_date}</p>
                <p>{overview.slice(0, 145)}</p>
            </div>
        </MediaLink>
    );
};

export default SliderMedia;
