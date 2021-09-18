import HomeGenres from "../components/HomeGenres";
import HomeSlider from "../components/HomeSlider";
import LoadingIndicator from "../components/LoadingIndicator";
import HomeCathegories from "./../components/HomeCathegories";

const HomeHeader = ({
    headerDetails: { loading, error, media, genres },
    cathegory,
    router,
    handleChangeCathegory,
    genreName,
}) => {
    if (loading) {
        return (
            <>
                <header className="home__header">
                    <HomeCathegories
                        handleChangeCathegory={handleChangeCathegory}
                        activeCathegory={cathegory}
                    />
                </header>
                <LoadingIndicator />
            </>
        );
    }

    return (
        <>
            <header className="home__header">
                <HomeCathegories
                    handleChangeCathegory={handleChangeCathegory}
                    activeCathegory={cathegory}
                />
                <HomeGenres
                    genres={genres}
                    router={router}
                    cathegory={cathegory}
                    genreName={genreName}
                />
            </header>
            <HomeSlider trending={media} cathegory={cathegory} />
        </>
    );
};

export default HomeHeader;
