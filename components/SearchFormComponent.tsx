import getAllGenres from "@/lib/api/external/getAllGenres";
import { CiSearch } from "react-icons/ci";

const SearchFormComponent = ({
  query,
  type,
}: {
  query?: string;
  type?: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <form
        className="flex flex-1 w-full md:w-auto"
        action={`/${type}`}
        method="GET"
      >
        <input
          type="text"
          name="query"
          defaultValue={query || ""}
          className="flex-1 px-4 py-1 border rounded-bl-lg rounded-tl-lg focus:outline-none text-black"
          placeholder="Search"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white rounded-br-lg rounded-tr-lg"
        >
          <CiSearch className="text-black" />
        </button>
      </form>
    </div>
  );
};

export default SearchFormComponent;
