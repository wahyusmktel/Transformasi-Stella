import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Cek apakah ada data 'token' tersimpan di browser
  // (Nanti di real app, kita cek validitas tokennya ke server)
  const isAuthenticated = localStorage.getItem("user_data");

  // Kalau ada token, silakan masuk (Outlet merepresentasikan halaman tujuan, misal Dashboard)
  // Kalau tidak ada, tendang balik ke Login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
