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

import { BsBookmarksFill, BsBookmarks } from "react-icons/bs";

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
        header: "CATEGORY",
        sub: [
            {
                text: "tv show",
                icon: <HiOutlineVideoCamera />,
                activeIcon: <HiVideoCamera />,
                path: "/?category=tv",
            },
            {
                text: "movie",
                icon: <BiMovie />,
                activeIcon: <MdMovie />,
                path: "/?category=movie",
            },
            // {
            //     text: "people",
            //     icon: <BsPeople />,
            //     activeIcon: <BsPeopleFill />,
            // },
        ],
    },
    {
        header: "General",
        sub: [
            {
                text: "Settings",
                icon: <AiOutlineSetting />,
                activeIcon: <AiFillSetting />,
                path: "/settings",
            },
        ],
    },
];
