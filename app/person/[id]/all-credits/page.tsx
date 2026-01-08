import ExactPersonAllCreditsComponent from "@/components/Actors/ExactPersonAllCreditsComponent";
import getExactPersonKnowFor from "@/lib/api/external/person/getExactPersonKnowFor";

const ExactPersonAllCredits = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getExactPersonKnowFor(params.id);
  return (
    <section>
      <ExactPersonAllCreditsComponent data={data} />
    </section>
  );
};

export default ExactPersonAllCredits;
