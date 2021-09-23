import MediaFigure from "./MediaFigure";
import MediaLink from "./MediaLink";

const GalleryMedia = ({ media }) => {
    let { overview, known_for_department, name, title } = media;
    return (
        <li className="media__list">
            <MediaLink linkClassName="media__link group" {...media}>
                <MediaFigure figureClassName="media__img" {...media} />
                <div>
                    {(overview || known_for_department) && (
                        <p className="media__overview">
                            {overview || known_for_department}
                        </p>
                    )}
                    <h3 className="media__title">{name || title}</h3>
                </div>
            </MediaLink>
        </li>
    );
};

export default GalleryMedia;
