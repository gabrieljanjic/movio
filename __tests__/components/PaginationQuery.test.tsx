import PaginationQuery from "@/components/PaginationQuery";
import { render, screen } from "@testing-library/react";

describe("PaginationQuery", () => {
  it("should return link with query", () => {
    const pageNum = 1;
    const totalPages = 20;
    const path = "/test";
    const query = "Avengers";
    render(
      <PaginationQuery
        pageNum={pageNum}
        totalPages={totalPages}
        path={path}
        query={query}
      />,
    );
    const pageNums = [1, 2, 3];
    pageNums.forEach((num) => {
      const link = screen.getByText(num).closest("a");
      expect(link).toHaveAttribute(
        "href",
        `${path}?page=${num}&query=${query}`,
      );
    });
    if (pageNum > 1) {
      expect(screen.getByText("Prev")).toBeInTheDocument();
    }
    if (pageNum < totalPages) {
      expect(screen.getByText("Next")).toBeInTheDocument();
    }
  });
});
