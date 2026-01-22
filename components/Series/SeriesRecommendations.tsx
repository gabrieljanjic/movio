import Image from "next/image";
import { formRating, getColorByPercentage } from "@/lib/utils";
import Link from "next/link";

const SeriesRecommendations = ({
  dataRecommendations,
}: {
  dataRecommendations: any;
}) => {
  return (
    <div className="p-4 sm:p-6 bg-white">
      <h1 className="text-xl sm:text-2xl mb-3 sm:mb-4 font-semibold">
        Recommendations
      </h1>
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {dataRecommendations.results.slice(0, 10).map((series: any) => {
          return (
            <div
              className="flex-shrink-0 w-[150px] sm:w-[170px] border border-gray-200 bg-gray-50 rounded"
              key={series.id}
            >
              <div className="relative">
                <Image
                  src={
                    series.backdrop_path
                      ? `${process.env.TMDB_POSTER_PATH}/w200/${series.backdrop_path}`
                      : "/images/no-image-found-horizontal-16-9.jpg"
                  }
                  width={178}
                  height={100}
                  alt={series.name}
                  className="rounded-t w-full h-auto"
                />
                <div
                  className={`absolute left-2 -bottom-4 sm:-bottom-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold bg-neutral-700 ${getColorByPercentage(
                    series.vote_average * 10,
                  )}`}
                >
                  <p className="text-[11px] sm:text-[12px]">
                    {formRating(series.vote_average)}
                  </p>
                  <span className="text-[6px] sm:text-[7px]">%</span>
                </div>
              </div>
              <Link href={`/series/${series.id}`}>
                <p className="text-sm sm:text-base text-gray-800 px-2 mt-5 sm:mt-6 pb-2 hover:text-blue-500 transition duration-300 line-clamp-2">
                  {series.name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesRecommendations;
