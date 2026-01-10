import PaginationQuery from "@/components/PaginationQuery";
import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import getSeriesSearch from "@/lib/api/external/movies/getSeriesSearch";
import { SearchProps } from "@/types/types";
import SearchFormComponent from "@/components/SearchFormComponent";

const SeriesSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const data = await getSeriesSearch(query, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6">
      <SearchFormComponent type="series" query={query} />
      <SeriesCardComponent data={data} />
      <PaginationQuery
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/series"
        path2="/series"
        query={query}
      />
    </section>
  );
};

export default SeriesSearch;
