import PaginationQuery from "@/components/PaginationQuery";
import SearchCategories from "@/components/SearchCategories";
import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import getSeriesSearch from "@/lib/api/external/movies/getSeriesSearch";
import { SearchProps } from "@/types/types";

const SeriesSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const dataSeries = await getSeriesSearch(query, pageNum, "tv");
  const totalPages = dataSeries.total_pages;
  return (
    <section className="mt-6 flex gap-2">
      <SearchCategories
        searchParams={searchParams}
        query={query}
        type={"tv"}
        pageNum={pageNum}
      />
      <div className="w-4/5">
        <SeriesCardComponent data={dataSeries} />
        <PaginationQuery
          pageNum={pageNum}
          totalPages={totalPages}
          path1="/series"
          query={query}
        />
      </div>
    </section>
  );
};

export default SeriesSearch;
