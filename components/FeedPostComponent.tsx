import { getTimeAgo } from "@/lib/utils";
import Image from "next/image";

const FeedPostComponent = ({ post }: { post: any }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${post.tmdbRefId.posterPath}`;
  const timeAgo = getTimeAgo(new Date(post.createdAt));
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-4 hover:shadow-lg transition-shadow">
      <div className="p-4 flex items-center gap-3">
        <Image
          src={post.createdBy.avatar || "/images/portrait-placeholder-1x1.png"}
          alt={post.userName}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {post.createdBy.firstName}
          </h3>
          <p className="text-sm text-gray-500">
            @{post.createdBy.userName} · {timeAgo}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="relative w-24 h-36 flex-shrink-0 rounded-md overflow-hidden shadow-md">
            <img
              src={imageUrl}
              alt={post.tmdbRefId.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg text-gray-900 mb-1">
              {post.tmdbRefId.title}
            </h4>
            <div className="flex items-center gap-2 mt-1 mb-2 flex-wrap">
              <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full font-medium">
                {post.tmdbRefId.voteAverage.toFixed(1) * 10}%
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-600">
                {new Date(post.tmdbRefId.releaseDate).getFullYear()}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">{post.contentType}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {post.tmdbRefId.overview}
            </p>
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
};

export default FeedPostComponent;
