import ButtonIcon from "./ButtonIcon";
import MediaFigure from "./MediaFigure";
import MediaLink from "./MediaLink";
import { RiGroupFill } from "react-icons/ri";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/next-server/server/router";
import CommunityButton from "./CommunityButton";

const GalleryMedia = ({ media }) => {
    let router = useRouter();
    let {
        id,
        media_type,
        overview,
        known_for_department,
        name,
        title,
        backdrop_path,
        poster_path,
        profile_path,
    } = media;
    return (
        <li className="media__list">
            <MediaLink linkClassName="media__link group" {...media}>
                <MediaFigure figureClassName="media__img" {...media} />
                <div className="media__detail">
                    {(overview || known_for_department) && (
                        <p className="media__overview">
                            {overview || known_for_department}
                        </p>
                    )}
                    <h3 className="media__title">{name || title}</h3>
                    <CommunityButton
                        media_type={media_type}
                        groupName={name || title}
                        id={id}
                        imgSrc={backdrop_path || poster_path || profile_path}
                    />
                    {/* <div>
                        <ButtonIcon
                            icon={<RiGroupFill />}
                            extraClass="hover:text-red-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                let groupName = name || title;
                                router.push(
                                    `/communities/${media_type}/${id}?imgSrc=${
                                        media.backdrop_path ||
                                        media.poster_path ||
                                        media.profile_path
                                    }&name=${encodeURIComponent(groupName)}`
                                );
                            }}
                        />
                    </div> */}
                </div>
            </MediaLink>
        </li>
    );
};

export default GalleryMedia;
