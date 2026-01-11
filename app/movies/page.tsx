import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import PaginationQuery from "@/components/PaginationQuery";
import SearchCategories from "@/components/SearchCategories";
import getMoviesSearch from "@/lib/api/external/movies/getMoviesSearch";
import { SearchProps } from "@/types/types";

const MovieSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const dataMovie = await getMoviesSearch(query, pageNum, "movie");
  const totalPages = dataMovie.total_pages;
  return (
    <section className="mt-6 flex gap-2">
      <SearchCategories
        searchParams={searchParams}
        query={query}
        type={"movie"}
        pageNum={pageNum}
      />
      <div className="w-4/5">
        <MovieCardComponent data={dataMovie} />
        <PaginationQuery
          pageNum={pageNum}
          totalPages={totalPages}
          path1="/movies"
          query={query}
        />
      </div>
    </section>
  );
};

export default MovieSearch;
