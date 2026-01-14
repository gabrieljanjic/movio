import Link from "next/link";
import LikeCommentComponent from "./LikeCommentComponent";
import { getPostsByContentId } from "@/lib/queries/post.queries";
import { IoIosArrowRoundForward } from "react-icons/io";

const ListAllPostsComponent = async ({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) => {
  const posts = await getPostsByContentId(id, userId);
  return (
    <section className="bg-white flex flex-col gap-3 p-4">
      {posts.length ? (
        posts.slice(0, 5).map((post: any) => (
          <div
            key={post._id}
            className="bg-white  rounded-lg p-4  custom-box-shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {post.createdBy.firstName[0]}
                </div>
                <div>
                  <Link href={`/user/${post.createdBy._id}`}>
                    <p className="font-semibold text-gray-800 hover:underline">
                      {post.createdBy.firstName}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                {post.rating}/10
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{post.postContent}</p>
            <LikeCommentComponent
              postId={post._id}
              userId={userId}
              initialLiked={post.isLikedByUser}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No posts yet. Be the first one
        </p>
      )}
      {posts.length > 3 && (
        <div className="flex justify-center w-full">
          <Link
            href={`/movies/${id}/all-posts`}
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
