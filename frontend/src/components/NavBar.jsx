function NavBar() {
  return (
    <nav className="flex gap-2 flex-wrap">
      <span className="px-4 py-2 rounded-full bg-primary text-primary-text-dark text-sm font-semibold">
        Recent
      </span>
      <span className="px-4 py-2 rounded-full bg-primary-light text-primary-text text-sm font-medium hover:bg-primary-lighter transition-colors">
        Contacts
      </span>
      <span className="px-4 py-2 rounded-full bg-primary-light text-primary-text text-sm font-medium hover:bg-primary-lighter transition-colors">
        Status
      </span>
    </nav>
  );
}

export default NavBar;
