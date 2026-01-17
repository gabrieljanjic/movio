import CreditsActors from "@/components/Actors/CreditsActorsComponent";
import CreatePostComponent from "@/components/CreatePostComponent";
import ListAllPostsComponent from "@/components/ListAllPostsComponent";
import AllSeasonsComponent from "@/components/Series/AllSeasonsComponent";
import SeriesRecommendations from "@/components/Series/SeriesRecommendations";
import SeriesSingleComponent from "@/components/Series/SeriesSingleComponent";
import { checkIsInFavorites } from "@/lib/actions/favoritesActions";
import { checkIsInWatchlist } from "@/lib/actions/watchlistActions";
import getExactSeries from "@/lib/api/external/series/getExactSeries";
import getExactSeriesCast from "@/lib/api/external/series/getExactSeriesCast";
import getSeriesRecommendations from "@/lib/api/external/series/getSeriesRecommendations";
import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

const SingleSeriesView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactSeries(params.id);

  const isInFavorites = await checkIsInFavorites(params.id);
  const isInWatchlist = await checkIsInWatchlist(params.id);

  const dataCredits = await getExactSeriesCast(params.id);
  const dataRecommendations = await getSeriesRecommendations(params.id);
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;

  const slice = true;
  return (
    <section className="mt-6">
      <SeriesSingleComponent
        data={data}
        isInFavorites={isInFavorites}
        isInWatchlist={isInWatchlist}
      />
      {dataCredits.cast.length > 0 && (
        <CreditsActors dataCredits={dataCredits} id={params.id} type="series" />
      )}
      {user && (
        <>
          <CreatePostComponent
            contentId={params.id}
            userId={user._id}
            userName={user.userName}
            avatar={user.avatar}
            title={data.name}
            wholeContent={data}
            contentType="tv"
          />
          <ListAllPostsComponent
            id={data.id}
            userId={user._id}
            avatar={user.avatar}
            slice={slice}
            type={"series"}
          />
        </>
      )}
      <AllSeasonsComponent data={data} />
      <SeriesRecommendations dataRecommendations={dataRecommendations} />
    </section>
  );
};

export default SingleSeriesView;
