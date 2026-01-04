import MovieCardComponent from "@/components/MovieCardComponent";

const NowPlaying = ({ params }: { params: { page: number } }) => {
  const page = Number(params.page);
  return <MovieCardComponent page={page} link="now_playing" />;
};

export default NowPlaying;
