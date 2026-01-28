import PaginationQuery from "@/components/PaginationQuery";
import { SearchProps, UserResponse } from "@/types/types";
import getUserSearch from "@/lib/api/getUserSearch";
import UserCardComponent from "@/components/UserCardComponent";
import SearchCategories from "@/components/SearchCategories";

const UserSearch = async ({ searchParams }: SearchProps) => {
  const pageNum = Number(searchParams.page) || 1;
  const query = searchParams.query?.trim() || "";
  const dataUser: UserResponse = await getUserSearch(query, pageNum);
  const totalPages = dataUser.total_pages;
  return (
    <section className="mt-6 flex flex-col md:flex-row gap-2 mx-4">
      <div className="w-full md:w-1/5">
        <SearchCategories
          searchParams={searchParams}
          query={query}
          type={"user"}
          pageNum={pageNum}
        />
      </div>
      <div className="w-full">
        <UserCardComponent data={dataUser} />
        <PaginationQuery
          pageNum={pageNum}
          totalPages={totalPages}
          path1="/user"
          query={query}
        />
      </div>
    </section>
  );
};

export default UserSearch;
