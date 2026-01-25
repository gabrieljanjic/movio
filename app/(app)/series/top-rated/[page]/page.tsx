import SeriesCardComponent from "@/components/Series/SeriesCardComponent";
import Pagination from "@/components/Pagination";
import getSeries from "@/lib/api/external/series/getSeries";
import SubNavbar from "@/components/SubNavbar";
import navLinks from "@/data/navLinks";

const TopRatedSeriesOtherPages = async ({
  params,
}: {
  params: { page: number };
}) => {
  const link = "top_rated";
  const nowLink = "/series/top-rated";
  const name = "Series";
  const subNavBarItem = navLinks.find((item) => item.name === name)!;
  const pageNum = Number(params.page);
  const data = await getSeries(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="custom-card-box-shadow">
      <SubNavbar subNavBarItem={subNavBarItem} nowLink={nowLink} />
      <div className="pt-6 bg-white px-2 sm:px-4 md:px-6">
        <SeriesCardComponent data={data} />
        <Pagination pageNum={pageNum} totalPages={totalPages} path1={nowLink} />
      </div>
    </section>
  );
};

export default TopRatedSeriesOtherPages;
