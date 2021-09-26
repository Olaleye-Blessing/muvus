const AsideSectionLists = ({ header, children }) => {
    return (
        <section className={`aside__section`}>
            <header className="aside__section-header">
                <h3>{header}</h3>
            </header>
            <ul className="aside__lists">{children}</ul>
        </section>
    );
};

export default AsideSectionLists;
