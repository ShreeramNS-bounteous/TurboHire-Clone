import { useAuth } from "../../auth/AuthContext";

const AdminNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-3 flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.email}
        </span>

        <button className="px-3 py-1 bg-gray-900 text-white rounded-lg">
          Logout
        </button>
      </div>

    </header>
  );
};

export default AdminNavbar;