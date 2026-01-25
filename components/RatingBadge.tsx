import { formRating, getColorByPercentage } from "@/lib/utils";

const RatingBadge = ({ voteAverage }: { voteAverage: number }) => {
  return (
    <div
      className={`absolute -bottom-5 left-6 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-neutral-700 ${getColorByPercentage(
        voteAverage * 10,
      )}`}
    >
      {voteAverage > 0 ? (
        <>
          {formRating(voteAverage)}
          <span className="text-[8px]">%</span>
        </>
      ) : (
        <span>-</span>
      )}
    </div>
  );
};

export default RatingBadge;
