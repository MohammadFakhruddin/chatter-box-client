import { useState, useEffect } from "react";
import Banner from "../Component/Banner";
import AllPosts from "../Component/AllPosts";
import TagSection from "../Component/TagSection";
import axios from "axios";
import Announcement from "../Component/Announcement";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [announcements, setAnnouncements] = useState([]);


  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts", {
        params: {
          page,
          search,
          sort: sortBy === "popularity" ? "popularity" : undefined,
        },
      });
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search, sortBy]);


  const fetchAnnouncements = async () => {
  try {
    const res = await axios.get("http://localhost:3000/announcements");
    setAnnouncements(res.data);
  } catch (err) {
    console.error("Error loading announcements", err);
  }
};

useEffect(() => {
  fetchAnnouncements();
}, []);

  const handleSearch = (text) => {
    setSearch(text);
    setPage(1);
  };

  const handleToggleSort = () => {
    setSortBy((prev) => (prev === "popularity" ? "newest" : "popularity"));
    setPage(1);
  };

  const handleSelectTag = (tag) => {
    setSearch(tag);
    setPage(1);
  };

  return (
    <>
<Banner onSearch={handleSearch} onToggleSort={handleToggleSort} sortBy={sortBy} />
<TagSection onSelectTag={handleSelectTag} />
<Announcement announcements={announcements} />
<AllPosts posts={posts} page={page} setPage={setPage} totalPages={totalPages} />

    </>
  );
};

export default Home;

