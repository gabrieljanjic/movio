import ExactPersonBioComponent from "@/components/Actors/ExactPersonBioComponent";
import ExactPersonKnownForComponent from "@/components/Actors/ExactPersonKnownForComponent";
import getExactPersonBio from "@/lib/api/external/person/getExactPersonBio";
import getExactPersonKnowFor from "@/lib/api/external/person/getExactPersonKnowFor";

const ExactPerson = async ({ params }: { params: { id: string } }) => {
  const data = await getExactPersonBio(params.id);
  const dataKnownFor = await getExactPersonKnowFor(params.id);
  console.log(dataKnownFor);
  return (
    <section className="mt-6 p-6 bg-white custom-card-box-shadow rounded-lg">
      <ExactPersonBioComponent data={data} />
      <hr className="border-1 mt-8  border-gray-300"></hr>
      <ExactPersonKnownForComponent data={dataKnownFor} id={params.id} />
    </section>
  );
};

export default ExactPerson;
