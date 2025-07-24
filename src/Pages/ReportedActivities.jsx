import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ReportedActivities = () => {
  const [reportedComments, setReportedComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://chatter-box-server-three.vercel.app/reported-comments");
      setReportedComments(res.data || []);
    } catch (err) {
      console.error("Failed to load reports:", err);
      toast.error("Failed to fetch reported comments.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id) => {
    try {
      await axios.patch(`https://chatter-box-server-three.vercel.app/comments/${id}/resolve-report`);
      toast.success("✅ Comment report resolved.");
      fetchReports();
    } catch (err) {
      console.error("Resolve failed:", err);
      toast.error("❌ Failed to resolve comment.");
    }
  };



// Make sure this is set globally somewhere like in AuthProvider
axios.defaults.withCredentials = true;

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`https://chatter-box-server-three.vercel.app/comments/${id}`);
    
    if (response.data?.success) {
      toast.success("🗑️ Comment deleted successfully.");
      fetchReports(); // Refresh the list if applicable
    } else {
      toast.error("❌ Could not delete comment.");
    }
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    toast.error("❌ Failed to delete comment.");
  }
};


  return (
    <section className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        🚩 Reported Comments Dashboard
      </h2>

      {reportedComments.length === 0 ? (
        <p className="text-center text-gray-600">No reported comments at the moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra border">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th>#</th>
                <th>Name</th>
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
                  <td>{comment.commenterName || "N/A"}</td>
                  <td>{comment.commenterEmail || "N/A"}</td>
                  <td>
                    {comment.commentText?.length > 25 ? (
                      <>
                        {comment.commentText.slice(0, 25)}...
                        <button
                          onClick={() => {
                            setSelectedComment(comment);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 underline text-sm ml-1"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      comment.commentText || "No comment"
                    )}
                  </td>
                  <td>{comment.reportFeedback || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        comment.reportStatus === "resolved" ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {comment.reportStatus || "Pending"}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    {comment.reportStatus !== "resolved" && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleResolve(comment._id)}
                      >
                        Resolve
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

      {/* Modal */}
      {isModalOpen && selectedComment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Full Comment</h3>
            <p className="text-gray-800 mb-6">{selectedComment.commentText}</p>
            <div className="text-right">
              <button className="btn btn-sm btn-primary" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportedActivities;
