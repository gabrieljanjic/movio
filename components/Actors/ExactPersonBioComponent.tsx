import { formatDate } from "@/lib/utils";
import Image from "next/image";

const ExactPersonBioComponent = ({ data }: { data: any }) => {
  return (
    <div className="flex gap-8">
      <div className="relative w-[233px] h-[320px] overflow-hidden rounded-lg shrink-0">
        <Image
          src={
            data.profile_path
              ? `${process.env.TMDB_POSTER_PATH}/w500/${data.profile_path}`
              : "/images/portrait-placeholder.jpg"
          }
          alt={data.name}
          fill
          className="object-cover"
          sizes="233px"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-1">{data.name}</h1>
        <div className="flex gap-2 mb-5">
          {data.birthday && (
            <p className="text-gray-600 text-sm">{formatDate(data.birthday)}</p>
          )}
          {data.birthday && <p className="text-gray-600 text-sm">•</p>}
          {data.place_of_birth && (
            <p className="text-gray-600 text-sm">{data.place_of_birth}</p>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-1 text-gray-800 mb-2">
          Biography
        </h2>
        <div>
          {data.biography ? (
            <p className="text-gray-700 whitespace-pre-line">
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
