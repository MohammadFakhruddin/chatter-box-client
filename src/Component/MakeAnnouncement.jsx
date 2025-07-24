import { useState } from "react";
import axios from "axios";

const MakeAnnouncement = () => {
  const [formData, setFormData] = useState({
    authorImage: "",
    authorName: "",
    title: "",
    description: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const announcementData = {
        ...formData,
        createdAt: new Date().toISOString(), // ✅ Add current date
      };

      await axios.post("https://chatter-box-server-three.vercel.app/announcements", announcementData);
      alert("✅ Announcement made successfully!");
      setFormData({ authorImage: "", authorName: "", title: "", description: "" });
    } catch (err) {
      console.error("❌ Failed to make announcement", err);
    }
  };

  return (
    <section className="max-w-xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">📢 Make Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="authorImage"
          value={formData.authorImage}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Author Image URL"
          required
        />
        <input
          type="text"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Author Name"
          required
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Announcement Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Announcement Description"
          required
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default MakeAnnouncement;
