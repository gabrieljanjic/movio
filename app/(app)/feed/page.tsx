import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import { getAllFollows } from "@/lib/queries/feed.queries";
import FeedPostComponent from "@/components/FeedPostComponent";
import PaginationQuery from "@/components/PaginationQuery";
import { FeedResponse } from "@/types/types";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const Feed = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const page = Number(searchParams.page) || 1;
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
  const feedPosts: FeedResponse = await getAllFollows(user._id, page);
  return (
    <section>
      {feedPosts.posts.length > 0 ? (
        <div className="mt-6 px-4">
          <FeedPostComponent feedPosts={feedPosts} />
          <PaginationQuery
            pageNum={page}
            totalPages={feedPosts.pagination.totalPages}
            path1={"/feed"}
          />
        </div>
      ) : (
        <div className="mt-12 mx-auto w-full text-center text-base sm:text-lg md:text-xl text-gray-900">
          There are currently no posts in the feed.
        </div>
      )}
    </section>
  );
};

export default Feed;
