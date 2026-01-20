import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

export default function MovieCardComponent({ data }: { data: any }) {
  return (
    <section>
      <div className="grid gap-y-6 gap-x-2 mb-8 justify-center [grid-template-columns:repeat(auto-fill,minmax(200px,200px))]">
        {data.results.map((movie: any) => {
          return (
            <div
              key={movie.id}
              className="w-48 rounded bg-gray-50 border border-gray-300 relative cursor-pointer transform transition-all duration-300 hover:scale-102 overflow-hidden"
            >
              <Link href={`/movies/${movie.id}`} className="group">
                <div className="relative w-48 h-72">
                  <Image
                    src={
                      movie.poster_path
                        ? `${process.env.TMDB_POSTER_PATH}/w500${movie.poster_path}`
                        : "/images/no-image-placeholder.png"
                    }
                    alt={movie.title}
                    fill
                    sizes="200px"
                    className="object-cover rounded-t"
                  />
                  <RatingBadge movie={movie} />
                </div>
                <div className="pt-6 px-2 py-2">
                  <p className="font-bold group-hover:text-blue-500">
                    {movie.title}
                  </p>
                  <p className="text-xs">{formatDate(movie.release_date)}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
