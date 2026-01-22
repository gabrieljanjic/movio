import ExactPersonAllCreditsComponent from "@/components/Actors/ExactPersonAllCreditsComponent";
import ExactPersonBioComponent from "@/components/Actors/ExactPersonBioComponent";
import getExactPersonBio from "@/lib/api/external/person/getExactPersonBio";
import getExactPersonKnowFor from "@/lib/api/external/person/getExactPersonKnowFor";

const ExactPersonAllCredits = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getExactPersonKnowFor(params.id);
  const dataBio = await getExactPersonBio(params.id);
  return (
    <section className="bg-white md:rounded-lg custom-card-box-shadow md:mt-6 md:px-6">
      <ExactPersonBioComponent data={dataBio} />
      <hr className="border-1 my-8  border-gray-300"></hr>
      <ExactPersonAllCreditsComponent data={data} />
    </section>
  );
};

export default ExactPersonAllCredits;
