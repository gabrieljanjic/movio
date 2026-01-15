import Link from "next/link";

const PostDetailsComponent = ({ post }: { post: any }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {post.createdBy.userName[0].toUpperCase()}
          </div>
          <div>
            <Link href={`/user/${post.createdBy._id}`}>
              <p className="font-semibold text-gray-800 hover:underline">
                {post.createdBy.userName}
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
    </>
  );
};

export default PostDetailsComponent;
