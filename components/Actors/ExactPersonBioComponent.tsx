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
          {data.birthday && <p>{formatDate(data.birthday)}</p>}
          {data.birthday && <p>•</p>}
          {data.place_of_birth && <p>{data.place_of_birth}</p>}
        </div>
        <h2 className="text-xl font-semibold mb-1">Biography</h2>
        <div>{data.biography ? <p>{data.biography}</p> : <p>-</p>}</div>
      </div>
    </div>
  );
};

export default ExactPersonBioComponent;
