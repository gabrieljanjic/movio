import { CiSearch } from "react-icons/ci";

const SearchFormComponent = ({
  query,
  type,
}: {
  query?: string;
  type?: string;
}) => {
  return (
    <div className="w-48 md:w-full">
      <form className="flex" action={`/${type}`}>
        <input
          type="text"
          name="query"
          defaultValue={query || ""}
          className="flex-1 px-4 py-1 w-40 border rounded-bl-lg rounded-tl-lg focus:outline-none text-gray-800"
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
