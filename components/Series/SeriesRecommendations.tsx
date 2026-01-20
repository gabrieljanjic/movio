import Image from "next/image";
import { formRating, getColorByPercentage } from "@/lib/utils";
import Link from "next/link";

const SeriesRecommendations = ({
  dataRecommendations,
}: {
  dataRecommendations: any;
}) => {
  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl mb-4 font-semibold">Recommendations</h1>
      <div className="flex overflow-x-auto">
        {dataRecommendations.results.slice(0, 10).map((series: any) => {
          return (
            <div
              className="max-w-[170] border border-gray-200 bg-gray-50 my-2 mx-2 rounded"
              key={series.id}
            >
              <div className="relative min-w-[178px] " key={series.id}>
                <Image
                  src={
                    series.backdrop_path
                      ? `${process.env.TMDB_POSTER_PATH}/w200/${series.backdrop_path}`
                      : "/images/no-image-found-horizontal-16-9.jpg"
                  }
                  width={178}
                  height={100}
                  alt={series.name}
                  className="rounded-tl rounded-tr"
                />
                <div
                  className={`absolute left-2 -bottom-5  w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm bg-neutral-700 ${getColorByPercentage(
                    series.vote_average * 10,
                  )}`}
                >
                  <p className="text-[12px]">
                    {formRating(series.vote_average)}
                  </p>
                  <span className="text-[7px]">%</span>
                </div>
              </div>
              <Link href={`/series/${series.id}`}>
                <p className="text-gray-800 ml-2 mt-6 hover:text-blue-500 transition duration-300 mb-2">
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
