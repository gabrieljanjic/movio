import Link from "next/link";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const Pagination = ({
  pageNum,
  totalPages,
  path1,
}: {
  pageNum: number;
  totalPages: number;
  path1: string;
}) => {
  const pageNumbers: number[] = [];

  for (let i = pageNum - 2; i <= pageNum + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="flex gap-2 md:gap-4 justify-center items-center mt-6 pb-4">
      {pageNum > 1 && (
        <Link
          href={pageNum === 2 ? `${path1}` : `${path1}/${pageNum - 1}`}
          className="px-2  md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <div className="flex gap-1 items-center text-sm md:text-base">
            <IoArrowBack />
            Prev
          </div>
        </Link>
      )}
      {pageNumbers.map((num) => (
        <Link
          key={num}
          href={num === 1 ? `${path1}` : `${path1}/${num}`}
          className={`px-2  md:px-3 py-1 rounded transition text-sm md:text-base ${
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
          href={`${path1}/${pageNum + 1}`}
          className="px-2  md:px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <div className="flex gap-1 items-center text-sm md:text-base">
            Next
            <IoArrowForward />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
