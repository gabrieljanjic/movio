import PaginationQuery from "@/components/PaginationQuery";
import { SearchProps } from "@/types/types";
import SearchFormComponent from "@/components/SearchFormComponent";
import getPersonSearch from "@/lib/api/external/person/getPersonSearch";
import AllActorsComponent from "@/components/Actors/AllActorsComponent";

const FamousPersonSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const data = await getPersonSearch(query, pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6">
      <SearchFormComponent type="person/famous-person" query={query} />
      <AllActorsComponent data={data} />
      <PaginationQuery
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/person/famous-person"
        path2="/person/famous-person"
        query={query}
      />
    </section>
  );
};

export default FamousPersonSearch;
