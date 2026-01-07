import Link from "next/link";

const Pagination = ({
  pageNum,
  totalPages,
  path1,
  path2,
}: {
  pageNum: number;
  totalPages: number;
  path1: string;
  path2?: string;
}) => {
  return (
    <div className="flex gap-4 justify-center items-center mt-6 mb-8 ">
      {pageNum > 1 && (
        <Link
          href={pageNum === 2 ? `${path1}` : `${path2}/${pageNum - 1}`}
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
          href={`${path2}/${pageNum + 1}`}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
