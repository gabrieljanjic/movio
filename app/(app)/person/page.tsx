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
    <section className="mt-6 flex gap-2 px-4">
      <SearchCategories
        searchParams={searchParams}
        query={query}
        type={"person"}
        pageNum={pageNum}
      />
      <div className="px-4 w-full">
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
