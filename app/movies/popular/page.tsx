import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import SearchFormComponent from "@/components/SearchFormComponent";

const PopularFirstMovie = async () => {
  const link = "popular";
  const pageNum = 1;
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="pt-6 bg-white custom-card-box-shadow">
      <SearchFormComponent type="movies" />
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/popular"
        path2="/movies/popular"
      />
    </section>
  );
};

export default PopularFirstMovie;
