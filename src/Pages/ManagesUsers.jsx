import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManagesUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`https://chatter-box-server-three.vercel.app/users?search=${search}`);
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const makeAdmin = async (email) => {
    try {
      await axios.patch(`https://chatter-box-server-three.vercel.app/users/${email}/make-admin`);
      toast.success("User promoted to Admin ✅"); 
      fetchUsers();
    } catch (error) {
      toast.error("Failed to promote user.", error); 
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search user by name..."
        className="input input-bordered mb-4 w-full sm:w-80"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Membership</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-500">Admin</span>
                  ) : (
                    <button className="btn btn-xs btn-warning" onClick={() => makeAdmin(user.email)}>
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.isMember ? (
                    <span className="badge badge-success">Gold</span>
                  ) : (
                    <span className="badge badge-secondary">Free</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagesUsers;
