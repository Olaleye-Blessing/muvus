import { forwardRef } from "react";
import navLinks from "../../utils/navLinks";
import NavList from "./NavList";

const NavLists = forwardRef((props, ref) => {
    return (
        <ul className="nav__lists-cont h-0" ref={ref}>
            {navLinks.map(({ header, sub }) => {
                return <NavList key={header} header={header} sub={sub} />;
            })}
        </ul>
    );
});

export default NavLists;
