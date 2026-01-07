import AllCreditsActorsComponent from "@/components/Actors/AllCreditsActorsComponent";
import getExactSeriesCast from "@/lib/api/external/series/getExactSeriesCast";

const AllSeriesCreditsActors = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getExactSeriesCast(params.id);
  return <AllCreditsActorsComponent data={data} />;
};

export default AllSeriesCreditsActors;
