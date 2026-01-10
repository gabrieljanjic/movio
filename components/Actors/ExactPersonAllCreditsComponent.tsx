import { formatYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ExactPersonAllCreditsComponent = ({ data }: { data: any }) => {
  return (
    <div className="flex gap-10 mb-6 mt-4">
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold mb-3">Cast</h1>
        <div className="w-full custom-box-shadow-md rounded-lg">
          {data.cast.map((cast: any) => (
            <div
              key={cast.id}
              className="border-b-[1px] border-slate-400 last:border-b-0 px-2 py-1"
            >
              <div className="px-2 py-1 flex gap-2">
                <p className="font-bold">-</p>
                <div>
                  <div className="flex gap-2">
                    <Link
                      className="hover:underline"
                      href={
                        cast.name ? `/series/${cast.id}` : `/movies/${cast.id}`
                      }
                    >
                      <h3 className="font-semibold">
                        {cast.title || cast.name}
                      </h3>
                    </Link>
                    <p>•</p>
                    {cast.first_air_date && (
                      <p>{formatYear(cast.first_air_date)}</p>
                    )}
                    {cast.release_date && (
                      <p>{formatYear(cast.release_date)}</p>
                    )}
                  </div>
                  <div>
                    <p>as {cast.character}</p>
                  </div>
                  <div className="flex gap-2">
                    {cast.episode_count && <p>•</p>}
                    {cast.episode_count && (
                      <p>
                        {cast.episode_count}{" "}
                        {cast.episode_count === 1 ? "episode" : "episodes"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {data.crew.length > 0 && (
        <div className=" w-1/2">
          <h1 className="text-2xl font-semibold mb-3">Crew</h1>
          <div className="w-full custom-box-shadow-md rounded-lg">
            {data.crew.map((crew: any) => (
              <div
                key={crew.id}
                className="border-b-[1px] border-gray-600 last:border-b-0"
              >
                <div className="flex gap-2 px-2 py-1">
                  <p className="font-bold">-</p>
                  <div>
                    <Link href={`/person/${crew.id}`}>
                      <h3 className=" font-semibold">
                        {crew.title || crew.name}
                      </h3>
                    </Link>
                    <div className="flex gap-2">
                      {crew.release_date && (
                        <p>{formatYear(crew.release_date)}</p>
                      )}
                      {crew.release_date && crew.job && <p>•</p>}
                      {crew.job && <p>{crew.job}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExactPersonAllCreditsComponent;
