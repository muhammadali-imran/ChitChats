import TopBar from "./TopBar.jsx";
import NavBar from "./NavBar.jsx";

function Header({ title, description }) {
  return (
    <header className="bg-primary-light border-b border-primary-lighter">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <TopBar />
        <div className="mt-4">
          <h1
            className="text-3xl 
          md:text-4xl font-semibold 
          text-primary-text-dark"
          >
            {title}
          </h1>
          <p
            className="mt-2 text-sm 
          text-primary-text max-w-2xl"
          >
            {description}
          </p>
        </div>
        <div className="mt-6">
          <NavBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
