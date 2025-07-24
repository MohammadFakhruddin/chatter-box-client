import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ posts: 0, comments: 0, users: 0 });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
const fetchStats = async () => {
  try {
    const [postsRes, commentsRes, usersRes, tagsRes] = await Promise.all([
      axios.get("https://chatter-box-server-three.vercel.app/posts/count"),
      axios.get("https://chatter-box-server-three.vercel.app/comments/count"),
      axios.get("https://chatter-box-server-three.vercel.app/users/count"),
      axios.get("https://chatter-box-server-three.vercel.app/tags"),
    ]);

    setStats({
      posts: postsRes.data.count || 0,
      comments: commentsRes.data.count || 0,
      users: usersRes.data.count || 0,
    });

    const rawTags = tagsRes.data;
    setTags(Array.isArray(rawTags) ? rawTags : []);
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
};




    fetchStats();
  }, []);

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tag.trim()) return;

    try {
      await axios.post("https://chatter-box-server-three.vercel.app/tags", { tag: tag.trim() });
      setTag("");
      const res = await axios.get("https://chatter-box-server-three.vercel.app/tags");
      const fetchedTags = res.data;
      setTags(Array.isArray(fetchedTags) ? fetchedTags : []);
    } catch (err) {
      console.error(err);
      alert("Tag already exists or failed to add.");
    }
  };

  const data = [
    { name: "Posts", value: stats.posts },
    { name: "Comments", value: stats.comments },
    { name: "Users", value: stats.users },
  ];

  return (
<section className="max-w-6xl mx-auto p-4 md:p-6">
  <h2 className="text-2xl font-bold mb-6">👑 Admin Profile</h2>

  {/* Responsive grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    {/* Profile Card */}
    <div className="bg-white text-black rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center">
      <img src={user?.photoURL} alt="Admin" className="w-20 h-20 rounded-full object-cover" />
      <div>
        <h3 className="text-xl font-bold">{user?.displayName || "Admin"}</h3>
        <p className="text-gray-600">{user?.email}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <span className="badge badge-primary">Posts: {stats.posts}</span>
          <span className="badge badge-secondary">Comments: {stats.comments}</span>
          <span className="badge badge-accent">Users: {stats.users}</span>
        </div>
      </div>
    </div>

    {/* Pie Chart */}
    <div className="bg-white rounded-lg shadow p-6 text-black">
      <h3 className="text-lg font-semibold mb-4">📊 Site Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Add Tag Section */}
  <div className="bg-white rounded-lg shadow p-6 text-black">
    <h3 className="text-lg font-semibold mb-4">🏷️ Add New Tag</h3>
    <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        className="input input-bordered text-black w-full"
        placeholder="Enter tag (e.g., react)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button className="btn btn-primary w-full sm:w-auto" type="submit">
        Add
      </button>
    </form>

    {tags.length > 0 && (
      <div className="mt-4">
        <h4 className="font-medium mb-2">All Tags:</h4>
        <div className="flex gap-2 flex-wrap">
          {tags.map((t, idx) => (
            <span key={idx} className="badge badge-outline">
              #{t.tag}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default AdminProfile;
