import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import { getAllFollows } from "@/lib/queries/feed.queries";
import FeedPostComponent from "@/components/FeedPostComponent";

const Feed = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;
  if (!user) {
    return (
      <GeneralCenterComponent
        text="You have to be logged in to see your feed"
        login={true}
      />
    );
  }

  const feedPosts = await getAllFollows(user._id);
  return (
    <section className="mt-6 px-4">
      {feedPosts.map((item) => {
        return <FeedPostComponent post={item} />;
      })}
    </section>
  );
};

export default Feed;
