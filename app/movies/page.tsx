import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import PaginationQuery from "@/components/PaginationQuery";
import getMoviesSearch from "@/lib/api/external/movies/getMoviesSearch";
import { SearchProps } from "@/types/types";
import SearchFormComponent from "@/components/SearchFormComponent";

const MovieSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const data = await getMoviesSearch(query, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6">
      <SearchFormComponent type="movies" query={query} />
      <MovieCardComponent data={data} />
      <PaginationQuery
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies"
        path2="/movies"
        query={query}
      />
    </section>
  );
};

export default MovieSearch;
