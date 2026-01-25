export type SearchProps = {
  searchParams: {
    query: string;
    page?: string;
  };
};
export type SearchQueryProp = {
  searchParams: {
    query?: string;
  };
};

export type Content = {
  _id: string;
  tmdbId: number;
  contentType: "movie" | "tv";
  title: string;
  overview?: string;
  posterPath?: string;
  voteAverage?: number;
  releaseDate?: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatar?: string;
  createdAt: string;
};

export type Post = {
  _id: string;
  tmdbRefId: Content;
  contentId: string;
  contentType?: string;
  postContent: string;
  rating?: number;
  createdBy: User;
  createdAt: string;
};

export type ExtendedPost = {
  _id: string;
  postContent: string;
  rating?: number;
  createdAt: string;
  createdBy: {
    _id: string;
    userName: string;
    firstName: string;
    avatar?: string;
  };
  iLikedIt: boolean;
  likesCount: number;
  commentsCount: number;
};

export type FeedResponse = {
  posts: Post[];
  pagination: {
    totalPages: number;
  };
};

export type AllPostsById = {
  posts: ExtendedPost[];
  pagination: {
    totalPages: number;
  };
};

export type SeasonDetailsResponse = {
  _id: string;
  air_date: string;
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes: Episode[];
  networks: Network[];
};

export type Episode = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: GuestStar[];
};

export type CrewMember = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type CastMember = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number | null;
};

export type AllCreditsExtended = {
  id: number;
  cast: ExtendedCastMember[];
  crew: ExtendedCrewMember[];
};

export type ExtendedCastMember = {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  origin_country?: string[];
  original_language?: string;
  original_name: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  first_air_date?: string;
  name: string;
  vote_average?: number;
  vote_count?: number;
  character: string;
  credit_id: string;
  episode_count?: number;
  first_credit_air_date?: string;
  media_type?: string;
  title?: string;
  release_date?: string;
};

export type ExtendedCrewMember = {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  release_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  credit_id: string;
  department: string;
  job: string;
  media_type?: string;
};

export type PersonDetail = {
  profile_path?: string | null;
  name: string;
  birthday?: string;
  place_of_birth?: string;
  biography?: string;
};

export type KnownForItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  popularity?: number;
};

export type GuestStar = {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type KnownFor = {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
};

export type Person = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: KnownFor[];
};

export type PeopleResponse = {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
};

export type AllCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: BelongsToCollection | null;
  budget?: number;
  genres: Genre[];
  homepage?: string | null;
  id: number;
  imdb_id?: string | null;
  origin_country?: string[];
  original_language: string;
  original_title: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string | null;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};

export type SeriesDetail = {
  adult: boolean;
  backdrop_path: string | null;
  created_by?: Creator[];
  episode_run_time?: number[];
  first_air_date: string;
  genres: Genre[];
  homepage?: string | null;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  name: string;
  next_episode_to_air?: Episode | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language: string;
  original_name: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: Season[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string | null;
  type?: string;
  vote_average: number;
  vote_count?: number;
};

export type SeriesCardProps = {
  page: number;
  results: SeriesDetail[];
  total_pages: number;
  total_results: number;
};
export type MovieCardProps = {
  page: number;
  results: MovieDetail[];
  total_pages: number;
  total_results: number;
};

export type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number | null;
  profile_path: string | null;
};

export type Season = {
  air_date?: string;
  episode_count: number;
  id: number;
  name: string;
  overview?: string;
  poster_path?: string | null;
  season_number: number;
  vote_average: number;
};

export type Comment = {
  _id: string;
  user: {
    _id: string;
    userName: string;
  };
  message: string;
  createdAt: string;
};

export type WholeContent = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  genres?: Genre[];
  vote_average?: number;
};

export type isTrue = {
  success: boolean;
};

export type Navbar = {
  id: number;
  name: string;
  defaultPath: string;
  list?: {
    id: number;
    name: string;
    href: string;
  }[];
};
