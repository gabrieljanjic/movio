import Link from "next/link";

const PaginationQuery = ({
  pageNum,
  totalPages,
  path1,
  path2,
  query,
}: {
  pageNum: number;
  totalPages: number;
  path1: string;
  path2?: string;
  query: string;
}) => {
  return (
    <div className="flex gap-4 justify-center items-center mt-6 pb-4">
      {pageNum > 1 && (
        <Link
          href={`${path1}?page=${pageNum - 1}&query=${query}`}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </Link>
      )}
      <span className="px-3 py-1 whitespace-nowrap">
        Page {pageNum} / {totalPages}
      </span>
      {pageNum < totalPages && (
        <Link
          href={`${path1}?page=${pageNum + 1}&query=${query}`}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default PaginationQuery;
