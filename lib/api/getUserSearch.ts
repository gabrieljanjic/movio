import { connectDB } from "../db";
import { User } from "../models/User";

const getPersonSearch = async (query: string, page: number) => {
  const limit = 20;
  const skip = (page - 1) * limit;
  await connectDB();
  const total = await User.countDocuments({
    $or: [
      { userName: { $regex: query, $options: "i" } },
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
    ],
  });
  const totalPages = Math.ceil(total / limit);
  const users = await User.find({
    $or: [
      { userName: { $regex: query, $options: "i" } },
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
    ],
  })
    .skip(skip)
    .limit(limit);
  return {
    page,
    results: users,
    total_pages: totalPages,
    total_results: total,
  };
};

export default getPersonSearch;
