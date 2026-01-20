const getSeriesSearch = async (query: string, page: number, type: string) => {
  const fullQuery = `page=${page}&query=${query}`;
  const res = await fetch(
    `${process.env.TMDB_SEARCH_URL}/${type}?${fullQuery}`,
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

export default getSeriesSearch;
