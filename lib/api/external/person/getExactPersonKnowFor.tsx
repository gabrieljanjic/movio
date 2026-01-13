const getExactPersonKnowFor = async (id: string) => {
  const res = await fetch(
    `${process.env.TMDB_DEFAULT_URL}/person/${id}/combined_credits`,
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

export default getExactPersonKnowFor;
