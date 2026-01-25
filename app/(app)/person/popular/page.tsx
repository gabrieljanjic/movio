import ActorCardComponent from "@/components/Actors/ActorCardComponent";
import Pagination from "@/components/Pagination";
import SubNavbar from "@/components/SubNavbar";
import navLinks from "@/data/navLinks";
import getPopularPeople from "@/lib/api/external/person/getPopularPeople";
import { PeopleResponse } from "@/types/types";

const PopularPeopleFirstPage = async () => {
  const nowLink = "/person/popular";
  const name = "Person";
  const subNavBarItem = navLinks.find((item) => item.name === name);
  const pageNum = 1;
  const data: PeopleResponse = await getPopularPeople(pageNum);
  const totalPages = data.total_pages;
  return (
    <section className="custom-card-box-shadow">
      <SubNavbar subNavBarItem={subNavBarItem} nowLink={nowLink} />
      <div className="pt-6 bg-white px-2 sm:px-4 md:px-6">
        <ActorCardComponent data={data} />
        <Pagination pageNum={pageNum} totalPages={totalPages} path1={nowLink} />
      </div>
    </section>
  );
};

export default PopularPeopleFirstPage;
