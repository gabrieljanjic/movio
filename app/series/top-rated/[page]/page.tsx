import SeriesCardComponent from "@/components/Series/SeriesCardComponent";

const TopRatedSeriesOtherPages = ({ params }: { params: { page: number } }) => {
  const page = Number(params.page);
  return <SeriesCardComponent page={page} link="top_rated" />;
};

export default TopRatedSeriesOtherPages;
