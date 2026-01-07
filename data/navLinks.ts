type NavLinksArrayType = {
  id: number;
  name: string;
  href: string;
};

type NavLinksType = {
  id: number;
  name: string;
  list?: NavLinksArrayType[];
  href?: string;
};

const navLinks: NavLinksType[] = [
  { id: 1, name: "Feed", href: "/feed" },
  {
    id: 2,
    name: "Movies",
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
    list: [
      { id: 1, name: "Popular", href: "/series/popular" },
      { id: 2, name: "Best Rated", href: "/series/top-rated" },
    ],
  },
  {
    id: 4,
    name: "Person",
    list: [{ id: 1, name: "Popular", href: "/person" }],
  },
  {
    id: 5,
    name: "Watch list",
    href: "/watch-list",
  },
  { id: 6, name: "Chat", href: "/chat" },
];

export default navLinks;
