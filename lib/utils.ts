import sharp from "sharp";

export type DominantColor = {
  r: number;
  g: number;
  b: number;
};

export const getDominantColor = async (
  imageUrl: string,
): Promise<DominantColor> => {
  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch image");
  }

  const buffer = Buffer.from(await res.arrayBuffer());

  const { dominant } = await sharp(buffer).stats();

  return dominant;
};

export const formatDate = (rawDate: string) => {
  if (!rawDate) return "-";
  const [year, month, day] = rawDate.split("-");
  return `${day}. ${month}. ${year}`;
};

export const getColorByPercentage = (percent: number) => {
  if (percent >= 90) return "border-rating-90";
  if (percent >= 80) return "border-rating-80";
  if (percent >= 70) return "border-rating-70";
  if (percent >= 60) return "border-rating-60";
  if (percent >= 50) return "border-rating-50";
  if (percent >= 40) return "border-rating-40";
  if (percent >= 30) return "border-rating-30";
  if (percent >= 20) return "border-rating-20";
  if (percent >= 10) return "border-rating-10";
  return "border-rating-0";
};

export const formRating = (rawRating: number) => {
  const rating = rawRating * 10;
  return rating.toFixed(0);
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}min`;
};

export const formatYear = (date: string) => {
  const year = date.split("-")[0];
  return year;
};

export const getTimeAgo = (date: any) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString();
};
