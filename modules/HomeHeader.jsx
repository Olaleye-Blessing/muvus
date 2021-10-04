import HomeGenres from "../components/HomeGenres";
import HomeSlider from "../components/HomeSlider";
import LoadingIndicator from "../components/LoadingIndicator";
import HomeCathegories from "./../components/HomeCathegories";

const HomeHeader = ({
    headerDetails: { status, error, data },
    category,
    router,
    handleChangeCategory,
    genreName,
}) => {
    if (status === "idle") return null;

    return (
        <>
            <header className="home__header">
                <HomeCathegories
                    handleChangeCategory={handleChangeCategory}
                    activeCategory={category}
                />
                {status === "fetching" && <LoadingIndicator />}
                {status === "error" && <div>{error}</div>}
                {status === "fetched" && (
                    <HomeGenres
                        genres={data.data.genres}
                        router={router}
                        category={category}
                        genreName={genreName}
                    />
                )}
            </header>
            {status === "fetched" && (
                <HomeSlider trending={data.data.trending} category={category} />
            )}
        </>
    );
};

export default HomeHeader;
