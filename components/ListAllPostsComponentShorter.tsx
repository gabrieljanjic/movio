import Link from "next/link";
import LikeComponent from "./LikeComponent";
import { getPostsByContentId } from "@/lib/queries/post.queries";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import PostDetailsComponent from "./PostDetailsComponent";
import { ExtendedPost } from "@/types/types";
import Image from "next/image";
import { getTimeAgo } from "@/lib/utils";
import SpoilerText from "./SpoilerText";

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
  console.log("NNNNN", posts);
  return (
    <section className="bg-white flex flex-col gap-3 p-4 pb-6 md:pb-8">
      {posts.length ? (
        posts.map((post: ExtendedPost) => {
          const timeAgo = getTimeAgo(new Date(post.createdAt));
          return (
            <div
              key={post._id}
              className="bg-white rounded-lg p-3 md:p-4 px-3 custom-box-shadow-sm"
            >
              <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 ">
                <Image
                  src={
                    post.createdBy.avatar ||
                    "/images/portrait-placeholder-1x1.png"
                  }
                  alt={post.createdBy.userName}
                  width={40}
                  height={40}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/user/${post.createdBy.userName}`}
                    className="hover:underline"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {post.createdBy.firstName}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 truncate">
                    @{post.createdBy.userName} · {timeAgo}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap ml-1">
                <span className="font-semibold text-gray-700">Rating:</span>
                <div className="flex items-center gap-1">
                  <span className="ml-1 text-sm md:text-base font-semibold text-gray-700">
                    {post.rating}/10
                  </span>
                </div>
              </div>
              <div className="mt-2 ml-1">
                {post.spoiler ? (
                  <SpoilerText text={post.postContent} />
                ) : (
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                    {post.postContent}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2 md:mt-5 ml-1">
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
          );
        })
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No posts yet. Be the first one
        </p>
      )}
      {posts.length > 2 && slice && (
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
