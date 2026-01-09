import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";

const UpcomingOtherPages = async ({ params }: { params: { page: number } }) => {
  const link = "upcoming";
  const pageNum = Number(params.page);
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-8">
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/now-playing"
        path2="/movies/now-playing"
      />
    </section>
  );
};

export default UpcomingOtherPages;
