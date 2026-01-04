interface Props {
  genreIds: number[];
}

export const genreColorsById: Record<number, string> = {
  28: "#f87171", // Action
  12: "#f97316", // Abenteuer
  16: "#60a5fa", // Animation
  35: "#facc15", // Komödie
  80: "#9333ea", // Krimi
  99: "#10b981", // Dokumentarfilm
  18: "#3b82f6", // Drama
  10751: "#fbbf24", // Familie
  14: "#8b5cf6", // Fantasy
  36: "#f87171", // Historie
  27: "#ef4444", // Horror
  10402: "#f472b6", // Musik
  9648: "#6b7280", // Mystery
  10749: "#ec4899", // Liebesfilm
  878: "#22d3ee", // Science Fiction
  10770: "#a3a3a3", // TV-Film
  53: "#f97316", // Thriller
  10752: "#ef4444", // Kriegsfilm
  37: "#f59e0b", // Western
};

const DynamicBackdrop = ({ genreIds }: Props) => {
  // uzmi prvu boju iz žanrova
  const primaryColor =
    genreIds.length > 0 ? genreColorsById[genreIds[0]] : "#1e293b";

  // gradient između primarne boje i bijele
  const bg = `linear-gradient(180deg, ${primaryColor}, #ffffff)`;

  return (
    <div className="absolute inset-0 -z-20" style={{ background: bg }}>
      {/* blur overlay */}
      <div className="absolute inset-0 -z-10 backdrop-blur-sm bg-black/20" />
    </div>
  );
};

export default DynamicBackdrop;
