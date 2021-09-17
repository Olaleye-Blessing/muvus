export const getGenreName = (arrayOfGenres, genreId) => {
    // console.log({ arrayOfGenres });
    return arrayOfGenres.find(({ id }) => +id === +genreId).name;
};
