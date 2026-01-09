import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import Pagination from "@/components/Pagination";
import getSeries from "@/lib/api/external/series/getSeries";

const TopRatedSeriesFirstPage = async () => {
  const link = "top_rated";
  const pageNum = 1;
  const data = await getSeries(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-8">
      <SeriesCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/series/top-rated"
        path2="/series/top-rated"
      />
    </section>
  );
};

export default TopRatedSeriesFirstPage;
