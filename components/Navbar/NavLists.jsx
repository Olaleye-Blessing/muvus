import { forwardRef } from "react";
import { useSession } from "next-auth/client";
import navLinks from "../../utils/navLinks";
import NavList from "./NavList";
import NavAuthButton from "./NavAuthButton";

const NavLists = forwardRef((props, ref) => {
    let [session, loading] = useSession();

    return (
        <ul className="nav__lists-cont h-0" ref={ref}>
            {navLinks.map(({ header, sub }) => {
                return <NavList key={header} header={header} sub={sub} />;
            })}
            {loading ? null : (
                <div className="nav__lists nav__auth">
                    <NavAuthButton session={session} />
                </div>
            )}
        </ul>
    );
});

export default NavLists;
