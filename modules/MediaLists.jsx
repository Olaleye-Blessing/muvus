import MediaList from "../components/MediaList";

const MediaLists = ({ media }) => {
    // filter out ones with no image
    media = [...media].filter(
        ({ backdrop_path, poster_path, profile_path }) =>
            backdrop_path || poster_path || profile_path
    );

    return (
        <ul className="media__lists">
            {media.map((medium) => (
                <MediaList key={medium.id} media={medium} />
            ))}
        </ul>
    );
};

export default MediaLists;
