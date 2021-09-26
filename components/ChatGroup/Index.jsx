import { useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import ButtonIcon from "../ButtonIcon";
import MediaFigure from "../MediaFigure";
import GroupAddMessage from "./GroupAddMessage";
import GroupMessages from "./GroupMessages";

const Index = ({
    exists,
    messages,
    coverPic,
    name,
    handleChangeUserMessage,
    handleSendMessage,
    userMessage,
    user,
    scrollIntoViewDivRef,
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
                    {Array.from({ length: 4 }).map((v, i) => (
                        <li key={i} className="text-lg text-center mb-10">
                            {i}
                        </li>
                    ))}
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
