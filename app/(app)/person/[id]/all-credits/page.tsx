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
    <section className="bg-white p-6 rounded-lg mt-6 custom-card-box-shadow">
      <ExactPersonBioComponent data={dataBio} />
      <hr className="border-1 my-8  border-gray-300"></hr>
      <ExactPersonAllCreditsComponent data={data} />
    </section>
  );
};

export default ExactPersonAllCredits;
