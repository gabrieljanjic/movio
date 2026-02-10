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
    <section className="mt-6 flex flex-col md:flex-row gap-2 mx-4">
      <div className="w-full md:w-1/5">
        <SearchCategories
          searchParams={searchParams}
          query={query}
          type={"movie"}
          pageNum={pageNum}
        />
      </div>
      {dataMovie.results.length > 0 ? (
        <div className="w-full">
          <MovieCardComponent data={dataMovie} />
          <PaginationQuery
            pageNum={pageNum}
            totalPages={totalPages}
            path="/movies"
            query={query}
          />
        </div>
      ) : (
        <p className="w-full text-gray-700 text-center mt-12">
          No results found.
        </p>
      )}
    </section>
  );
};

export default MovieSearch;
