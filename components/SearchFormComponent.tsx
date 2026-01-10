import getAllGenres from "@/lib/api/external/getAllGenres";

const SearchFormComponent = async ({
  query,
  type,
}: {
  query?: string;
  type?: string;
}) => {
  const data = await getAllGenres();

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 px-8 mb-6">
      <form
        className="flex flex-1 w-full md:w-auto"
        action={`/${type}`}
        method="GET"
      >
        <input
          type="text"
          name="query"
          defaultValue={query || ""}
          className="flex-1 px-4 py-2 rounded-l-md shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col w-full md:w-64">
        <select
          id="genre"
          name="genre"
          className="px-4 py-2 rounded shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          {data.genres.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFormComponent;
