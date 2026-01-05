import MovieCardComponent from "@/components/Movies/MovieCardComponent";

const PopularOtherPages = ({ params }: { params: { page: string } }) => {
  const page = Number(params.page);
  return <MovieCardComponent page={page} link="popular" />;
};

export default PopularOtherPages;
