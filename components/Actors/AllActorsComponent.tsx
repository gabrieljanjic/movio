import Image from "next/image";
import Link from "next/link";

const AllActorsComponent = async ({ data }: { data: any }) => {
  return (
    <section>
      <div className="grid justify-items-center gap-y-6 px-6 mt-2 [grid-template-columns:repeat(auto-fill,minmax(200px,200px))]">
        {data.results.map((person: any) => {
          return (
            <div className="custom-box-shadow max-w-48 rounded overflow-x-hidden h-full">
              <div className="w-48 h-72 relative">
                <Image
                  src={
                    person.profile_path
                      ? `${process.env.TMDB_POSTER_PATH}/w500/${person.profile_path}`
                      : "/images/portrait-placeholder.jpg"
                  }
                  fill
                  sizes="160px"
                  alt={person.name}
                  className="object-cover"
                />
              </div>
              <div>
                <Link href={`/person/${person.id}`}>
                  <p className="p-2 pb-4 font-semibold hover:underline">
                    {person.name}
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllActorsComponent;
