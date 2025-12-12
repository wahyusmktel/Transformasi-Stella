import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute"; // <--- Import ini
import Profile from "@/pages/Profile";
import SampleTable from "@/pages/SampleTable";
import Chat from "@/pages/Chat";
import UsersPage from "@/pages/UsersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES (Hanya untuk yang BELUM login) --- */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          {/* Nanti kalau ada halaman Register, taruh sini juga */}
        </Route>

        {/* --- PROTECTED ROUTES (Hanya untuk yang SUDAH login) --- */}
        <Route element={<ProtectedRoute />}>
          {/* Bungkus Dashboard dengan MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/table" element={<SampleTable />} />
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/users" element={<UsersPage />} />

            {/* Nanti kalau nambah halaman lain, taruh sini. Contoh: */}
            {/* <Route path="/dashboard/users" element={<UsersPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
