import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router"; 
import { toast } from "react-hot-toast";

const tagOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "node", label: "Node.js" },
  { value: "mongodb", label: "MongoDB" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
];

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://chatter-box-server-three.vercel.app/posts/count/${user.email}`)
        .then((res) => {
          setPostCount(res.data.count);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      author: {
        name: user?.displayName || "",
        email: user?.email || "",
        photo: user?.photoURL || "",
      },
      title,
      description,
      tags: selectedTags.map((tag) => tag.value),
      createdAt: new Date().toISOString(),
      image,
      upVote: 0,
      downVote: 0,
      commentCount: 0,
    };

    try {
      await axios.post("https://chatter-box-server-three.vercel.app/posts", postData);
      toast.success("✅ Post added successfully!");
      navigate("/dashboard/myposts");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add post.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (postCount >= 5) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-300 rounded">
        <h2 className="text-xl font-bold text-red-700 mb-2">🚫 Post Limit Reached</h2>
        <p className="mb-4">
          You’ve reached the limit of 5 posts as a normal user. Become a member to post more!
        </p>
        <Link to="/membership">
          <button className="btn btn-primary">Become a Member</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📢 Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Author Name</label>
            <input type="text" className="input input-bordered w-full" value={user.displayName} disabled />
          </div>
          <div>
            <label className="label">Author Email</label>
            <input type="email" className="input input-bordered w-full" value={user.email} disabled />
          </div>
        </div>
        <div>
          <label className="label">Author Image</label>
          <input type="text" className="input input-bordered w-full" value={user.photoURL} disabled />
        </div>

        {/* Post Title */}
        <div>
          <label className="label">Post Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Post Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="label">Tags</label>
          <Select
            options={tagOptions}
            isMulti
            className="react-select-container"
            classNamePrefix="react-select"
            value={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Post Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full mt-4">Submit Post</button>
      </form>
    </div>
  );
};

export default AddPost;
