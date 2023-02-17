import { ReactComponent as SearchIcon } from '../assets/svg/search.svg'

export const Searchbar = ({
  handleSearchBarOnChange,
  handleSearchBarOnSubmit
}) => (
  <form className="relative w-full md:w-1/2 lg:w-1/3" onSubmit={handleSearchBarOnSubmit}>
    <input
      type="text"
      name="search"
      id="search"
      className="w-full pl-2 pr-6 py-1 border border-secondary-black-darkWithOpacity rounded"
      placeholder="Search something..."
      onChange={handleSearchBarOnChange}
    />
    <button
      type="submit"
      className="absolute inset-y-0 right-0 flex justify-center items-center"
    >
      <SearchIcon className="scale-50" />
    </button>
  </form>
)
