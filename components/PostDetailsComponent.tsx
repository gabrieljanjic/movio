import { formRating, getColorByPercentage, getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const PostDetailsComponent = ({ post }: { post: any }) => {
  console.log(post.createdBy);
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {post.createdBy.avatar ? (
            <div className="relative w-10 h-10 sm:w-12 md:h-12">
              <Image
                src={post.createdBy.avatar}
                fill
                alt={post.createdBy.userName}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
              {post.createdBy.userName[0].toUpperCase()}
            </div>
          )}
          <div>
            <Link href={`/user/${post.createdBy.userName}`}>
              <p className="font-semibold text-gray-800 hover:underline">
                {post.createdBy.firstName}
              </p>
            </Link>
            <p className="text-xs text-gray-400">
              {getTimeAgo(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </div>
      <span className="text-gray-700">Rating: {post.rating}/10</span>
      <p className="text-gray-800 leading-relaxed">{post.postContent}</p>
    </>
  );
};

export default PostDetailsComponent;
