import { AiOutlineHome, AiFillHome } from "react-icons/ai";

import { HiOutlineVideoCamera, HiVideoCamera } from "react-icons/hi";

import { BiLogIn, BiMovie } from "react-icons/bi";

import { MdMovie } from "react-icons/md";

import { signIn } from "next-auth/client";

import NavList from "./NavList";

let linksList = [
    {
        header: "MENU",
        sub: [
            {
                text: "home",
                icon: <AiOutlineHome />,
                activeIcon: <AiFillHome />,
                path: "/",
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
                text: "Log In",
                icon: <BiLogIn />,
                type: "btn",
                onClick: () => signIn(),
            },
        ],
    },
];

const NavNotAuth = () => {
    return (
        <>
            {linksList.map(({ header, sub }) => {
                return <NavList key={header} header={header} sub={sub} />;
            })}
        </>
    );
};

export default NavNotAuth;
