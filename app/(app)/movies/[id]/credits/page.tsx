import AllCreditsActorsComponent from "@/components/Actors/AllCreditsActorsComponent";
import getExactMovie from "@/lib/api/external/movies/getExactMovie";
import getExactMovieCast from "@/lib/api/external/movies/getExactMovieCast";
import { AllCredits, MovieDetail } from "@/types/types";

const AllMoviesCreditsActors = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data: AllCredits = await getExactMovieCast(params.id);
  const movie: MovieDetail = await getExactMovie(params.id);
  return <AllCreditsActorsComponent data={data} movie={movie} />;
};

export default AllMoviesCreditsActors;
