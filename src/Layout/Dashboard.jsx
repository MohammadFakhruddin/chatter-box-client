import React from 'react';
import { Link, Outlet } from "react-router";


const Dashboard = () => {
  return (


    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-200 p-5">
        <h2 className="text-xl font-bold mb-6">📋 Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard/myprofile" className="btn btn-ghost w-full justify-start">
              👤 My Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/addpost" className="btn btn-ghost w-full justify-start">
              ➕ Add Post
            </Link>
          </li>
          <li>
            <Link to="/dashboard/myposts" className="btn btn-ghost w-full justify-start">
              📝 My Posts
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};


export default Dashboard;
