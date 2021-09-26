import { useRouter } from "next/dist/client/router";
import { RiGroupFill } from "react-icons/ri";
import ButtonIcon from "./ButtonIcon";

const CommunityButton = ({ groupName, media_type, id, imgSrc }) => {
    let router = useRouter();
    return (
        <div className="">
            <ButtonIcon
                title={`Join ${groupName} community`}
                icon={<RiGroupFill />}
                extraClass="hover:text-red-primary"
                onClick={(e) => {
                    e.preventDefault();
                    router.push(
                        `/communities/${media_type}/${id}?imgSrc=${imgSrc}&name=${encodeURIComponent(
                            groupName
                        )}`
                    );
                }}
            />
        </div>
    );
};

export default CommunityButton;
