import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import SearchFormComponent from "@/components/SearchFormComponent";

const UpcomingFirstPage = async () => {
  const link = "upcoming";
  const pageNum = 1;
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6">
      <SearchFormComponent type="movies" />
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/upcoming"
        path2="/movies/upcoming"
      />
    </section>
  );
};

export default UpcomingFirstPage;
