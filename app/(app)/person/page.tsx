import PaginationQuery from "@/components/PaginationQuery";
import { PeopleResponse, SearchProps } from "@/types/types";
import getPersonSearch from "@/lib/api/external/person/getPersonSearch";
import ActorCardComponent from "@/components/Actors/ActorCardComponent";
import SearchCategories from "@/components/SearchCategories";

const FamousPersonSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const dataPeople: PeopleResponse = await getPersonSearch(
    query,
    pageNum,
    "person",
  );
  const totalPages = dataPeople.total_pages;
  return (
    <section className="mt-6 flex flex-col md:flex-row gap-2 mx-4">
      <div className="w-full md:w-1/5">
        <SearchCategories
          searchParams={searchParams}
          query={query}
          type={"person"}
          pageNum={pageNum}
        />
      </div>
      <div className="w-full">
        <ActorCardComponent data={dataPeople} />
        <PaginationQuery
          pageNum={pageNum}
          totalPages={totalPages}
          path1="/person"
          query={query}
        />
      </div>
    </section>
  );
};

export default FamousPersonSearch;
