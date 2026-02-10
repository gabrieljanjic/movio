import Pagination from "@/components/Pagination";
import { render, screen } from "@testing-library/react";

describe("Pagination", () => {
  it("should return 5 numbers, prev and next buttons", () => {
    render(<Pagination pageNum={3} totalPages={20} path1="/test" />);
    const pageNums = [1, 2, 3, 4, 5];
    pageNums.forEach((pageNum) => {
      const link = screen.getByText(pageNum).closest("a");
      expect(link).toBeInTheDocument();
      const expectedLink = pageNum === 1 ? "/test" : `/test/${pageNum}`;
      expect(link).toHaveAttribute("href", expectedLink);
    });
  });
  it("should return 3 numbers and next button", () => {
    render(<Pagination pageNum={1} totalPages={20} path1="/test" />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.queryByText("Prev")).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
  it("should return 3 numbers and prev button", () => {
    render(<Pagination pageNum={20} totalPages={20} path1="/test" />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
