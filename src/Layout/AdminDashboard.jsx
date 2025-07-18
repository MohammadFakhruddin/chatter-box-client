import { Outlet, NavLink } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-gray-100 h-screen">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li>
            <NavLink to="/admin-dashboard/admin-profile">Admin Profile</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/manage-users">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/reported-activities">Reported Comments</NavLink>
          </li>
          <li>
            <NavLink to="/admin-dashboard/make-announcement">Make Announcement</NavLink>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
