import getSeries from "@/lib/api/external/series/getSeries";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

export default function SeriesCardComponent({ data }: { data: any }) {
  return (
    <section className="px-3 sm:px-4">
      <div
        className="grid gap-4 sm:gap-5 lg:gap-6 mb-8 
                      grid-cols-2 
                      sm:grid-cols-3 
                      md:grid-cols-4 
                      lg:grid-cols-5 
                      xl:grid-cols-6"
      >
        {data.results.map((series: any) => (
          <div
            key={series.id}
            className="w-full rounded bg-gray-50 border border-gray-300 relative cursor-pointer transform transition-all duration-300 hover:scale-105 overflow-hidden shadow-sm hover:shadow-md"
          >
            <Link href={`/series/${series.id}`} className="group">
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={
                    series.poster_path
                      ? `${process.env.TMDB_POSTER_PATH}/w500${series.poster_path}`
                      : "/images/no-image-placeholder.png"
                  }
                  alt={series.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 200px"
                  className="object-cover rounded-t"
                />
                <RatingBadge movie={series} />
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
    </section>
  );
}
