import { NavLink } from "react-router-dom";

const linkStyle =
  "block px-4 py-2 rounded-lg hover:bg-gray-100 transition";

const activeStyle = "bg-gray-900 text-white";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-2">

      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Users
      </NavLink>


    </aside>
  );
};

export default AdminSidebar;