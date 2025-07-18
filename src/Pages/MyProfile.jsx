import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/posts/user/${user.email}`)
        .then((res) => {
          const sorted = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUserPosts(sorted.slice(0, 3));
          setTotalPosts(res.data.length); // ✅ total post count
        })
        .catch((err) => console.error("Failed to fetch posts:", err));
    }
  }, [user?.email]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* User Info */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.photoURL}
          className="w-20 h-20 rounded-full"
          alt="User"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>

          {/* Badges */}
          <div className="mt-2 flex gap-2">
            {user?.isGoldMember ? (
              <div className="badge badge-warning gap-1">🥇 Gold Member</div>
            ) : (
              <div className="badge badge-neutral gap-1">🥉 Bronze Member</div>
            )}
          </div>

          {/* ✅ Total Posts */}
          <p className="mt-2 text-sm text-gray-600">
            🧾 Total Posts: <strong>{totalPosts}</strong>
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🕒 Recent Posts</h3>
        {userPosts.length ? (
          <div className="grid gap-4">
            {userPosts.map((post, idx) => (
              <div
                key={idx}
                className="p-4 bg-base-100 border rounded-lg shadow-sm"
              >
                <h4 className="font-bold text-lg">{post.title}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  🗓️ {new Date(post.createdAt).toLocaleDateString()} | 💬{" "}
                  {post.commentCount || 0} Comments
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="badge badge-outline text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
