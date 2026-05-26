import ChatBox from "./ChatBox.jsx";
import FilterBar from "./FilterBar.jsx";
import SearchBar from "./SearchBar.jsx";

function ChatBody() {
  return (
    <section className="p-6 grid gap-5">
      <SearchBar />
      <FilterBar />
      <ChatBox />
    </section>
  );
}

export default ChatBody;
