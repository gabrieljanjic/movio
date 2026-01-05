import CreditsActors from "@/components/Actors/CreditsActors";
import AllSeasonsComponent from "@/components/Series/AllSeasonsComponent";
import SeriesSingleComponent from "@/components/Series/SeriesSingleComponent";
import getExactSeries from "@/lib/api/external/getExactSeries";
import getExactSeriesCast from "@/lib/api/external/getExactSeriesCast";

const SingleSeriesView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactSeries(params.id);
  console.log(data);
  const dataCredits = await getExactSeriesCast(params.id);
  return (
    <section>
      <SeriesSingleComponent data={data} />
      <hr className="border-1 mt-3 mb-1 border-gray-300"></hr>
      <CreditsActors dataCredits={dataCredits} id={params.id} />
      <hr className="border-1 mt-3 mb-1 border-gray-300"></hr>
      <AllSeasonsComponent data={data} />
    </section>
  );
};

export default SingleSeriesView;
