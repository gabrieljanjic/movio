import AllCreditsActorsComponent from "@/components/Actors/CreditsActorsComponent";
import CreatePostComponent from "@/components/CreatePostComponent";
import ListAllPostsComponentShorter from "@/components/ListAllPostsComponentShorter";
import MoviesSingleComponent from "@/components/Movies/MoviesSingleComponent";
import { checkIsInFavorites } from "@/lib/actions/favoritesActions";
import { checkIsInWatchlist } from "@/lib/actions/watchlistActions";
import getExactMovie from "@/lib/api/external/movies/getExactMovie";
import getExactMovieCast from "@/lib/api/external/movies/getExactMovieCast";
import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

const SingleMovieView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const dataCredits = await getExactMovieCast(params.id);
  const isInFavorites = await checkIsInFavorites(params.id);
  const isInWatchlist = await checkIsInWatchlist(params.id);

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;

  const slice = true;
  return (
    <section className="mt-4 md:mt-6 px-4 md:px-6">
      <MoviesSingleComponent
        data={data}
        isInFavorites={isInFavorites}
        isInWatchlist={isInWatchlist}
      />
      <AllCreditsActorsComponent
        dataCredits={dataCredits}
        id={params.id}
        type="movies"
      />
      {user && (
        <>
          <CreatePostComponent
            contentId={params.id}
            user={user}
            wholeContent={data}
            contentType="movie"
          />
          <ListAllPostsComponentShorter
            id={data.id}
            userId={user._id}
            slice={slice}
            type={"movies"}
          />
        </>
      )}
    </section>
  );
};

export default SingleMovieView;
