import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import SearchFormComponent from "@/components/SearchFormComponent";

const UpcomingOtherPages = async ({ params }: { params: { page: number } }) => {
  const link = "upcoming";
  const pageNum = Number(params.page);
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

export default UpcomingOtherPages;
