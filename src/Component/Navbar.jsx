import { useContext, useEffect, useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../assets/Chatterbox logo.png";
import { AuthContext } from "../Provider/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null); // ⬅️ New role state

  const handleLogout = () => {
    logOut().catch((err) => console.error("Logout error", err));
  };

  // Fetch announcement count
  useEffect(() => {
    axios
      .get("http://localhost:3000/announcement-count")
      .then((res) => setAnnouncementCount(res.data.count))
      .catch((err) => console.error("Failed to fetch announcements", err));
  }, []);

  // Fetch user role from backend
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`) 
        .then((res) => setRole(res.data.role))
        .catch((err) => console.error("Failed to fetch user role", err));
    }
  }, [user]);

  console.log("User:", user, "Role from DB:", role);


  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-3 text-neutral font-sans">
        {/* Logo + Name */}
        <div className="flex-1 flex items-center gap-3">
          <NavLink to={'/'}>          <img src={logo} alt="Chatterbox Logo" className="h-10" />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/membership" className="btn btn-ghost">Membership</Link>

          {announcementCount > 0 && (
            <div className="relative">
              <FaBell className="text-xl text-accent cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs px-1.5 rounded-full">
                {announcementCount}
              </span>
            </div>
          )}

          {!user ? (
            <Link to="/auth/login" className="btn btn-secondary text-white">Join Us</Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-circle avatar">
                <div className="w-10 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[999] menu p-2 shadow bg-white text-neutral rounded-box w-52 mt-4"
              >
                <li>
                  <span className="text-sm font-semibold pointer-events-none">
                    {user.displayName}
                  </span>
                </li>
                <li>
                  <Link to={role === 'admin' ? '/admin-dashboard' : '/dashboard'}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-base-100 shadow space-y-2 text-neutral">
          <Link to="/" className="block btn btn-ghost w-full text-left">Home</Link>
          <Link to="/membership" className="block btn btn-ghost w-full text-left">Membership</Link>

          {announcementCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-accent text-sm">Notifications</span>
              <div className="relative">
                <FaBell className="text-lg text-accent" />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs px-1.5 rounded-full">
                  {announcementCount}
                </span>
              </div>
            </div>
          )}

          {!user ? (
            <Link to="/auth/login" className="btn btn-secondary w-full text-white">Join Us</Link>
          ) : (
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <p className="font-semibold text-sm">{user.displayName}</p>
              <Link
                to={role === 'admin' ? '/admin-dashboard' : '/dashboard'}
                className="hover:text-accent block"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="hover:text-error">Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
