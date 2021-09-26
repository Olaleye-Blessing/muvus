import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineClockCircle,
    AiFillClockCircle,
    AiOutlineSetting,
    AiFillSetting,
} from "react-icons/ai";

import {
    RiCommunityLine,
    RiCommunityFill,
    RiScales2Line,
    RiScales2Fill,
} from "react-icons/ri";

import {
    BsBookmarksFill,
    BsBookmarks,
    BsPerson,
    BsPersonFill,
} from "react-icons/bs";

import { HiOutlineVideoCamera, HiVideoCamera } from "react-icons/hi";

import { BiMovie, BiLogIn, BiLogOut } from "react-icons/bi";

import { MdMovie } from "react-icons/md";

import { signIn, signOut } from "next-auth/client";

// import NavButton from "./NavButton";
// import NavProfile from "./NavProfile";
import NavList from "./NavList";

const NavAuth = ({ session }) => {
    let {
        user: { email },
    } = session;

    let navLists = [
        {
            header: "MENU",
            sub: [
                {
                    text: "home",
                    icon: <AiOutlineHome />,
                    activeIcon: <AiFillHome />,
                    path: "/",
                },
                {
                    text: "communities",
                    icon: <RiCommunityLine />,
                    activeIcon: <RiCommunityFill />,
                },
                {
                    text: "coming soon",
                    icon: <RiScales2Line />,
                    activeIcon: <RiScales2Fill />,
                    path: "/comingsoon",
                },
            ],
        },
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
        {
            header: "CATHEGORY",
            sub: [
                {
                    text: "tv show",
                    icon: <HiOutlineVideoCamera />,
                    activeIcon: <HiVideoCamera />,
                    path: "/?cathegory=tv",
                },
                {
                    text: "movie",
                    icon: <BiMovie />,
                    activeIcon: <MdMovie />,
                    path: "/?cathegory=movie",
                },
            ],
        },
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
    // return session ? (
    //     <>
    //         <NavProfile {...session} />
    //         <NavButton text={"Log Out"} icon={<BiLogOut />} onClick={signOut} />
    //     </>
    // ) : (
    //     <NavButton text={"Log In"} icon={<BiLogIn />} onClick={signIn} />
    // );
};

export default NavAuth;
