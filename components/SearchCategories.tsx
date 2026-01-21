import Link from "next/link";
import getMoviesSearch from "@/lib/api/external/movies/getMoviesSearch";
import getSeriesSearch from "@/lib/api/external/movies/getSeriesSearch";
import getPersonSearch from "@/lib/api/external/person/getPersonSearch";

type SearchCategoriesProps = {
  searchParams: any;
  query: any;
  type: string;
  pageNum: number;
};

const SearchCategories = async ({
  searchParams,
  query,
  type,
  pageNum,
}: SearchCategoriesProps) => {
  const dataMovie = await getMoviesSearch(query, pageNum, "movie");
  const totalResultsMovie = dataMovie.total_results;
  const dataSeries = await getSeriesSearch(query, pageNum, "tv");
  const totalResultsSeries = dataSeries.total_results;
  const dataPeople = await getPersonSearch(query, pageNum, "person");
  const totalResultsPeople = dataPeople.total_results;
  return (
    <div className="w-1/5">
      <div className="bg-blue-900 rounded-tl rounded-tr p-3">
        <h3 className="text-xl font-semibold text-white">Search Results</h3>
      </div>
      <ul className=" h-fit bg-white rounded-bl rounder-br">
        <li
          className={
            type === "movie"
              ? "bg-slate-300 px-4 py-2 rounded-tl rounded-tr"
              : "px-4 py-2"
          }
        >
          <Link
            href={{
              pathname: "/movies",
              query: { page: 1, ...searchParams },
            }}
            className={type === "movie" ? "font-semibold " : ""}
          >
            <div className="flex justify-between items-center">
              <p>Movies</p>
              <div className="px-2 py-1 bg-slate-100 w-fit flex rounded-xl">
                <span className="text-[12px]">{totalResultsMovie}</span>
              </div>
            </div>
          </Link>
        </li>
        <li className={type === "tv" ? "bg-slate-300 px-4 py-2" : "px-4 py-2"}>
          <Link
            href={`/series?page=1&query=${query}`}
            className={type === "tv" ? "font-semibold  " : ""}
          >
            <div className="flex justify-between items-center">
              <p>Series</p>
              <div className="px-2 py-1 bg-slate-100 w-fit flex rounded-xl">
                <span className="text-[12px]">{totalResultsSeries}</span>
              </div>
            </div>
          </Link>
        </li>
        <li
          className={
            type === "person"
              ? "bg-slate-300 px-4 py-2 rounded-bl rounded-br"
              : "px-4 py-2"
          }
        >
          <Link
            href={`/person?page=1&query=${query}`}
            className={type === "person" ? "font-semibold  " : ""}
          >
            <div className="flex justify-between items-center">
              <p>People</p>
              <div className="px-2 py-1 bg-slate-100 w-fit flex rounded-xl">
                <span className="text-[12px]">{totalResultsPeople}</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SearchCategories;
