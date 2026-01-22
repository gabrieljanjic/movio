import { formatDate } from "@/lib/utils";
import Image from "next/image";

const ExactPersonBioComponent = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 rounded-tl rounded-tr">
      <div className="relative w-40 h-60 sm:w-48 sm:h-72 mx-auto md:mx-0">
        <Image
          src={
            data.profile_path
              ? `${process.env.TMDB_POSTER_PATH}/w500/${data.profile_path}`
              : "/images/portrait-placeholder.jpg"
          }
          fill
          alt={data.name}
          className="rounded"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-xl md:text-2xl font-semibold mb-1">{data.name}</h1>
        <div className="flex flex-col xs:flex-row text-xs sm:text-sm gap-2 mb-5">
          {data.birthday && (
            <p className="text-gray-600">{formatDate(data.birthday)}</p>
          )}
          {data.birthday && <p className="text-gray-600 hidden xs:block">•</p>}
          {data.place_of_birth && (
            <p className="text-gray-600">{data.place_of_birth}</p>
          )}
        </div>
        <h2 className="text-lg md:text-xl font-semibold mb-1 text-gray-800">
          Biography
        </h2>
        <div>
          {data.biography ? (
            <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
              {data.biography}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExactPersonBioComponent;
