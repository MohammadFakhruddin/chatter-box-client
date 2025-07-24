import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const CommentsPage = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [reportedComments, setReportedComments] = useState(new Set());
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const feedbackOptions = ["Spam", "Harassment", "Offensive", "Other"];

  useEffect(() => {
    axios
      .get(`https://chatter-box-server-three.vercel.app/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [id]);

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedbacks({ ...selectedFeedbacks, [commentId]: feedback });
  };

  const handleReport = async (commentId) => {
    const feedback = selectedFeedbacks[commentId];
    if (!feedback) return;

    try {
      await axios.patch(`https://chatter-box-server-three.vercel.app/comments/${commentId}/report`, { feedback });
      setReportedComments(new Set(reportedComments).add(commentId));
    } catch (err) {
      console.error("Report failed:", err);
    }
  };

  const truncateText = (text) => text.slice(0, 20) + "...";

  return (
    <div className="overflow-x-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Comments for This Post</h2>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Email</th>
            <th>Comment</th>
            <th>Feedback</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(({ _id, commenterEmail, commentText }) => (
            <tr key={_id}>
              <td>{commenterEmail || "N/A"}</td>
              <td>
                {commentText && commentText.length > 20 ? (
                  <>
                    {truncateText(commentText)}{" "}
                    <button
                      onClick={() => setModalContent(commentText)}
                      className="text-blue-600 underline text-sm"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  commentText || "No comment"
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
                  disabled={reportedComments.has(_id) || !selectedFeedbacks[_id]}
                  onClick={() => handleReport(_id)}
                >
                  Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalContent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-xl w-96">
            <h3 className="text-lg font-bold mb-2">Full Comment</h3>
            <p className="mb-4">{modalContent}</p>
            <button
              onClick={() => setModalContent("")}
              className="btn btn-sm btn-primary"
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
