import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";

const TopRatedOtherPages = async ({ params }: { params: { page: number } }) => {
  const link = "top_rated";
  const pageNum = Number(params.page);
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <>
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/top-rated"
        path2="/movies/top-rated"
      />
    </>
  );
};

export default TopRatedOtherPages;
