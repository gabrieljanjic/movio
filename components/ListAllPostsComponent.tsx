import Link from "next/link";
import LikeComponent from "./LikeComponent";
import { getPostsByContentId } from "@/lib/queries/post.queries";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import PostDetailsComponent from "./PostDetailsComponent";

const ListAllPostsComponent = async ({
  id,
  userId,
  slice,
  type,
}: {
  id: number;
  userId: string;
  slice: boolean;
  type: string;
}) => {
  const posts = await getPostsByContentId(id, userId, slice);
  return (
    <section className="bg-white flex flex-col gap-3 p-4">
      {posts.length ? (
        posts.map((post: any) => (
          <div
            key={post._id}
            className="bg-white rounded-lg p-4 px-3 custom-box-shadow-sm"
          >
            <PostDetailsComponent post={post} />
            <div className="flex items-center gap-1 mt-5">
              <LikeComponent
                postId={post._id}
                userId={userId}
                initialLiked={post.iLikedIt}
                initialLikesCount={post.likesCount}
              />
              <Link href={`/post/${post._id}`}>
                <div className="flex gap-2 items-center">
                  <p>{post.commentsCount}</p>{" "}
                  <FaRegCommentDots className="text-xl cursor-pointer" />
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No posts yet. Be the first one
        </p>
      )}
      {posts.length < 4 && posts.length > 0 && slice && (
        <div className="flex justify-center w-full">
          <Link
            href={`/${type}/${id}/all-posts`}
            className="flex items-center whitespace-nowrap hover:underline text-center"
          >
            View more <IoIosArrowRoundForward className="ms-1 text-xl" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default ListAllPostsComponent;
