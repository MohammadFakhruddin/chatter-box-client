import { useEffect, useState } from "react";
import axios from "axios";

const ReportedActivities = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReports = async () => {
    const res = await axios.get("/comments?reported=true"); // Update this if your endpoint is different
    setReportedComments(res.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id) => {
    await axios.patch(`/comments/${id}/resolve`);
    fetchReports();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;
    await axios.delete(`/comments/${id}`);
    fetchReports();
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🚩 Reported Comments</h2>

      {reportedComments.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Commenter</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedComments.map((comment, index) => (
                <tr key={comment._id}>
                  <td>{index + 1}</td>
                  <td>{comment.commenterName}</td>
                  <td>{comment.commenterEmail}</td>
                  <td>
                    {comment.commentText.length > 20 ? (
                      <>
                        {comment.commentText.slice(0, 20)}...
                        <button
                          onClick={() => {
                            setSelectedComment(comment);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-500 ml-1 underline"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment.commentText
                    )}
                  </td>
                  <td>{comment.reportFeedback}</td>
                  <td>
                    <span
                      className={`badge ${
                        comment.reportStatus === "resolved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {comment.reportStatus}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {comment.reportStatus !== "resolved" && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleResolve(comment._id)}
                      >
                        Mark Resolved
                      </button>
                    )}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for full comment */}
      {isModalOpen && (
        <>
          <input
            type="checkbox"
            id="comment-modal"
            className="modal-toggle"
            checked={isModalOpen}
            readOnly
          />
          <div className="modal modal-open">
            <div className="modal-box relative">
              <h3 className="font-bold text-lg mb-4">Full Comment</h3>
              <p>{selectedComment?.commentText}</p>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ReportedActivities;
