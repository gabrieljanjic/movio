import AllCreditsActorsComponent from "@/components/Actors/CreditsActorsComponent";
import MoviesSingleComponent from "@/components/Movies/MoviesSingleComponent";
import getExactMovie from "@/lib/api/external/movies/getExactMovie";
import getExactMovieCast from "@/lib/api/external/movies/getExactMovieCast";

const SingleMovieView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const dataCredits = await getExactMovieCast(params.id);
  return (
    <section className="mt-6">
      <MoviesSingleComponent data={data} />
      <AllCreditsActorsComponent
        dataCredits={dataCredits}
        id={params.id}
        type="movies"
      />
    </section>
  );
};

export default SingleMovieView;
