import MovieCardComponent from "@/components/Movies/MovieCardComponent";

const UpcomingOtherPages = ({ params }: { params: { page: number } }) => {
  const page = Number(params.page);
  return <MovieCardComponent page={page} link="upcoming" />;
};

export default UpcomingOtherPages;
