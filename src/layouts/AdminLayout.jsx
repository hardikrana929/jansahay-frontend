import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex transition-colors">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 min-h-screen">
        <div className="lg:hidden flex items-center justify-between bg-white dark:bg-gray-900 shadow px-4 py-3">
          <button onClick={() => setIsOpen(true)}>
            <FaBars className="text-2xl text-blue-700 dark:text-blue-400" />
          </button>
          <h1 className="font-bold text-blue-700 dark:text-blue-400">
            JanSahay Admin
          </h1>
          <div />
        </div>

        <main className="p-4 md:p-8 text-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
