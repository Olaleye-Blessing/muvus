import {
    AiOutlineClockCircle,
    AiFillClockCircle,
    AiOutlineSetting,
    AiFillSetting,
} from "react-icons/ai";

import {
    BsBookmarksFill,
    BsBookmarks,
    BsPerson,
    BsPersonFill,
} from "react-icons/bs";

import { BiLogOut } from "react-icons/bi";

import { signOut } from "next-auth/client";

import NavList from "./NavList";
import { homeLists } from "./HomeLists";
import { cathegoryLists } from "./CathegoryList";

const NavAuth = ({ session }) => {
    let {
        user: { email },
    } = session;

    let navLists = [
        ...homeLists,
        {
            header: "LIBRARY",
            sub: [
                {
                    text: "recent",
                    icon: <AiOutlineClockCircle />,
                    activeIcon: <AiFillClockCircle />,
                },
                {
                    text: "saved",
                    icon: <BsBookmarks />,
                    activeIcon: <BsBookmarksFill />,
                },
            ],
        },
        ...cathegoryLists,
        {
            header: "General",
            sub: [
                {
                    text: "Settings",
                    icon: <AiOutlineSetting />,
                    activeIcon: <AiFillSetting />,
                    path: `/profile/${email}/settings`,
                },
                {
                    text: "Profile",
                    icon: <BsPerson />,
                    activeIcon: <BsPersonFill />,
                    path: `/profile/${email}`,
                },
                {
                    text: "Log Out",
                    icon: <BiLogOut />,
                    type: "btn",
                    onClick: () => signOut(),
                },
            ],
        },
    ];
    return (
        <>
            {navLists.map(({ header, sub }) => {
                return <NavList key={header} header={header} sub={sub} />;
            })}
        </>
    );
};

export default NavAuth;
