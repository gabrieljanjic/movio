import AllActorsComponent from "@/components/Actors/AllActorsComponent";
import Pagination from "@/components/Pagination";
import getPopularPeople from "@/lib/api/external/person/getPopularPeople";

const PopularPeopleFirstPage = async () => {
  const pageNum = 1;
  const data = await getPopularPeople(pageNum);
  const totalPages = data.total_pages;
  return (
    <>
      <AllActorsComponent data={data} />
      <Pagination
        pageNum={pageNum}
        totalPages={totalPages}
        path1="/person"
        path2="/person/page"
      />
      ;
    </>
  );
};

export default PopularPeopleFirstPage;
