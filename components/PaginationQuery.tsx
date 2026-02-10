import Link from "next/link";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const PaginationQuery = ({
  pageNum,
  totalPages,
  path,
  query,
}: {
  pageNum: number;
  totalPages: number;
  path: string;
  query?: string;
}) => {
  const pageNumbers: number[] = [];
  for (let i = pageNum - 2; i <= pageNum + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="flex gap-4 justify-center items-center mt-6 pb-4">
      {pageNum > 1 && (
        <Link
          href={
            query
              ? `${path}?page=${pageNum - 1}&query=${query}`
              : `${path}?page=${pageNum - 1}`
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <div className="flex gap-1 items-center">
            <IoArrowBack />
            Prev
          </div>
        </Link>
      )}
      {pageNumbers.map((num) => (
        <Link
          key={num}
          href={
            query ? `${path}?page=${num}&query=${query}` : `${path}?page=${num}`
          }
          className={`px-3 py-1 rounded transition ${
            num === pageNum
              ? "bg-blue-900 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {num}
        </Link>
      ))}
      {pageNum < totalPages && (
        <Link
          href={
            query
              ? `${path}?page=${pageNum + 1}&query=${query}`
              : `${path}?page=${pageNum + 1}`
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <div className="flex gap-1 items-center">
            Next
            <IoArrowForward />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PaginationQuery;
