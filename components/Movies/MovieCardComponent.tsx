import getMovies from "@/lib/api/external/getMovies";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

type MovieCategory = "popular" | "now_playing" | "top_rated" | "upcoming";

export default async function MovieCardComponent({
  page,
  link,
}: {
  page: number;
  link: MovieCategory;
}) {
  const data = await getMovies(link, page);
  const paginationLink = link.split("_").join("-");
  const totalPages = data.total_pages;

  return (
    <section>
      <div className="grid gap-y-6 gap-x-2 mb-8 justify-center [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        {data.results.map((movie: any) => (
          <div className="w-44 rounded custom-box-shadow relative cursor-pointer">
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="relative w-44 h-72">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="200px"
                  className="object-cover rounded-t"
                  priority
                />
                <RatingBadge movie={movie} />
              </div>
              <div className="pt-6 px-2 py-2">
                <p className="font-bold">{movie.title}</p>
                <p className="text-xs">{formatDate(movie.release_date)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center items-center mt-6 mb-8">
        {page > 1 && (
          <Link
            href={
              page === 2
                ? `/movies/${paginationLink}`
                : `/movies/${paginationLink}/${page - 1}`
            }
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Prev
          </Link>
        )}
        <span className="px-3 py-1">
          Page {page} / {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/movies/${paginationLink}/${page + 1}`}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </Link>
        )}
      </div>
    </section>
  );
}
