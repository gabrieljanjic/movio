import CreatePostComponent from "@/components/CreatePostComponent";
import ListAllPostsComponent from "@/components/ListAllPostsComponent";
import getExactMovie from "@/lib/api/external/movies/getExactMovie";
import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

const AllPosts = async ({ params }: { params: { id: string } }) => {
  const data = await getExactMovie(params.id);
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;
  const slice = false;
  return (
    <section className="mt-6 custom-box-shadow-sm rounded-lg">
      {user && (
        <CreatePostComponent
          contentId={params.id}
          user={user}
          wholeContent={data}
          contentType="movie"
        />
      )}
      {user && (
        <ListAllPostsComponent
          id={data.id}
          userId={user._id}
          slice={slice}
          type={"movies"}
        />
      )}
    </section>
  );
};

export default AllPosts;
