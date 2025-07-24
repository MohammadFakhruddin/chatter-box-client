import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";
import { FacebookShareButton, FacebookIcon } from "react-share";
import dayjs from "dayjs";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [reload, setReload] = useState(false);
  const [comments, setComments] = useState([]);

  const shareUrl = `${window.location.origin}/post/${id}`;

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => setPost(res.data));
  }, [id, reload]);


  useEffect(() => {
    axios.get(`http://localhost:3000/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id, reload]);

  const handleUpvote = () => {
    if (!user) return alert("Login to vote!");
    axios
      .patch(`http://localhost:3000/posts/${id}/upvote?email=${user.email}`)
      .then(() => setReload(!reload))
      .catch((err) => alert(err.response.data));
  };

  const handleDownvote = () => {
    if (!user) return alert("Login to vote!");
    axios
      .patch(`http://localhost:3000/posts/${id}/downvote?email=${user.email}`)
      .then(() => setReload(!reload))
      .catch((err) => alert(err.response.data));
  };

  const handleComment = () => {
    if (!user) return alert("Login to comment!");
    if (!commentText.trim()) return;

    axios
      .post(`http://localhost:3000/comments`, {
        postId: id,
        commenterEmail: user.email,
        commenterName: user.displayName,
        commentText: commentText,
      })
      .then(() => {
        setCommentText("");
        setReload(!reload);
      });
  };


  if (!post) return <div className="text-center my-10">Loading post...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <img src={post.authorImage} alt="author" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-sm text-gray-500">{dayjs(post.postTime).format("MMM D, YYYY h:mm A")}</p>
        </div>
      </div>

      {/* Title + Description */}
      <h1 className="text-2xl font-bold text-accent mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((t, idx) => (
          <span key={idx} className="text-sm text-primary font-semibold">#{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-5 items-center mb-6">
        <button onClick={handleUpvote} className="btn btn-outline btn-sm">👍 {post.upvote}</button>
        <button onClick={handleDownvote} className="btn btn-outline btn-sm">👎 {post.downvote}</button>

        {/* Share Button */}
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Comments</h2>

        {user ? (
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleComment} className="btn btn-primary">Comment</button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Please login to comment.</p>
        )}

        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.commenterName}`} className="w-8 h-8 rounded-full" alt="user" />
              <div className="bg-base-200 p-3 rounded-lg">
                <p className="font-medium">{comment.commenterName}</p>
                <p className="text-sm">{comment.commentText}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PostDetails;
