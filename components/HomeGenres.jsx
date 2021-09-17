const HomeGenres = ({ genres, router, cathegory, genreName }) => {
    return (
        <div className="home__genre-cont">
            <ul className="home__genre-lists">
                {genres.map(({ id, name }) => (
                    <li key={id} className="home__genre-list">
                        <button
                            className={`home__genre-btn ${
                                genreName === name ? "btn-active" : ""
                            }`}
                            onClick={() => {
                                router.push(
                                    `/?cathegory=${cathegory}&genre=${id}`
                                );
                            }}
                        >
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeGenres;
