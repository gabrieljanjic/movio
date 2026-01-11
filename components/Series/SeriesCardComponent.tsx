import getSeries from "@/lib/api/external/series/getSeries";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import RatingBadge from "@/components/RatingBadge";

export default function SeriesCardComponent({ data }: { data: any }) {
  return (
    <section>
      <div className="grid gap-y-6 gap-x-2 mb-8 justify-center [grid-template-columns:repeat(auto-fill,minmax(200px,200px))]">
        {data.results.map((series: any) => (
          <div
            key={series.id}
            className="w-48 rounded bg-white custom-box-shadow relative cursor-pointer transform transition hover:scale-102 custom-hover-box-shadow"
          >
            <Link href={`/series/${series.id}`} className="w-44">
              <div className="relative w-48 h-72">
                <Image
                  src={
                    series.poster_path
                      ? `${process.env.TMDB_POSTER_PATH}/w500${series.poster_path}`
                      : "/images/no-image-placeholder.png"
                  }
                  alt={series.title}
                  fill
                  sizes="200px"
                  className="object-cover rounded-t"
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
    </section>
  );
}
