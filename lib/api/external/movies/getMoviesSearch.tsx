const getMoviesSearch = async (query: string, page: number) => {
  const fullQuery = `page=${page}&query=${query}`;
  const res = await fetch(
    `${process.env.TMDB_SEARCH_MOVIES_URI}?${fullQuery}`,
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

export default getMoviesSearch;
