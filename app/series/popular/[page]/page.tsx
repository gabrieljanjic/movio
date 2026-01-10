import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import Pagination from "@/components/Pagination";
import getSeries from "@/lib/api/external/series/getSeries";
import SearchFormComponent from "@/components/SearchFormComponent";

const PopularSeriesOtherPages = async ({
  params,
}: {
  params: { page: number };
}) => {
  const pageNum = Number(params.page);
  const link = "popular";
  const data = await getSeries(link, pageNum);
  const totalPages = data.total_pages;

  return (
    <section className="mt-6">
      <SearchFormComponent type="series" />
      <SeriesCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/series/popular"
        path2="/series/popular"
      />
    </section>
  );
};

export default PopularSeriesOtherPages;
