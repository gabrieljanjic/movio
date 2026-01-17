import Image from "next/image";
import { formatYear, formRating } from "@/lib/utils";
import Link from "next/link";

const FavoritesWatchlistSoloComponent = ({ item }: { item: any }) => {
  return (
    <div
      key={item._id.toString()}
      className="flex gap-2 rounded-lg custom-box-shadow overflow-hidden"
    >
      <div className="min-w-40 min-h-60">
        <Image
          src={
            item.contentId.posterPath
              ? `${process.env.TMDB_POSTER_PATH}/w200${item.contentId.posterPath}`
              : "/images/no-image-placeholder.png"
          }
          alt={item.contentId.title || item.contentId.name}
          width={160}
          height={240}
          className="object-fit"
        />
      </div>
      <div className="p-4">
        <Link
          className="hover:underline"
          href={
            item.contentId.contentType === "movie"
              ? `/movies/${item.contentId.tmdbId}`
              : `/series/${item.contentId.tmdbId}`
          }
        >
          <h1 className="text-2xl font-bold mb-1">
            {item.contentId.title || item.contentId.name}
          </h1>
        </Link>
        <div className="flex gap-2 items-center mb-4">
          <div className="rounded bg-gray-700 w-fit px-2 flex items-center">
            <p className="text-white text-sm">
              {formRating(item.contentId.voteAverage)}
              <span className="text-[8px]"> %</span>
            </p>
          </div>
          {item.contentId.releaseDate && <p>•󠁏</p>}
          {item.contentId.releaseDate && (
            <p>{formatYear(item.contentId.releaseDate)}</p>
          )}
          {item.contentId.contentType && <p>•󠁏</p>}
          {item.contentId.contentType && (
            <p>{item.contentId.contentType === "tv" ? "series" : "movie"}</p>
          )}
        </div>
        {}
        <p className="text-xl font-bold mt-3">Overview</p>
        <p className="mb-3">
          {item.contentId.overview ? item.contentId.overview : "-"}
        </p>
      </div>
    </div>
  );
};

export default FavoritesWatchlistSoloComponent;
