const ButtonIcon = ({ icon, onClick, extraClass, title }) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-icon ${extraClass}`}
            title={title}
        >
            {icon}
        </button>
    );
};

ButtonIcon.defaultProps = {
    extraClass: "",
    title: "",
};

export default ButtonIcon;
