const getMovieByGenre = async (genre: number) => {
  const res = await fetch(
    `${process.env.TMDB_DEFAULT_URL}/discover/movie?with_genres=${genre}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default getMovieByGenre;
