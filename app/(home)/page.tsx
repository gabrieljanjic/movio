import getAllTrendingThisWeek from "@/lib/api/external/getAllTrendingThisWeek";
import getAllOfTheWeek from "@/lib/api/external/movies/getAllOfTheWeek";
import getMovieByGenre from "@/lib/api/external/movies/getMovieByGenre";
import getMovieOfTheDay from "@/lib/api/external/movies/getMovieOfTheDay";
import getMovies from "@/lib/api/external/movies/getMovies";
import getSeries from "@/lib/api/external/series/getSeries";
import Image from "next/image";
import Link from "next/link";
import MovieCarouselComponent from "@/components/MovieCarouselComponent";

const Home = async () => {
  const moviesOfTheWeek = await getAllOfTheWeek();
  const movieOdTheDay = await getMovieOfTheDay();
  const moviesBestRated = await getMovies("top_rated", 1);
  const trendingThisWeek = await getAllTrendingThisWeek();
  const seriesPopular = await getSeries("popular", 1);
  const actionMovies = await getMovieByGenre(53);
  const horrorMovies = await getMovieByGenre(27);

  const heroMovie = movieOdTheDay.results[0];

  return (
    <div className="min-h-screen">
      <div className="relative h-[600px] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent z-10" />
        <Image
          src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          alt={heroMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-7xl mx-auto">
          <span className="text-white font-boldmb-4">TRENDING TODAY</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {heroMovie.title}
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg mb-6 line-clamp-3">
            {heroMovie.overview}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/movies/${heroMovie.id}`}
              className="px-8 py-3 bg-white text-gray-950 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              More Info
            </Link>
            <div className="flex items-center gap-2 text-white">
              <span className="font-bold">
                {heroMovie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[100vw] py-12 space-y-12 overflow-hidden">
        <MovieCarouselComponent
          title="Top Rated Movies"
          items={moviesBestRated.results}
          type="movie"
        />

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
