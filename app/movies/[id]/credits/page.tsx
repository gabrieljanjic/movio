import AllCreditsActorsComponent from "@/components/Actors/AllCreditsActorsComponent";
import getExactMovieCast from "@/lib/api/external/movies/getExactMovieCast";

const AllCreditsActors = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovieCast(params.id);
  return <AllCreditsActorsComponent data={data} />;
};

export default AllCreditsActors;
