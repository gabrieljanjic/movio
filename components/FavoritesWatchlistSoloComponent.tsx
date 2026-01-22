import Image from "next/image";
import { formatYear, formRating } from "@/lib/utils";
import Link from "next/link";

const FavoritesWatchlistSoloComponent = ({ item }: { item: any }) => {
  const { contentId } = item;
  const isMovie = contentId.contentType === "movie";
  const title = contentId.title || contentId.name;
  const posterUrl = contentId.posterPath
    ? `${process.env.TMDB_POSTER_PATH}/w200${contentId.posterPath}`
    : "/images/no-image-placeholder.png";

  return (
    <div className="p-2" key={item._id}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4 p-4">
          <Link
            href={
              isMovie
                ? `/movies/${contentId.tmdbId}`
                : `/series/${contentId.tmdbId}`
            }
            className="flex-shrink-0"
          >
            <div className="relative w-32 h-48 xs:w-48 xs:h-72 md:w-32 md:h-48 rounded-md overflow-hidden shadow-md hover:scale-102 sm:hover:scale-105 transition-transform">
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              href={
                isMovie
                  ? `/movies/${contentId.tmdbId}`
                  : `/series/${contentId.tmdbId}`
              }
              className="hover:text-blue-600 transition-colors"
            >
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {title}
              </h2>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {formRating(contentId.voteAverage)}%
                </span>
              </div>

              {contentId.releaseDate && (
                <>
                  <span className="text-xs sm:text-sm text-gray-400">•</span>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {formatYear(contentId.releaseDate)}
                  </span>
                </>
              )}

              {contentId.contentType && (
                <>
                  <span className="text-xs sm:text-sm text-gray-400">•</span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {isMovie ? "movie" : "series"}
                  </span>
                </>
              )}
            </div>
            {contentId.overview && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Overview
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {contentId.overview}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesWatchlistSoloComponent;
