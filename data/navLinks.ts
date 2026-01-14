type NavLinksArrayType = {
  id: number;
  name: string;
  href: string;
};

type NavLinksType = {
  id: number;
  name: string;
  list?: NavLinksArrayType[];
  defaultPath: string;
};

const navLinks: NavLinksType[] = [
  { id: 1, name: "Feed", defaultPath: "/feed" },
  {
    id: 2,
    name: "Movies",
    defaultPath: "/movies/popular",
    list: [
      { id: 1, name: "Popular", href: "/movies/popular" },
      { id: 2, name: "Best Rated", href: "/movies/top-rated" },
      { id: 3, name: "Now playing", href: "/movies/now-playing" },
      { id: 4, name: "Upcoming", href: "/movies/upcoming" },
    ],
  },
  {
    id: 3,
    name: "Series",
    defaultPath: "/series/popular",
    list: [
      { id: 1, name: "Popular", href: "/series/popular" },
      { id: 2, name: "Best Rated", href: "/series/top-rated" },
    ],
  },
  {
    id: 4,
    name: "Person",
    defaultPath: "/person/popular",
    list: [{ id: 1, name: "Popular", href: "/person/popular" }],
  },
];

export default navLinks;
