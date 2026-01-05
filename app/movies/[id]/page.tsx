import CreditsActors from "@/components/Actors/CreditsActors";
import MoviesSingleComponent from "@/components/Movies/MoviesSingleComponent";
import getExactMovie from "@/lib/api/external/getExactMovie";
import getExactMovieCast from "@/lib/api/external/getExactMovieCast";

const SingleMovieView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const dataCredits = await getExactMovieCast(params.id);
  console.log(dataCredits.cast);
  return (
    <section>
      <MoviesSingleComponent data={data} />
      <CreditsActors dataCredits={dataCredits} id={params.id} />
    </section>
  );
};

export default SingleMovieView;
