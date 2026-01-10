import AllActorsComponent from "@/components/Actors/AllActorsComponent";
import Pagination from "@/components/Pagination";
import SearchFormComponent from "@/components/SearchFormComponent";
import getPopularPeople from "@/lib/api/external/person/getPopularPeople";

const PopularPeopleFirstPage = async () => {
  const pageNum = 1;
  const data = await getPopularPeople(pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="mt-6 ">
      <SearchFormComponent type="person/famous-person" />
      <AllActorsComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/person"
        path2="/person/page"
      />
    </section>
  );
};

export default PopularPeopleFirstPage;
