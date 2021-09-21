import HomeGenres from "../components/HomeGenres";
import HomeSlider from "../components/HomeSlider";
import LoadingIndicator from "../components/LoadingIndicator";
import HomeCathegories from "./../components/HomeCathegories";

const HomeHeader = ({
    headerDetails: { status, error, data },
    cathegory,
    router,
    handleChangeCathegory,
    genreName,
}) => {
    if (status === "idle") return null;

    return (
        <>
            <header className="home__header">
                <HomeCathegories
                    handleChangeCathegory={handleChangeCathegory}
                    activeCathegory={cathegory}
                />
                {status === "fetching" && <LoadingIndicator />}
                {status === "error" && <div>{error}</div>}
                {status === "fetched" && (
                    <HomeGenres
                        genres={data.data.genres}
                        router={router}
                        cathegory={cathegory}
                        genreName={genreName}
                    />
                )}
            </header>
            {status === "fetched" && (
                <HomeSlider
                    trending={data.data.trending}
                    cathegory={cathegory}
                />
            )}
        </>
    );
};

export default HomeHeader;
