import { BiLogIn, BiLogOut } from "react-icons/bi";
import { signIn, signOut } from "next-auth/client";

import NavButton from "./NavButton";

const NavAuthButton = ({ session }) => {
    return session ? (
        <NavButton text={"Log Out"} icon={<BiLogOut />} onClick={signOut} />
    ) : (
        <NavButton text={"Log In"} icon={<BiLogIn />} onClick={signIn} />
    );
};

export default NavAuthButton;
