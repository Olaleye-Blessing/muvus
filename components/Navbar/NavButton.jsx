const NavButton = ({ text, icon, onClick }) => {
    return (
        <li className="nav__lists-sub nav__lists-auth">
            <button className="nav__links" onClick={onClick}>
                <span className="nav__link-icon">{icon}</span>
                <span>{text}</span>
            </button>
        </li>
    );
};

export default NavButton;
