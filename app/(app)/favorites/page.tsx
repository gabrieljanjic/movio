import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import FavoritesWatchlistSoloComponent from "@/components/FavoritesWatchlistSoloComponent";
import { getAllFavorites } from "@/lib/queries/watchlist.queries";

const WatchList = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const myUser = token ? await getUserFromToken(token) : null;
  if (!myUser) {
    return (
      <GeneralCenterComponent text="You have to be logged in to see your watch list" />
    );
  }
  const allFavorites = await getAllFavorites(myUser._id);
  console.log(allFavorites);
  return (
    <section className="mt-10 space-y-6">
      {allFavorites.map((item: any) => {
        return <FavoritesWatchlistSoloComponent item={item} />;
      })}
    </section>
  );
};

export default WatchList;
