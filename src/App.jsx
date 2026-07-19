import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CompleteProfile from "./pages/CompleteProfile";
import Schemes from "./pages/Schemes";
import Recommendations from "./pages/Recommendations";
import Favorites from "./pages/Favorites";
import SchemeDetails from "./pages/SchemeDetails";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/Dashboard";
import AddScheme from "./pages/admin/AddScheme";
import EditScheme from "./pages/admin/EditScheme";
import ManageSchemes from "./pages/admin/ManageSchemes";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schemes"
        element={
          <ProtectedRoute>
            <Schemes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/schemes/:id"
        element={
          <ProtectedRoute>
            <SchemeDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-scheme"
        element={
          <AdminRoute>
            <AddScheme />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/manage-schemes"
        element={
          <AdminRoute>
            <ManageSchemes />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit-scheme/:id"
        element={
          <AdminRoute>
            <EditScheme />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
