import MediaList from "../components/MediaList";

const MediaLists = ({ media }) => {
    return (
        <ul className="media__lists">
            {media.map((medium) => (
                <MediaList key={medium.id} media={medium} />
            ))}
        </ul>
    );
};

export default MediaLists;
