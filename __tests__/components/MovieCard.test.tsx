import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCardComponent from "@/components/Movies/MovieCardComponent";
import { MovieCardProps } from "@/types/types";

describe("MovieCardComponent", () => {
  const mockData: MovieCardProps = {
    page: 1,
    total_pages: 10,
    total_results: 200,
    results: [
      {
        adult: false,
        backdrop_path: null,
        genres: [],
        id: 1,
        original_language: "en",
        original_title: "Inception",
        title: "Inception",
        poster_path: "/inception.jpg",
        vote_average: 8.8,
        release_date: "2010-07-16",
      },
      {
        adult: false,
        backdrop_path: null,
        genres: [],
        id: 2,
        original_language: "en",
        original_title: "The Dark Knight",
        title: "The Dark Knight",
        poster_path: "/dark-knight.jpg",
        vote_average: 9.0,
        release_date: "2008-07-18",
      },
    ],
  };

  it("should render all movie cards", () => {
    render(<MovieCardComponent data={mockData} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
  });

  it("should have correct number of links", () => {
    render(<MovieCardComponent data={mockData} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("should link to correct movie detail pages", () => {
    render(<MovieCardComponent data={mockData} />);

    const links = screen.getAllByRole("link");
    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `/movies/${index + 1}`);
    });
  });
});
