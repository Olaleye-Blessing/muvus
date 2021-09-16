import { useRouter } from "next/dist/client/router";
import Link from "next/link";

const NavLink = ({ text, icon, activeIcon, path }) => {
    let router = useRouter();
    if (!path) path = `/${text}`;

    let activeLink = router.pathname === path ? "btn-active" : "";

    return (
        <li className="nav__lists-sub">
            <Link href={path}>
                <a className={`nav__links ${activeLink}`}>
                    <span className="nav__link-icon">
                        {activeLink ? activeIcon : icon}
                    </span>
                    <span>{text}</span>
                </a>
            </Link>
        </li>
    );
};

export default NavLink;
