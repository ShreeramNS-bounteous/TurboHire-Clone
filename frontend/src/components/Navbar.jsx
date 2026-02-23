import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import BaseNavbar from "./BaseNavbar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block py-2 text-sm font-medium transition ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  const navLinks = (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 ml-6">
        <NavLink to="/recruiter/jobs" className={linkClass}>
          Jobs
        </NavLink>
        <NavLink to="/recruiter/candidates" className={linkClass}>
          Candidates
        </NavLink>
        <NavLink to="/recruiter/interviews" className={linkClass}>
          Interview
        </NavLink>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-300"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>
    </>
  );

  const rightContent = (
    <div className="hidden md:flex items-center gap-4">
      <span className="text-gray-300 text-sm">
        {user?.email}
      </span>
      <button
        onClick={handleLogout}
        className="text-gray-300 hover:text-red-400 transition text-sm"
      >
        Logout
      </button>
    </div>
  );

  return (
    <>
      <BaseNavbar
        leftContent={navLinks}
        rightContent={rightContent}
      />

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f172a] px-6 py-4 space-y-3">
          <NavLink
            to="/recruiter/jobs"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/recruiter/candidates"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Candidates
          </NavLink>
          <NavLink
            to="/recruiter/interviews"
            className={linkClass}
            onClick={() => setMobileOpen(false)}
          >
            Interview
          </NavLink>

          <div className="border-t border-gray-700 pt-3 mt-3">
            <div className="text-gray-400 text-xs">
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="text-red-400 text-sm mt-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}