import { getTimeAgo } from "@/lib/utils";
import { Comment } from "@/types/types";
import Link from "next/link";

const AllCommentsComponent = ({ comments }: { comments: Comment[] }) => {
  return (
    <article>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => {
            return (
              <div
                className="space-y-1 mt-3 border border-gray-200 px-3 py-1 rounded-lg"
                key={comment._id}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center ">
                    {comment.user.userName[0].toUpperCase()}
                  </div>
                  <div>
                    <Link href={`/user/${comment.user.userName}`}>
                      <p className="font-semibold text-gray-800 hover:underline">
                        {comment.user.userName}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400">
                      {getTimeAgo(new Date(comment.createdAt))}
                    </p>
                  </div>
                </div>
                <p className="ml-9">{comment.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 text-center mb-4">
          No comments yet be the first now
        </div>
      )}
    </article>
  );
};

export default AllCommentsComponent;
