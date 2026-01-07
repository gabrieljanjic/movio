import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";

const PopularOtherPages = async ({ params }: { params: { page: string } }) => {
  const link = "popular";
  const pageNum = Number(params.page);
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <>
      <MovieCardComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/movies/now-playing"
        path2="/movies/now-playing"
      />
    </>
  );
};

export default PopularOtherPages;
