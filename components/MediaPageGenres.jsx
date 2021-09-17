const MediaPageGenres = ({ genres, handleGenreClicked }) => {
    return (
        <ul className="flex mt-2 flex-wrap mb-3">
            {genres.map(({ path, id, name }) => (
                <li key={id} className="mr-2 mt-3">
                    <button
                        onClick={() => {
                            console.log("clicked");
                            handleGenreClicked(path);
                        }}
                        className="block bg-red bg-opacity-40 px-3 text-white rounded-md pt-1 pb-2 hover:bg-opacity-20"
                    >
                        {name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default MediaPageGenres;
