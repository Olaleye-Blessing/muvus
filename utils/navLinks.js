import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineClockCircle,
    AiFillClockCircle,
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
    BsPeopleFill,
    BsPeople,
} from "react-icons/bs";

import { HiOutlineVideoCamera, HiVideoCamera } from "react-icons/hi";

import { BiMovie } from "react-icons/bi";

import { MdMovie } from "react-icons/md";

export default [
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
                text: "community",
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
            // {
            //     text: "people",
            //     icon: <BsPeople />,
            //     activeIcon: <BsPeopleFill />,
            // },
        ],
    },
];
