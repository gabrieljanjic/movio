import { formRating, getColorByPercentage } from "@/lib/utils";
import { FiEye } from "react-icons/fi";
import { FaRegStickyNote, FaHeart } from "react-icons/fa";
import Image from "next/image";
import Tooltip from "../Tooltip";
import { getDominantColor } from "@/lib/utils";

const SeriesSingleComponent = async ({ data }: { data: any }) => {
  let backgroundStyle = {
    background:
      "linear-gradient(0deg, rgb(255,255,255) 0%, rgba(0,0,0,0.85) 70%)",
  };
  let posterUrl = "";

  if (data.poster_path) {
    posterUrl = `${process.env.TMDB_POSTER_PATH}/w300${data.poster_path}`;

    try {
      const dominantColor = await getDominantColor(posterUrl);
      backgroundStyle = {
        background: `linear-gradient(
          0deg,
          rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}) 0%,
          rgba(0,0,0,0.85) 70%
        )`,
      };
    } catch (error) {
      console.error("Failed to get dominant color:", error);
    }
  }

  return (
    <div className="flex gap-8 p-8 rounded text-white" style={backgroundStyle}>
      <div className="w-[266px] shrink-0">
        <Image
          src={posterUrl}
          alt={data.name}
          width={266}
          height={400}
          className="rounded-xl"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-3">{data.name}</h1>

          <div className="flex gap-2 items-center">
            <div className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition">
              <FaRegStickyNote className="text-white m-2" />
              <Tooltip text="Share your thoughts" />
            </div>

            <div className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition">
              <FaHeart className="text-white m-2" />
              <Tooltip text="Add to favorites" />
            </div>

            <div className="relative inline-block group bg-black/40 rounded-full cursor-pointer hover:scale-110 transition">
              <FiEye className="text-white m-2" />
              <Tooltip text="Add to watch list" />
            </div>
          </div>
        </div>

        <div className="flex mb-4 gap-2">
          {data.genres?.map((genre: any) => (
            <span
              key={genre.id}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-black"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="flex gap-2 items-center mb-2">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${getColorByPercentage(
              data.vote_average * 10
            )}`}
          >
            {data.vote_average ? (
              <>
                {formRating(data.vote_average)}
                <span className="text-[10px]">%</span>
              </>
            ) : (
              <span className="text-[10px]">?</span>
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

        <p className="mb-3 max-w-2xl">{data.overview}</p>

        {data.homepage && (
          <a
            href={data.homepage}
            target="_blank"
            className="text-blue-300 underline"
          >
            Official website
          </a>
        )}
      </div>
    </div>
  );
};

export default SeriesSingleComponent;
