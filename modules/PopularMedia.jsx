import ThumbnailMedia from "./../components/ThumbnailMedia";

const PopularMedia = ({ media, media_type }) => {
    return (
        <>
            {media.map((medium) => (
                <ThumbnailMedia
                    key={medium.id}
                    media={medium}
                    media_type={media_type}
                />
            ))}
        </>
    );
};

export default PopularMedia;
