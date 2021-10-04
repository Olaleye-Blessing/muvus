import { useRouter } from "next/dist/client/router";

const HomeHeader = ({ handleChangeCategory, activeCategory }) => {
    let router = useRouter();
    let lists = [
        { text: "Tv Shows", category: "tv" },
        { text: "Movies", category: "movie" },
        // { text: "People", category: "person" },
    ];
    return (
        <ul className="home__header-lists">
            {lists.map(({ text, category }, index) => (
                <li key={index} className="home__header-list">
                    <button
                        className={`home__header-btn ${
                            activeCategory === category ? "btn-active" : ""
                        }`}
                        onClick={() => {
                            // router.push(`/?category=${category || text}`);
                            handleChangeCategory(category);
                            router.push(`/?category=${category}`);
                        }}
                    >
                        {text}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default HomeHeader;
