import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";

const TopRatedFirstPage = async () => {
  const link = "top_rated";
  const pageNum = 1;
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-8">
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/top-rated"
        path2="/movies/top-rated"
      />
    </section>
  );
};

export default TopRatedFirstPage;
