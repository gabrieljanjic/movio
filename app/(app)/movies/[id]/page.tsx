import AllCreditsActorsComponent from "@/components/Actors/CreditsActorsComponent";
import CreatePostComponent from "@/components/CreatePostComponent";
import ListAllPostsComponent from "@/components/ListAllPostsComponent";
import MoviesSingleComponent from "@/components/Movies/MoviesSingleComponent";
import getExactMovie from "@/lib/api/external/movies/getExactMovie";
import getExactMovieCast from "@/lib/api/external/movies/getExactMovieCast";
import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

const SingleMovieView = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const dataCredits = await getExactMovieCast(params.id);

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;
  console.log("User", user);
  const slice = true;
  return (
    <section className="mt-6 px-3">
      <MoviesSingleComponent data={data} />
      <AllCreditsActorsComponent
        dataCredits={dataCredits}
        id={params.id}
        type="movies"
      />
      {user && (
        <>
          <CreatePostComponent
            contentId={params.id}
            userId={user._id}
            userName={user.userName}
            title={data.title}
          />
          <ListAllPostsComponent
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
