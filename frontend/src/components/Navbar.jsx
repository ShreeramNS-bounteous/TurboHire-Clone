import { useAuth } from "../auth/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import BaseNavbar from "./BaseNavbar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  const navLinks = (
    <nav className="flex items-center gap-6 ml-6">
      <NavLink to="/recruiter/jobs" className={linkClass}>
        Jobs
      </NavLink>
      <NavLink to="/recruiter/candidates" className={linkClass}>
        Candidates
      </NavLink>
      <NavLink to="/recruiter/interviews" className={linkClass}>
        Interview
      </NavLink>
      {/* <NavLink to="/recruiter/pipeline" className={linkClass}>
        Onboard
      </NavLink>
      <NavLink to="/recruiter/reports" className={linkClass}>
        Reports
      </NavLink> */}
    </nav>
  );

  const rightContent = (
    <>
      <span className="text-gray-300 text-sm">
        {user?.email}
      </span>
      <button
        onClick={handleLogout}
        className="text-gray-300 hover:text-red-400 transition text-sm"
      >
        Logout
      </button>
    </>
  );

  return (
    <BaseNavbar
      leftContent={navLinks}
      rightContent={rightContent}
    />
  );
}