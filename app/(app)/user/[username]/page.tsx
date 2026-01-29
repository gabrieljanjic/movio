import AvatarUpload from "@/components/AvatarUpload";
import LikeComponent from "@/components/LikeComponent";
import PostDetailsComponent from "@/components/PostDetailsComponent";
import UserProfileBio from "@/components/UserProfileBio";
import { FaRegCommentDots } from "react-icons/fa";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getAllPostsById } from "@/lib/queries/post.queries";
import { getPersonProfile } from "@/lib/queries/user.queries";
import { getUserFromToken } from "@/lib/auth";
import FollowComponent from "@/components/FollowComponent";
import { checkFollow } from "@/lib/actions/userActions";
import UnFollowComponent from "@/components/UnfollowComponent";
import PaginationQuery from "@/components/PaginationQuery";

const UserProfile = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { page: string };
}) => {
  const page = Number(searchParams.page) || 1;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const myUser = token ? await getUserFromToken(token) : null;

  const user = await getPersonProfile(params.username);
  const checkFollowing = await checkFollow(
    user._id.toString(),
    myUser?._id.toString() || "",
  );

  const allPosts = await getAllPostsById(user._id, page);

  const isOwnProfile = myUser
    ? user._id.toString() === myUser._id.toString()
    : false;

  return (
    <section className="mt-10 rounded-xl bg-white p-6 custom-box-shadow-sm">
      <div className="custom-box-shadow-sm p-4 xs:p-6 mb-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Profile</h2>
          {!isOwnProfile &&
            (checkFollowing.success ? (
              <UnFollowComponent
                userId={user._id.toString()}
                myUsedId={myUser?._id.toString() || ""}
              />
            ) : (
              <FollowComponent
                userId={user._id.toString()}
                myUsedId={myUser?._id.toString() || ""}
              />
            ))}
        </div>
        <div className="flex flex-col xs:flex-row gap-8 mb-4 items-center align-center">
          {isOwnProfile ? (
            <AvatarUpload userId={user._id} currentAvatar={user.avatar} />
          ) : (
            <div className="relative w-32 h-32 md:w-48 md:h-48">
              <Image
                src={user.avatar || "/images/portrait-placeholder-1x1.png"}
                alt={user.userName}
                fill
                className="rounded-full object-cover"
              />
            </div>
          )}
          {isOwnProfile ? (
            <UserProfileBio user={user} />
          ) : (
            <div className="space-y-2 text-sm md:text-base text-gray-700 xs:mb-8">
              <div className="flex gap-2 items-center">
                <p>First name: </p>
                <p>{user.firstName}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>Last name: </p>
                <p>{user.lastName}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>Username: </p>
                <p>{user.userName}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!checkFollowing.success && !isOwnProfile ? (
        <div className="mt-12 w-full">
          <p className="text-center">
            You have to follow the person to see his posts
          </p>
        </div>
      ) : allPosts.posts.length > 0 ? (
        <div>
          {allPosts.posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg p-4 px-3 custom-box-shadow-sm mb-4"
            >
              <PostDetailsComponent post={post} />
              <div className="flex items-center gap-1 mt-5">
                <LikeComponent
                  postId={post._id}
                  userId={user._id}
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
          ))}
          <PaginationQuery
            pageNum={page}
            totalPages={allPosts.pagination.totalPages}
            path1={`/user/${params.username}`}
          />
        </div>
      ) : (
        <div className="mt-12 w-full">
          <p className="text-center">No posts yet</p>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
