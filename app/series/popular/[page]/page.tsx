import SeriesCardComponent from "@/components/Series/SeriesCardComponent";

const PopularSeriesOtherPages = ({ params }: { params: { page: number } }) => {
  const page = Number(params.page);
  return <SeriesCardComponent page={page} link="popular" />;
};

export default PopularSeriesOtherPages;
