import { BiLogIn } from "react-icons/bi";

import { signIn } from "next-auth/client";

import NavList from "./NavList";

import { homeLists } from "./HomeLists";
import { cathegoryLists } from "./CathegoryList";

let linksList = [
    ...homeLists,
    ...cathegoryLists,
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
