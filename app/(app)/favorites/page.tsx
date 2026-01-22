import { cookies } from "next/headers";
import { getUserFromToken } from "@/lib/auth";
import GeneralCenterComponent from "@/components/GeneralCenterComponent";
import FavoritesWatchlistSoloComponent from "@/components/FavoritesWatchlistSoloComponent";
import { getAllFavorites } from "@/lib/queries/favorite.queries";

const WatchList = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const myUser = token ? await getUserFromToken(token) : null;
  if (!myUser) {
    return (
      <GeneralCenterComponent
        text="You have to be logged in to see your favorites"
        login={true}
      />
    );
  }
  const allFavorites = await getAllFavorites(myUser._id);

  if (allFavorites.length < 1) {
    return (
      <GeneralCenterComponent
        text="You do not have anything in your favorites"
        login={false}
      />
    );
  }
  return (
    <section className="p-2 bg-white custom-box-shadow-sm rounded-lg mt-4">
      <FavoritesWatchlistSoloComponent allData={allFavorites} />
    </section>
  );
};

export default WatchList;
