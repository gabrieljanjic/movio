import PaginationQuery from "@/components/PaginationQuery";
import { SearchProps } from "@/types/types";
import getPersonSearch from "@/lib/api/external/person/getPersonSearch";
import AllActorsComponent from "@/components/Actors/AllActorsComponent";
import SearchCategories from "@/components/SearchCategories";

const FamousPersonSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const dataPeople = await getPersonSearch(query, pageNum, "person");
  const totalPages = dataPeople.total_pages;
  return (
    <section className="mt-6 flex gap-2">
      <SearchCategories
        searchParams={searchParams}
        query={query}
        type={"person"}
        pageNum={pageNum}
      />
      <div className="w-4/5">
        <AllActorsComponent data={dataPeople} />
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
