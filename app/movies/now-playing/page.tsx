import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import Pagination from "@/components/Pagination";
import getMovies from "@/lib/api/external/movies/getMovies";
import SearchFormComponent from "@/components/SearchFormComponent";

const NowPlaying = async () => {
  const pageNum = 1;
  const link = "now_playing";
  const data = await getMovies(link, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6">
      <SearchFormComponent type="movies" />
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

export default NowPlaying;
