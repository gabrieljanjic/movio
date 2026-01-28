import { User, UserResponse } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const ActorCardComponent = async ({ data }: { data: UserResponse }) => {
  return (
    <article
      className="grid justify-center place-items-center gap-3 md:gap-6
    [grid-template-columns:repeat(auto-fit,8rem)]
    sm:[grid-template-columns:repeat(auto-fit,10rem)]
    md:[grid-template-columns:repeat(auto-fit,12rem)]
  "
    >
      {data.results.map((user: User) => {
        return (
          <div
            key={user._id.toString()}
            className="w-fit h-full rounded bg-gray-50 border border-gray-300 relative cursor-pointer transform transition-all duration-300 hover:scale-102 sm:hover:scale-105 overflow-hidden shadow-sm hover:shadow-md"
          >
            <Link href={`/user/${user.userName}`} className="group">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                <Image
                  src={user.avatar || "/images/portrait-placeholder-1x1.png"}
                  fill
                  alt={user.firstName}
                  className="object-cover"
                />
              </div>
              <div className=" p-2 sm:p-3">
                <p className="font-semibold text-xs sm:text-sm md:text-base group-hover:text-blue-500">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </article>
  );
};

export default ActorCardComponent;
