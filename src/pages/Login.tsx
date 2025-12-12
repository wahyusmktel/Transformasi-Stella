import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios"; // Import konfigurasi Axios kita
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Command, ArrowRight, Loader2, Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Login() {
  const [email, setEmail] = useState(""); // State untuk Email
  const [password, setPassword] = useState(""); // State untuk Password
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State untuk Error Message
  const [isResetOpen, setIsResetOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Langsung POST ke Endpoint Node.js
      // Tidak perlu csrf-cookie lagi!
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Sukses:", response.data);

      // 2. SIMPAN HARTA KARUN (TOKEN & USER)
      // Ini bagian paling penting di JWT
      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("user_data", JSON.stringify(response.data.user));
      
      // Simpan role jika ada (opsional, tergantung respon backendmu)
      if (response.data.user.roles) {
         localStorage.setItem("user_roles", JSON.stringify(response.data.user.roles));
      }

      // 3. Pindah ke Dashboard
      navigate("/dashboard");

    } catch (err: any) {
      console.error("Login Gagal:", err);
      
      if (err.response) {
        // Menangkap pesan error dari authController.ts (Node.js)
        // misal: "Password salah" atau "Email tidak ditemukan"
        setError(err.response.data.message || "Login gagal.");
      } else {
        setError("Tidak dapat menghubungi server backend (Pastikan port 5000 jalan).");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi kirim email reset (Nanti bisa diganti API real juga)
    setTimeout(() => {
      setIsLoading(false);
      setIsResetOpen(false);
      alert("Link reset password telah dikirim ke email Anda!");
    }, 2000);
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* --- BAGIAN KIRI (IMAGE - LEBIH CERAH) --- */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* Background Image */}
        <div className="absolute inset-0 bg-red-900" />{" "}
        {/* Base color merah tua, bukan hitam */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1761839256601-e768233e25e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay" />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-animated-gradient opacity-90 mix-blend-multiply" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-20 flex items-center text-lg font-bold"
        >
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-lg">
            <Command className="h-5 w-5" />
          </div>
          Master Dashboard
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-20 mt-auto"
        >
          <blockquote className="space-y-2 border-l-4 border-white/50 pl-6">
            <p className="text-lg font-medium italic text-white/90">
              "Kombinasi performa tinggi dan desain yang memukau. Template ini
              benar-benar menghidupkan aplikasi saya."
            </p>
          </blockquote>
        </motion.div>
      </div>

      {/* --- BAGIAN KANAN (FORM) --- */}
      <div className="flex h-full items-center justify-center p-6 lg:p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome Back!
            </h1>
            <p className="text-sm text-slate-500">
              Masuk untuk mengelola dashboard Anda
            </p>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-center gap-2"
            >
                <AlertCircle className="w-4 h-4" />
                {error}
            </motion.div>
          )}

          <div className="grid gap-6">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                {/* Input Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300" />
                    <Input
                      id="email"
                      placeholder="admin@master.com"
                      type="email"
                      value={email} // BINDING STATE
                      onChange={(e) => setEmail(e.target.value)} // BINDING STATE
                      className="pl-10 h-11 border-slate-200 bg-slate-50/50 shadow-sm transition-all duration-300 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Input Password & Forgot Password Link */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                    {/* TRIGGER MODAL RESET PASSWORD */}
                    <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="text-xs font-semibold text-red-600 hover:text-red-500 hover:underline"
                        >
                          Lupa Password?
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Reset Password</DialogTitle>
                          <DialogDescription>
                            Masukkan email yang terdaftar. Kami akan mengirimkan
                            link untuk mereset password Anda.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleResetPassword}
                          className="grid gap-4 py-4"
                        >
                          <div className="grid gap-2">
                            <Label htmlFor="reset-email">Email</Label>
                            <Input
                              id="reset-email"
                              placeholder="nama@email.com"
                              type="email"
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                "Kirim Link Reset"
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    {/* END TRIGGER MODAL */}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300" />
                    <Input
                      id="password"
                      placeholder="******"
                      type="password"
                      value={password} // BINDING STATE
                      onChange={(e) => setPassword(e.target.value)} // BINDING STATE
                      className="pl-10 h-11 border-slate-200 bg-slate-50/50 shadow-sm transition-all duration-300 focus-visible:ring-0 focus-visible:border-red-500 focus-visible:bg-white focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Tombol Login Gradient */}
                <Button
                  type="submit"
                  className="h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">
                  Atau login dengan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* ORIGINAL GITHUB ICON */}
              <Button
                variant="outline"
                className="h-11 border-slate-200 bg-white hover:bg-slate-50 transition-all"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Github
              </Button>

              {/* ORIGINAL GOOGLE ICON */}
              <Button
                variant="outline"
                className="h-11 border-slate-200 bg-white hover:bg-slate-50 transition-all"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}