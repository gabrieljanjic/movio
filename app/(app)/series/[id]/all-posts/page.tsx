import CreatePostComponent from "@/components/CreatePostComponent";
import ListAllPostsComponent from "@/components/ListAllPostsComponent";
import getExactSeries from "@/lib/api/external/series/getExactSeries";
import { getUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers";

const AllPosts = async ({ params }: { params: { id: string } }) => {
  const data = await getExactSeries(params.id);
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;
  const slice = false;
  return (
    <section className="mt-6 custom-box-shadow-sm rounded-lg">
      {user && (
        <CreatePostComponent
          contentId={params.id}
          userId={user._id}
          userName={user.userName}
          title={data.name}
        />
      )}
      {user && (
        <ListAllPostsComponent
          id={data.id}
          userId={user._id}
          slice={slice}
          type={"series"}
        />
      )}
    </section>
  );
};

export default AllPosts;
