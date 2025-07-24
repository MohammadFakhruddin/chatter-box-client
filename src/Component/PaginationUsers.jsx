import { useEffect, useState } from "react";
import axios from "axios";

const PaginationUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 5;

  const fetchUsers = async (pageNum) => {
    try {
      const res = await axios.get(`http://localhost:5000/all-users?page=${pageNum}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotalUsers(res.data.totalUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages.map((num, idx) =>
      num === "..." ? (
        <span key={idx} className="px-2 text-gray-400">...</span>
      ) : (
        <button
          key={idx}
          onClick={() => setPage(num)}
          className={`px-3 py-1 rounded ${page === num ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
        >
          {num}
        </button>
      )
    );
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalUsers);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">👤 Manage Users</h2>

      <table className="table w-full mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={user._id}>
              <td>{(page - 1) * pageSize + i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-4">
        <div>
          Showing <strong>{start}-{end}</strong> of <strong>{totalUsers}</strong>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationUsers;
