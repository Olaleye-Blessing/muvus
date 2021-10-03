import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import ButtonIcon from "../ButtonIcon";
import GroupAddMessage from "./GroupAddMessage";
import GroupMessages from "./GroupMessages";
import { imageLoader } from "../../utils/imageLoader";
import { RiLogoutBoxLine } from "react-icons/ri";

const Index = ({
    // exists,
    messages,
    // coverPic,
    name,
    handleChangeUserMessage,
    handleSendMessage,
    userMessage,
    user,
    scrollIntoViewDivRef,
    joinedCommunities,
    handleLeaveGroup,
}) => {
    const navRef = useRef(null);
    const navToggleRef = useRef(null);

    const toggleNav = () => {
        let nav = navRef.current;
        let btnToggle = navToggleRef.current;
        btnToggle.classList.toggle("toggle");
        nav.classList.toggle("open");
    };

    return (
        <main className="groupChat">
            <nav className="groupChat__nav" ref={navRef}>
                {/* contains list of other groups */}
                <ul className="groupChat__nav-lists">
                    {joinedCommunities.map(
                        ({ coverPic, communityId, groupName }) => {
                            let [media_type, id] = communityId.split("-");
                            return (
                                <li
                                    key={communityId}
                                    className="groupChat__nav-list"
                                >
                                    <Link
                                        href={`/communities/${media_type}/${id}?imgSrc=${coverPic}&name=${encodeURIComponent(
                                            groupName
                                        )}`}
                                    >
                                        <a
                                            className="groupChat__nav-link"
                                            title={groupName}
                                        >
                                            {name === groupName && (
                                                <span className="groupChat-active">
                                                    a
                                                </span>
                                            )}
                                            <figure className="groupChat__nav-figure">
                                                <Image
                                                    src={coverPic}
                                                    loader={imageLoader}
                                                    width={5}
                                                    height={5}
                                                    layout="responsive"
                                                    className="groupChat__nav-img"
                                                />
                                            </figure>
                                        </a>
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </nav>
            <section className="groupChat__main">
                <header className="groupChat__main-header">
                    <div
                        className="groupChat__nav-toggle-cont"
                        ref={navToggleRef}
                    >
                        <ButtonIcon
                            icon={<BsChevronRight />}
                            extraClass=""
                            onClick={() => toggleNav()}
                        />
                    </div>
                    <h1>{name}</h1>
                    <ButtonIcon
                        icon={<RiLogoutBoxLine className="text-xl" />}
                        onClick={handleLeaveGroup}
                        extraClass="ml-auto mr-2 text-red-primary"
                        title={`Leave ${name}`}
                    />
                </header>
                <section className="groupChat__main-detail">
                    <h3 className="groupChat__main-begin">BEGINNING OF CHAT</h3>
                    <GroupMessages messages={messages} user={user} />
                </section>
                <GroupAddMessage
                    handleChangeUserMessage={handleChangeUserMessage}
                    handleSendMessage={handleSendMessage}
                    userMessage={userMessage}
                />
                <div ref={scrollIntoViewDivRef}></div>
            </section>
        </main>
    );
};

export default Index;
