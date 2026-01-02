import Input from "../components/Input";
import SearchResults from "../components/SearchResults";
import Player from '../components/Player'

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen text-white pb-28 w-full overflow-hidden ">
      {/* Top Search */}
      <Input />

      {/* Search Results */}
      <SearchResults />

      {/* Fixed Player */}
      <Player />
    </div>
  );
};

export default HomePage;
