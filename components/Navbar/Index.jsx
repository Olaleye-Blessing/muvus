import { useRouter } from "next/dist/client/router";
import { createRef, useEffect } from "react";
import NavSearchForm from "../../modules/NavSearchForm";
import HomeLogo from "../HomeLogo";
import NavLists from "./NavLists";
import NavToggle from "./NavToggle";

const Navbar = () => {
    let pathname = useRouter().pathname;
    let navListRef = createRef();

    useEffect(() => {
        closeMenu();
    }, [pathname]);

    const closeMenu = () => {
        let navlist = navListRef.current;

        navlist.classList.add("h-0");
        navlist.classList.remove(
            "h-full",
            "pl-3",
            "border-r",
            "border-white",
            "border-opacity-40"
        );
    };

    const toggleNav = () => {
        let navlist = navListRef.current;
        if (navlist.classList.contains("h-0")) {
            navlist.classList.remove("h-0");
            navlist.classList.add(
                "h-full",
                "pl-3",
                "border-r",
                "border-white",
                "border-opacity-40"
            );
        } else {
            closeMenu();
        }
    };

    return (
        <nav className="nav">
            <HomeLogo />
            <NavLists ref={navListRef} />
            <NavSearchForm />
            <NavToggle onToggle={toggleNav} />
        </nav>
    );
};

export default Navbar;
