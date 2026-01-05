import { formRating, getColorByPercentage } from "@/lib/utils";

const RatingBadge = ({ movie }: { movie: any }) => {
  return (
    <div
      className={`absolute -bottom-5 left-6 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-neutral-700 ${getColorByPercentage(
        movie.vote_average * 10
      )}`}
    >
      {formRating(movie.vote_average)}
      <span className="text-[8px]">%</span>
    </div>
  );
};

export default RatingBadge;
