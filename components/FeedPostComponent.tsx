import { getTimeAgo } from "@/lib/utils";
import { AllPostsById, ExtendedPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import SpoilerText from "./SpoilerText";
import LikeComponent from "./LikeComponent";
import { FaRegCommentDots } from "react-icons/fa";

const FeedPostComponent = ({
  feedPosts,
  userId,
}: {
  feedPosts: AllPostsById;
  userId: string;
}) => {
  return (
    <>
      {feedPosts.posts.map((post: ExtendedPost) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500${post.tmdbRefId.posterPath}`;
        const timeAgo = getTimeAgo(new Date(post.createdAt));
        return (
          <article
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-4 hover:shadow-lg transition-shadow"
            key={post._id}
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
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200  group transition duration-300">
                <Link
                  href={
                    post.tmdbRefId.contentType === "movie"
                      ? `/movies/${post.tmdbRefId.tmdbId}`
                      : `/series/${post.tmdbRefId.tmdbId}`
                  }
                >
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <div className="relative w-32 h-48 sm:w-24 sm:h-36 flex-shrink-0 rounded-md overflow-hidden shadow-md mx-auto sm:mx-0 ">
                      <Image
                        src={imageUrl}
                        alt={post.tmdbRefId.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base md:text-lg text-gray-900 mb-1 group-hover:text-blue-500">
                        {post.tmdbRefId.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 mb-2 flex-wrap">
                        <span className="text-white bg-gray-700 px-2 text-xs md:text-sm rounded">
                          {post.tmdbRefId.voteAverage != null
                            ? Math.round(post.tmdbRefId.voteAverage * 10) + "%"
                            : "-"}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-600">
                          {post.tmdbRefId.releaseDate
                            ? new Date(post.tmdbRefId.releaseDate).getFullYear()
                            : "-"}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs md:text-sm text-gray-600">
                          {post.tmdbRefId.contentType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.tmdbRefId.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
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
          </article>
        );
      })}
    </>
  );
};

export default FeedPostComponent;
