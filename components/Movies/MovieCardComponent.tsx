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
              className="w-44 rounded bg-white custom-box-shadow relative cursor-pointer transform transition hover:scale-102 custom-hover-box-shadow"
            >
              <Link href={`/movies/${movie.id}`}>
                <div className="relative w-44 h-72">
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
                  <p className="font-bold">{movie.title}</p>
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
