import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { BsPerson, BsPersonFill } from "react-icons/bs";

const NavProfile = ({ user: { name, email, image } }) => {
    let { route } = useRouter();

    let activeLink = route === "/profile/[name]" && "btn-active";
    // console.log(name);
    return (
        <li className="nav__lists nav__lists-auth">
            <Link href={`/profile/${email}`}>
                <a className={`nav__links ${activeLink}`}>
                    <span className="nav__link-icon">
                        {activeLink ? <BsPersonFill /> : <BsPerson />}
                    </span>
                    <span>Profile</span>
                </a>
            </Link>
        </li>
    );
};

export default NavProfile;
