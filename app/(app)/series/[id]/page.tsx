import CreditsActors from "@/components/Actors/CreditsActorsComponent";
import AllSeasonsComponent from "@/components/Series/AllSeasonsComponent";
import SeriesRecommendations from "@/components/Series/SeriesRecommendations";
import SeriesSingleComponent from "@/components/Series/SeriesSingleComponent";
import getExactSeries from "@/lib/api/external/series/getExactSeries";
import getExactSeriesCast from "@/lib/api/external/series/getExactSeriesCast";
import getSeriesRecommendations from "@/lib/api/external/series/getSeriesRecommendations";

const SingleSeriesView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactSeries(params.id);
  const dataCredits = await getExactSeriesCast(params.id);
  const dataRecommendations = await getSeriesRecommendations(params.id);
  return (
    <section className="mt-6">
      <SeriesSingleComponent data={data} />
      {dataCredits.cast.length > 0 && (
        <CreditsActors dataCredits={dataCredits} id={params.id} type="series" />
      )}
      <AllSeasonsComponent data={data} />
      <SeriesRecommendations dataRecommendations={dataRecommendations} />
    </section>
  );
};

export default SingleSeriesView;
