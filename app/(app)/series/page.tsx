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
    <section className="mt-6 flex flex-col md:flex-row gap-2 mx-4">
      <div className="w-full md:w-1/5">
        <SearchCategories
          searchParams={searchParams}
          query={query}
          type={"tv"}
          pageNum={pageNum}
        />
      </div>
      {dataSeries.results.length > 0 ? (
        <div className="w-full">
          <SeriesCardComponent data={dataSeries} />
          <PaginationQuery
            pageNum={pageNum}
            totalPages={totalPages}
            path="/series"
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

export default SeriesSearch;
