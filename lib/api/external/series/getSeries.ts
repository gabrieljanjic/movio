type SeriesCategory = "popular" | "top_rated";

const getSeries = async (category: SeriesCategory, page: number) => {
  const res = await fetch(
    `${process.env.TMDB_SERIES_URL}/${category}?page=${page}`,
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

export default getSeries;
