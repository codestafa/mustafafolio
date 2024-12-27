function Navbar() {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-md font-bold text-indigo-600 lg:text-2xl">
          <a href="#about" className="hover:text-indigo-800 transition">Mustafa Ali</a>
        </h2>
        <ul className="flex space-x-8 text-sm font-medium text-gray-700 lg:text-lg">
          <li>
            <a href="#experience" className="hover:text-indigo-600 transition">Experience</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-indigo-600 transition">Projects</a>
          </li>
          <li>
            <a href="#education" className="hover:text-indigo-600 transition">Education</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
