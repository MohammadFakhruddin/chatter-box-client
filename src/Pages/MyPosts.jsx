import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://chatter-box-server-three.vercel.app/posts/user/${user.email}`)
        .then((res) => setMyPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
      axios
        .delete(`https://chatter-box-server-three.vercel.app/posts/${id}`)
        .then(() => {
          setMyPosts((prev) => prev.filter((post) => post._id !== id));
          alert("Post deleted successfully.");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="p-5 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-2">📝 My Posts</h2>
      <p className="text-sm text-gray-600 mb-4">
        You have created <strong>{myPosts.length}</strong> {myPosts.length === 1 ? "post" : "posts"}.
      </p>

      {myPosts.length >= 5 && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-md text-sm text-yellow-800">
          You have reached the limit of 5 posts. To add more posts, please{" "}
          <Link to="/membership" className="underline text-blue-600">
            become a member
          </Link>
          .
        </div>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Votes</th>
            <th>Comments</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myPosts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                ⬆ {post.upVote || 0} | ⬇ {post.downVote || 0}
              </td>
              <td>
                <Link to={`/comments/${post._id}`}>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => alert("Comment feature in PostDetails")}
                  >
                    Comment
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPosts;

