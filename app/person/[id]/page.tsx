const ExactPerson = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default ExactPerson;
