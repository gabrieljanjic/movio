import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import { getAllWatchlist } from "@/lib/queries/favorite.queries";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import FavoritesWatchlistSoloComponent from "@/components/FavoritesWatchlistSoloComponent";

const WatchList = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const myUser = token ? await getUserFromToken(token) : null;
  if (!myUser) {
    return (
      <GeneralCenterComponent text="You have to be logged in to see your watch list" />
    );
  }
  const allWatchlist = await getAllWatchlist(myUser._id);
  console.log(allWatchlist);
  return (
    <section className="mt-10 space-y-6">
      {allWatchlist.map((item: any) => {
        return <FavoritesWatchlistSoloComponent item={item} />;
      })}
    </section>
  );
};

export default WatchList;
