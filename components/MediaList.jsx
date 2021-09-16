import Media from "./Media";

const MediaList = ({ media }) => {
    return (
        <li className="media__list">
            <Media {...media} />
        </li>
    );
};

export default MediaList;
