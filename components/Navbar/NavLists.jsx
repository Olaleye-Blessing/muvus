import { forwardRef } from "react";
import { useSession } from "next-auth/client";
// import navLinks from "../../utils/navLinks";
// import NavList from "./NavList";
import NavAuth from "./NavAuth";
import NavNotAuth from "./NavNotAuth";

const NavLists = forwardRef((props, ref) => {
    let [session, loading] = useSession();

    return (
        <ul className="nav__lists-cont h-0" ref={ref}>
            {session ? <NavAuth session={session} /> : <NavNotAuth />}
        </ul>
    );
});

export default NavLists;
