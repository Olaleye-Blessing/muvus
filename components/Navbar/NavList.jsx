import NavButton from "./NavButton";
import NavLink from "./NavLink";

const NavList = ({ header, sub }) => {
    return (
        <li key={header} className="nav__lists">
            <h5 className="nav__link-header">{header}</h5>
            <ul>
                {sub.map((link) =>
                    link.type === "btn" ? (
                        <NavButton key={link.text} {...link} />
                    ) : (
                        <NavLink key={link.text} {...link} />
                    )
                )}
            </ul>
        </li>
    );
};

export default NavList;
