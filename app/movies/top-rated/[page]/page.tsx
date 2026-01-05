import MovieCardComponent from "../../../../components/Movies/MovieCardComponent";

const TopRatedOtherPages = ({ params }: { params: { page: number } }) => {
  const page = Number(params.page);
  return <MovieCardComponent page={page} link="top_rated" />;
};

export default TopRatedOtherPages;
