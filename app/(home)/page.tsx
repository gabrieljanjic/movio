import getAllTrendingThisWeek from "@/lib/api/external/getAllTrendingThisWeek";
import getMovieByGenre from "@/lib/api/external/movies/getMovieByGenre";
import getMovieOfTheDay from "@/lib/api/external/movies/getMovieOfTheDay";
import getMovies from "@/lib/api/external/movies/getMovies";
import getSeries from "@/lib/api/external/series/getSeries";
import Image from "next/image";
import Link from "next/link";
import MovieCarouselComponent from "@/components/MovieCarouselComponent";
import { getColorByPercentage } from "@/lib/utils";

const Home = async () => {
  const movieOdTheDay = await getMovieOfTheDay();
  const moviesBestRated = await getMovies("top_rated", 1);
  const trendingThisWeek = await getAllTrendingThisWeek();
  const seriesPopular = await getSeries("popular", 1);
  const actionMovies = await getMovieByGenre(53);
  const horrorMovies = await getMovieByGenre(27);
  const heroMovie = movieOdTheDay.results[0];

  return (
    <div className="min-h-screen">
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent z-10" />
        <Image
          src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          alt={heroMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 mx-auto">
          <span className="text-white text-sm md:text-base font-semibold mb-4">
            TRENDING TODAY
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl  font-bold text-white mb-4">
            {heroMovie.title}
          </h1>
          <p className="text-gray-300 max-w-2xl text-sm  sm:text-base  md:text-lg mb-6 line-clamp-3">
            {heroMovie.overview}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/movies/${heroMovie.id}`}
              className="px-2 py-1 sm:py-4 sm:px-2  md:px-8 md:py-3 bg-white text-gray-950 text-sm md:text-base font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              More Info
            </Link>
            <div className="flex items-center gap-2 text-white">
              <div
                className={`w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-white font-bold text-sm border-2 ${getColorByPercentage(
                  heroMovie.vote_average.toFixed(1) * 10,
                )}`}
              >
                <p className="text-[12px]">
                  {heroMovie.vote_average.toFixed(1) * 10}
                </p>
                <span className="text-[7px]">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[100vw] py-3 sm:py-6 md:py-9 lg:py-12 space-y-3 sm:space-y-6 md:space-y-9 lg:space-y-12 mx-4 overflow-hidden">
        <MovieCarouselComponent
          title="Trending This Week"
          items={trendingThisWeek.results}
          type="mixed"
        />

        <MovieCarouselComponent
          title="Popular TV Shows"
          items={seriesPopular.results}
          type="tv"
        />
        <MovieCarouselComponent
          title="Top Rated Movies"
          items={moviesBestRated.results}
          type="movie"
        />
        <MovieCarouselComponent
          title="Thriller Movies"
          items={actionMovies.results}
          type="movie"
        />

        <MovieCarouselComponent
          title="Horror Picks"
          items={horrorMovies.results}
          type="movie"
        />
      </div>
    </div>
  );
};

export default Home;
