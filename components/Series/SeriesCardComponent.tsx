import getSeries from "@/lib/api/external/getSeries";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formRating, getColorByPercentage } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

type SeriesCategory = "popular" | "top_rated";

export default async function SeriesCardComponent({
  page,
  link,
}: {
  page: number;
  link: SeriesCategory;
}) {
  const data = await getSeries(link, page);
  const paginationLink = link.split("_").join("-");
  const totalPages = data.total_pages;

  return (
    <section>
      <div className="grid gap-y-6 gap-x-2 mb-8 justify-center [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        {data.results.map((series: any) => (
          <div
            key={series.id}
            className="w-44 rounded custom-box-shadow relative cursor-pointer"
          >
            <Link
              key={series.id}
              href={`/series/${series.id}`}
              className="w-44"
            >
              <div className="relative w-44 h-72">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.title}
                  fill
                  sizes="200px"
                  className="object-cover rounded-t"
                  priority
                />
                <RatingBadge movie={series} />
              </div>
              <div className="pt-6 px-2 py-2">
                <p className="font-bold">{series.name}</p>
                <p className="text-xs">{formatDate(series.first_air_date)}</p>
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
                ? `/series/${paginationLink}`
                : `/series/${paginationLink}/${page - 1}`
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
            href={`/series/${paginationLink}/${page + 1}`}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </Link>
        )}
      </div>
    </section>
  );
}
