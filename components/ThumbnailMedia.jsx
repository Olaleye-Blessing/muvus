import MediaFigure from "./MediaFigure";
import MediaLink from "./MediaLink";
const ThumbnailMedia = ({ media, media_type }) => {
    let {
        name,
        title,
        genreString,
        known_for_department,
        vote_average,
        popularity,
    } = media;
    return (
        <li className="popular__media-list">
            <MediaLink
                linkClassName="smallThumbnail"
                media_type={media_type}
                {...media}
            >
                <MediaFigure
                    figureClassName="smallThumbnail__img"
                    {...media}
                    width={35}
                    height={50}
                />
                <div className="smallThumbnail__detail">
                    <h5 className="smallThumbnail__detail-name">
                        {name || title}
                    </h5>
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
            </MediaLink>
        </li>
    );
};

export default ThumbnailMedia;
