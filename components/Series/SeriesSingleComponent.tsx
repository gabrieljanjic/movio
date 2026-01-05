import { formRating, getColorByPercentage } from "@/lib/utils";
import { FiEye } from "react-icons/fi";
import { FaRegStickyNote, FaHeart } from "react-icons/fa";

import Image from "next/image";
import Tooltip from "../Tooltip";

const SeriesSingleComponent = ({ data }: { data: any }) => {
  return (
    <div className="flex gap-8 p-6">
      <div className="w-[266px] shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt={data.title}
          width={266}
          height={400}
          className="rounded-xl"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
        />
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-3">{data.name}</h1>
            <div className="flex gap-2 items-center">
              <div className="relative inline-block group bg-blue-900 rounded-full cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out">
                <FaRegStickyNote className="text-white m-2" />
                <Tooltip text={"Share your thoughts"} />
              </div>
              <div className="relative inline-block group bg-blue-900 rounded-full cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out">
                <FaHeart className="text-white m-2" />
                <Tooltip text={"Add to favorites"} />
              </div>
              <div className="relative inline-block group bg-blue-900 rounded-full cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-out">
                <FiEye className="text-white m-2" />
                <Tooltip text={"Add to watch list"} />
              </div>
            </div>
          </div>
          <div className="flex mb-4">
            {data.genres.length > 0 && (
              <div className="flex gap-2">
                {data.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center mb-2">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm bg-neutral-700 ${getColorByPercentage(
                data.vote_average * 10
              )}`}
            >
              {data.vote_average ? (
                <>
                  {formRating(data.vote_average)}
                  <span className="text-[10px]">%</span>
                </>
              ) : (
                <p className="text-[10px]">?</p>
              )}
            </div>
            <p className="font-semibold">User score</p>
          </div>
          {data.tagline && <p className="italic mb-2">{data.tagline}</p>}
          <p className="text-xl font-bold">Overview</p>
          <div className="flex gap-2 mb-2">
            {data.number_of_seasons && (
              <span>
                <span className="font-semibold">{data.number_of_seasons}</span>{" "}
                seasons
              </span>
            )}
            {data.number_of_seasons && <span>•</span>}
            {data.number_of_episodes && (
              <span>
                <span className="font-semibold">{data.number_of_episodes}</span>{" "}
                episodes
              </span>
            )}
          </div>
          <p className="mb-3">{data.overview}</p>
          {data.homepage && (
            <a href={data.homepage} target="_blank" className="text-blue-700">
              Official website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesSingleComponent;
