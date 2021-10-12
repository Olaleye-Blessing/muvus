import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
    RiCommunityFill,
    RiCommunityLine,
    RiScales2Fill,
    RiScales2Line,
} from "react-icons/ri";

export const homeLists = [
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
];
