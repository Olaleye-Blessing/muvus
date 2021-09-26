import Link from "next/link";
const MediaLink = ({ linkClassName, media_type, id, children }) => {
    return (
        <Link href={`/mediaDetail/${media_type}/${id}`}>
            <a className={linkClassName}>{children}</a>
        </Link>
    );
};

export default MediaLink;
