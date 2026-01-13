const getPopularPeople = async (page: number) => {
  const res = await fetch(
    `${process.env.TMDB_DEFAULT_URL}/person/popular?page=${page}`,
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

export default getPopularPeople;
