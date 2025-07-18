import { useState } from "react";

const Banner = ({ onSearch, onToggleSort, sortBy }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText.trim());
  };

  return (
    <section className="bg-gradient-to-r from-primary to-accent py-10 px-4 text-neutral font-sans">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Find Your Topics, Discover Discussions 💬
        </h1>
        <p className="text-lg text-base-100">
          Explore trending posts or search by tags like <span className="font-bold">"react", "javascript", "mongodb"</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            placeholder="Search posts by tag..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full md:w-96"
          />
          <button type="submit" className="btn btn-secondary text-white">
            Search
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={onToggleSort}
            className="btn btn-outline btn-info"
          >
            {sortBy === "popularity" ? "Sort by Newest" : "Sort by Popularity"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
