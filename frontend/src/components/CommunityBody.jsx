import CommunityBox from "./CommunityBox.jsx";
import FilterBar from "./FilterBar.jsx";
import SearchBar from "./SearchBar.jsx";

function CommunityBody() {
  return (
    <section className="p-6 grid gap-5">
      <SearchBar />
      <FilterBar />
      <CommunityBox />
    </section>
  );
}

export default CommunityBody;
