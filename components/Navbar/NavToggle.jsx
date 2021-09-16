import { GiHamburgerMenu } from "react-icons/gi";

const NavToggle = ({ onToggle }) => {
    return (
        <div className="nav__toggle">
            <button onClick={onToggle}>
                <GiHamburgerMenu />
            </button>
        </div>
    );
};

export default NavToggle;
