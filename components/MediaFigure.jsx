import Image from "next/image";
import { imageLoader } from "../utils/imageLoader";
import noImage from "./../assests/images/noImage.png";

const MediaFigure = ({
    figureClassName,
    backdrop_path,
    poster_path,
    profile_path,
    width,
    height,
}) => {
    let src = backdrop_path || poster_path || profile_path;
    return (
        <figure
            className={`${figureClassName} border-b border-white-primary border-opacity-20`}
        >
            {src ? (
                <Image
                    loader={imageLoader}
                    src={src}
                    width={width}
                    height={height}
                    layout="responsive"
                />
            ) : (
                <Image
                    // loader={imageLoader}
                    src={noImage}
                    width={width}
                    height={height}
                    layout="responsive"
                />
            )}
        </figure>
    );
};

MediaFigure.defaultProps = {
    width: 1920,
    height: 1080,
};

export default MediaFigure;
