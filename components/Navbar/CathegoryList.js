import { BiMovie } from "react-icons/bi";
import { HiOutlineVideoCamera, HiVideoCamera } from "react-icons/hi";
import { MdMovie } from "react-icons/md";

export const cathegoryLists = [
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
        ],
    },
];
