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
      <GeneralCenterComponent
        text="You have to be logged in to see your watch list"
        login={true}
      />
    );
  }
  const allWatchlist = await getAllWatchlist(myUser._id);
  if (allWatchlist.length < 1) {
    return (
      <GeneralCenterComponent
        text="You do not have anything in your watch list"
        login={true}
      />
    );
  }
  return (
    <section className="p-2 bg-white custom-box-shadow-sm rounded-lg mt-4">
      {allWatchlist.map((item: any) => {
        return <FavoritesWatchlistSoloComponent item={item} />;
      })}
    </section>
  );
};

export default WatchList;
