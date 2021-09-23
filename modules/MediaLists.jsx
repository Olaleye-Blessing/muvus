import GalleryMedia from "../components/GalleryMedia";

const MediaLists = ({ media }) => {
    return (
        <ul className="media__lists">
            {media.map((medium) => (
                <GalleryMedia key={medium.id} media={medium} />
            ))}
        </ul>
    );
};

export default MediaLists;
