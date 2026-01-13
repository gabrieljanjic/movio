import AllCreditsActorsComponent from "@/components/Actors/AllCreditsActorsComponent";
import getExactSeries from "@/lib/api/external/series/getExactSeries";
import getExactSeriesCast from "@/lib/api/external/series/getExactSeriesCast";

const AllSeriesCreditsActors = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getExactSeriesCast(params.id);
  const series = await getExactSeries(params.id);
  return <AllCreditsActorsComponent data={data} series={series} />;
};

export default AllSeriesCreditsActors;
