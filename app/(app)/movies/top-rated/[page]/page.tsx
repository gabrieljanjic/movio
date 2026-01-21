import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import SubNavbar from "@/components/SubNavbar";
import navLinks from "@/data/navLinks";

const TopRatedOtherPages = async ({ params }: { params: { page: number } }) => {
  const link = "top_rated";
  const nowLink = "/movies/top-rated";
  const name = "Movies";
  const subNavBarItem = navLinks.find((item) => item.name === name);
  const pageNum = Number(params.page);
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="custom-card-box-shadow">
      <SubNavbar subNavBarItem={subNavBarItem} nowLink={nowLink} />
      <div className="pt-6 bg-white px-2 sm:px-4 md:px-6">
        <MovieCardComponent data={data} />
        <Pagination pageNum={pageNum} totalPages={totalPages} path1={nowLink} />
      </div>
    </section>
  );
};

export default TopRatedOtherPages;
