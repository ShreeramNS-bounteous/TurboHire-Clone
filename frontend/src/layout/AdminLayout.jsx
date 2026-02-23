import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <AdminNavbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;