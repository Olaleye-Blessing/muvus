import { useRouter } from "next/dist/client/router";

const HomeHeader = ({ handleChangeCathegory, activeCathegory }) => {
    let router = useRouter();
    let lists = [
        { text: "Tv Shows", cathegory: "tv" },
        { text: "Movies", cathegory: "movie" },
        // { text: "People", cathegory: "person" },
    ];
    return (
        <ul className="home__header-lists">
            {lists.map(({ text, cathegory }, index) => (
                <li key={index} className="home__header-list">
                    <button
                        className={`home__header-btn ${
                            activeCathegory === cathegory ? "btn-active" : ""
                        }`}
                        onClick={() => {
                            // router.push(`/?cathegory=${cathegory || text}`);
                            handleChangeCathegory(cathegory);
                            router.push(`/?cathegory=${cathegory}`);
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
