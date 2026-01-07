import Image from "next/image";
import Link from "next/link";

const AllCreditsActorsComponent = ({ data }: { data: any }) => {
  return (
    <div className="flex">
      <div>
        <h1 className="text-2xl font-semibold">CAST</h1>
        {data.cast.map((castMember: any, index: number) => {
          return (
            <div key={`${castMember.id}-${index}`}>
              <Link href={`/person/${castMember.id}`}>
                <p>{castMember.name}</p>
              </Link>
              <p>{castMember.character}</p>
              <p>{castMember.known_for_department}</p>
              <div className="w-32 h-48 relative">
                <Image
                  src={
                    castMember.profile_path
                      ? `${process.env.TMDB_POSTER_PATH}/w300/${castMember.profile_path}`
                      : "/images/portrait-placeholder.jpg"
                  }
                  fill
                  sizes="128px"
                  alt={castMember.name}
                  className="object-cover rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-2xl font-semibold">CREW</h1>
        {data.crew.map((crewMember: any, index: number) => {
          return (
            <div key={`${crewMember.id}-${index}`}>
              <Link href={`/person/${crewMember.id}`}>
                <p>{crewMember.name}</p>
              </Link>
              <p>{crewMember.character}</p>
              <p>{crewMember.known_for_department}</p>
              <div className="w-32 h-48 relative">
                <Image
                  src={
                    crewMember.profile_path
                      ? `${process.env.TMDB_POSTER_PATH}/w300/${crewMember.profile_path}`
                      : "/images/portrait-placeholder.jpg"
                  }
                  fill
                  sizes="128px"
                  alt={crewMember.name}
                  className="object-cover rounded"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCreditsActorsComponent;
