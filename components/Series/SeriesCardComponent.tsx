import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";
import { SeriesCardProps } from "@/types/types";

export default function SeriesCardComponent({
  data,
}: {
  data: SeriesCardProps;
}) {
  return (
    <article className="px-0 sm:px-4">
      <div
        className="grid justify-center place-items-center gap-3 md:gap-6
    [grid-template-columns:repeat(auto-fit,8rem)]
    sm:[grid-template-columns:repeat(auto-fit,10rem)]
    md:[grid-template-columns:repeat(auto-fit,12rem)]
  "
      >
        {data.results.map((series) => (
          <div
            key={series.id}
            className="w-fit h-full rounded bg-gray-50 border border-gray-300 relative cursor-pointer transform transition-all duration-300 hover:scale-102 sm:hover:scale-105 overflow-hidden shadow-sm hover:shadow-md"
          >
            <Link href={`/series/${series.id}`} className="group">
              <div className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72">
                <Image
                  src={
                    series.poster_path
                      ? `${process.env.TMDB_POSTER_PATH}/w500${series.poster_path}`
                      : "/images/no-image-placeholder.png"
                  }
                  alt={series.name}
                  fill
                  className="object-cover rounded-t"
                />
                <RatingBadge voteAverage={series.vote_average || 0} />
              </div>
              <div className="mt-3 md:mt-2 p-2 sm:p-3">
                <p className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-blue-500">
                  {series.name}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {formatDate(series.first_air_date)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
}
