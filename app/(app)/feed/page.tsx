import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import { getAllFollows } from "@/lib/queries/feed.queries";
import FavoritesWatchlistSoloComponent from "@/components/FavoritesWatchlistSoloComponent";
import Image from "next/image";
import Link from "next/link";
import { formatYear, formRating } from "@/lib/utils";

const Feed = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;
  if (!user) {
    return (
      <GeneralCenterComponent text="You have to be logged in to see your feed" />
    );
  }

  const feedPosts = await getAllFollows(user._id);
  console.log(feedPosts);
  return (
    <section>
      {feedPosts.map((item) => {
        return (
          <div
            key={item._id.toString()}
            className="flex gap-2 rounded-lg custom-box-shadow overflow-hidden mt-6 space-y-4"
          >
            <div className="min-w-40 min-h-60">
              <Image
                src={
                  item.tmdbRefId.posterPath
                    ? `${process.env.TMDB_POSTER_PATH}/w200${item.tmdbRefId.posterPath}`
                    : "/images/no-image-placeholder.png"
                }
                alt={item.tmdbRefId.title || item.tmdbRefId.name}
                width={160}
                height={240}
                className="object-fit"
              />
            </div>
            <div className="p-4">
              <Link
                className="hover:underline"
                href={
                  item.tmdbRefId.contentType === "movie"
                    ? `/movies/${item.tmdbRefId.tmdbId}`
                    : `/series/${item.tmdbRefId.tmdbId}`
                }
              >
                <h1 className="text-2xl font-bold mb-1">
                  {item.tmdbRefId.title || item.tmdbRefId.name}
                </h1>
              </Link>
              <div className="flex gap-2 items-center mb-4">
                <div className="rounded bg-gray-700 w-fit px-2 flex items-center">
                  <p className="text-white text-sm">
                    {formRating(item.tmdbRefId.voteAverage)}
                    <span className="text-[8px]"> %</span>
                  </p>
                </div>
                {item.tmdbRefId.releaseDate && <p>•󠁏</p>}
                {item.tmdbRefId.releaseDate && (
                  <p>{formatYear(item.tmdbRefId.releaseDate)}</p>
                )}
                {item.tmdbRefId.contentType && <p>•󠁏</p>}
                {item.tmdbRefId.contentType && (
                  <p>
                    {item.tmdbRefId.contentType === "tv" ? "series" : "movie"}
                  </p>
                )}
              </div>
              {}
              <p className="text-xl font-bold mt-3">Overview</p>
              <p className="mb-3">
                {item.tmdbRefId.overview ? item.tmdbRefId.overview : "-"}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Feed;
