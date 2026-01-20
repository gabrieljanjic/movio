import Image from "next/image";
import Link from "next/link";

const ActorCardComponent = async ({ data }: { data: any }) => {
  return (
    <section>
      <div className="grid justify-center gap-x-4 gap-y-6 px-6 mt-2 [grid-template-columns:repeat(auto-fill,minmax(200px,200px))]">
        {data.results.map((person: any) => {
          return (
            <div className="bg-gray-50 border border-gray-200 max-w-48 rounded-lg overflow-x-hidden h-full cursor-pointer transform transition duration-300 hover:scale-102 ">
              <Link href={`/person/${person.id}`} className="group">
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
                  <p className="p-2 pb-4 font-semibold group-hover:text-blue-500">
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
