"use server";

import { cookies } from "next/headers";
import { getUserFromToken } from "../auth";
import { Content } from "../models/Content";
import { connectDB } from "../db";
import { Watchlist } from "../models/Watchlist";
import { revalidatePath } from "next/cache";

export const checkIsInWatchlist = async (id: string) => {
  await connectDB();
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? await getUserFromToken(token) : null;

  if (!user) {
    return { success: false };
  }

  const content = await Content.findOne({ tmdbId: id });
  if (!content) {
    return { success: false };
  }
  const isInWatchlist = await Watchlist.findOne({
    userId: user._id,
    contentId: content._id,
  });

  if (isInWatchlist) {
    return { success: true };
  } else {
    return { success: false };
  }
};

export const addToWatchlist = async ({
  wholeContent,
}: {
  wholeContent: any;
}) => {
  try {
    await connectDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const user = token ? await getUserFromToken(token) : null;
    if (!user) {
      throw new Error("You have to be logged in");
    }
    let content = await Content.findOne({ tmdbId: wholeContent.id });

    let isMovie = false;
    if (!content) {
      if (wholeContent.title) {
        isMovie = true;
      }
      content = await Content.create({
        tmdbId: wholeContent.id,
        contentType: isMovie ? "movie" : "tv",
        overview: wholeContent.overview,
        posterPath: wholeContent.poster_path,
        title: isMovie ? wholeContent.title : wholeContent.name,
        voteAverage: wholeContent.vote_average,
        releaseDate: isMovie
          ? wholeContent.release_date
          : wholeContent.first_air_date,
      });
    }

    const new2 = await Watchlist.create({
      userId: user._id,
      contentId: content._id,
    });

    if (isMovie) {
      revalidatePath(`/movies/${wholeContent.id}`);
    } else {
      revalidatePath(`/series/${wholeContent.id}`);
    }
    return { success: true, message: "Added to watch list" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};

export const removeFromWatchlist = async (tmdbId: number) => {
  try {
    await connectDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const user = token ? await getUserFromToken(token) : null;
    if (!user) {
      throw new Error("You have to be logged in");
    }

    const content = await Content.findOne({ tmdbId });

    if (!content) {
      return { success: false, message: "Something went wrong" };
    }

    const removed = await Watchlist.findOneAndDelete({
      userId: user._id,
      contentId: content._id,
    });
    if (removed) {
      if (content.title) {
        revalidatePath(`/movies/${tmdbId}`);
      } else {
        revalidatePath(`/series/${tmdbId}`);
      }
      return { success: true, message: "Removed from favorites" };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } catch (err: any) {
    return { success: false, message: err.message };
  }
};
