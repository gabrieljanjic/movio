import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import SearchFormComponent from "@/components/SearchFormComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";

const PopularOtherPages = async ({ params }: { params: { page: string } }) => {
  const link = "popular";
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
        path1="/movies/popular"
        path2="/movies/popular"
      />
    </section>
  );
};

export default PopularOtherPages;
