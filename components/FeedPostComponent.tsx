import { getTimeAgo } from "@/lib/utils";
import { FeedResponse } from "@/types/types";
import Image from "next/image";

const FeedPostComponent = ({ feedPosts }: { feedPosts: FeedResponse }) => {
  return (
    <>
      {feedPosts.posts.map((post) => {
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
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {post.createdBy.firstName}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  @{post.createdBy.userName} · {timeAgo}
                </p>
              </div>
            </div>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="relative sm:w-24 sm:h-36 max-w-40 sm:max-w-none flex-shrink-0 rounded-md overflow-hidden shadow-md mx-auto sm:mx-0 ">
                    <Image
                      src={imageUrl}
                      alt={post.tmdbRefId.title}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">
                      {post.tmdbRefId.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 mb-2 flex-wrap">
                      {post.tmdbRefId.voteAverage != null
                        ? Math.round(post.tmdbRefId.voteAverage * 10) + "%"
                        : "-"}
                      <span className="text-gray-400">•</span>
                      <span className="text-xs text-gray-600">
                        {post.tmdbRefId.releaseDate
                          ? new Date(post.tmdbRefId.releaseDate).getFullYear()
                          : "-"}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {post.contentType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {post.tmdbRefId.overview}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-700">Rating:</span>
                <div className="flex items-center gap-1">
                  <span className="ml-1 font-bold text-gray-900">
                    {post.rating}/10
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-800 text-base leading-relaxed">
                  {post.postContent}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default FeedPostComponent;
