import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import Pagination from "@/components/Pagination";
import getSeries from "@/lib/api/external/series/getSeries";

const PopularSeriesFirstPage = async () => {
  const link = "popular";
  const pageNum = 1;
  const data = await getSeries(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <>
      <SeriesCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/series/popular"
        path2="/series/popular"
      />
    </>
  );
};

export default PopularSeriesFirstPage;
