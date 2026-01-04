type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming";

const getMovies = async (category: MovieCategory, page: number) => {
  const res = await fetch(
    `${process.env.TMDB_MOVIES_URI}/${category}?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

export default getMovies;
