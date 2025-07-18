import React, { useEffect, useState } from "react";
import axios from "axios";

const feedbackOptions = [
  "Spam or irrelevant content",
  "Offensive language",
  "Inappropriate behavior",
];

const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const CommentsPage = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({}); // { commentId: feedback }
  const [reportedComments, setReportedComments] = useState(new Set()); // Set of reported comment IDs
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    // Fetch comments for the post
    axios
      .get(`http://localhost:3000/comments/${postId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [postId]);

  const handleFeedbackChange = (commentId, value) => {
    setSelectedFeedbacks((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReport = (commentId) => {
    // TODO: Call API to report comment, e.g. POST /comments/:commentId/report
    // For now, just disable the button after reporting
    setReportedComments((prev) => new Set(prev).add(commentId));
    alert("Reported successfully!");
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments for Post {postId}</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Comment</th>
            <th>Feedback</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(({ _id, userEmail, text }) => (
            <tr key={_id}>
              <td>{userEmail}</td>
              <td>
                {text.length > 20 ? (
                  <>
                    {truncateText(text)}{" "}
                    <button
                      onClick={() => setModalContent(text)}
                      className="text-blue-600 underline"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  text
                )}
              </td>
              <td>
                <select
                  disabled={reportedComments.has(_id)}
                  value={selectedFeedbacks[_id] || ""}
                  onChange={(e) => handleFeedbackChange(_id, e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">Select feedback</option>
                  {feedbackOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-error"
                  disabled={
                    reportedComments.has(_id) || !selectedFeedbacks[_id]
                  }
                  onClick={() => handleReport(_id)}
                >
                  Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for full comment */}
      {modalContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-white p-6 rounded max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-4">Full Comment</h3>
            <p className="mb-4">{modalContent}</p>
            <button
              className="btn btn-primary"
              onClick={() => setModalContent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
