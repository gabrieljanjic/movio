import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import navLinks from "@/data/navLinks";
import SubNavbar from "@/components/SubNavbar";

const UpcomingOtherPages = async ({ params }: { params: { page: number } }) => {
  const link = "upcoming";
  const nowLink = "/movies/upcoming";
  const name = "Movies";
  const subNavBarItem = navLinks.find((item) => item.name === name);
  const pageNum = Number(params.page);
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="custom-card-box-shadow">
      <SubNavbar subNavBarItem={subNavBarItem} nowLink={nowLink} />
      <div className="pt-6 bg-white">
        <MovieCardComponent data={data} />
        <Pagination pageNum={pageNum} totalPages={totalPages} path1={nowLink} />
      </div>
    </section>
  );
};

export default UpcomingOtherPages;
