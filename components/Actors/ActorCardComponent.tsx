import Image from "next/image";
import Link from "next/link";

const ActorCardComponent = async ({ data }: { data: any }) => {
  return (
    <section>
      <div className="grid justify-center gap-x-4 gap-y-6 px-6 mt-2 [grid-template-columns:repeat(auto-fill,minmax(200px,200px))]">
        {data.results.map((person: any) => {
          return (
            <div className="custom-box-shadow max-w-48 rounded overflow-x-hidden h-full cursor-pointer transform transition hover:scale-102 custom-hover-box-shadow">
              <Link href={`/person/${person.id}`}>
                <div className="w-48 h-72 relative">
                  <Image
                    src={
                      person.profile_path
                        ? `${process.env.TMDB_POSTER_PATH}/w500/${person.profile_path}`
                        : "/images/portrait-placeholder.jpg"
                    }
                    fill
                    sizes="200px"
                    alt={person.name}
                    className="object-cover"
                  />
                </div>
                <div className="bg-white">
                  <p className="p-2 pb-4 font-semibold hover:underline">
                    {person.name}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActorCardComponent;
