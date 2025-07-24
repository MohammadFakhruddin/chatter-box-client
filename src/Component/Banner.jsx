import { useState, useEffect } from "react";

const Banner = ({ onSearch, onToggleSort, sortBy }) => {
  const [searchText, setSearchText] = useState("");
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    // Fetch recent popular searches on mount
    fetch("http://localhost:3000/popular-searches")
      .then((res) => res.json())
      .then((data) => setPopularSearches(data))
      .catch(() => setPopularSearches([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) onSearch(searchText.trim());
  };

  const handlePopularClick = (tag) => {
    onSearch(tag);
    setSearchText(tag);
  };

  return (
    <section
      className="relative bg-cover bg-center py-10 px-4 text-neutral font-sans"
      style={{
        backgroundImage: `url('https://i.ibb.co/zVsyppX7/mongodb.png')`,
        minHeight: "300px",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Find Your Topics, Discover Discussions 💬
        </h1>
        <p className="text-lg text-gray-200">
          Explore trending posts or search by tags like{" "}
          <span className="font-bold">"react", "javascript", "mongodb"</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center "
        >
          <input
            type="text"
            placeholder="Search posts by tag..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full md:w-96 text-white"
          />
          <button type="submit" className="btn btn-secondary text-white">
            Search
          </button>
        </form>

        {/* Popular searches */}
        <div className="mt-4 text-gray-300">
          <span>Popular Searches: </span>
          {popularSearches.length === 0 && <span>Loading...</span>}
          {popularSearches.map((tag, i) => (
            <button
              key={i}
              onClick={() => handlePopularClick(tag)}
              className="btn btn-sm btn-outline btn-info ml-2"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <button onClick={onToggleSort} className="btn btn-outline btn-info">
            {sortBy === "popularity" ? "Sort by Newest" : "Sort by Popularity"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
