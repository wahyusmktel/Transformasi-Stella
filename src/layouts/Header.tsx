import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Command,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Sun,
  Moon, // Import Icon Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navItems } from "@/config/menu";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

// --- MOCK DATA NOTIFIKASI (Sesuai Referensi Gambar) ---
const notifications = [
  {
    id: 1,
    name: "Terry Franci",
    action: "requests permission to change",
    project: "Project - Nganter App",
    time: "5 min ago",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    status: "online", // green
  },
  {
    id: 2,
    name: "Alena Franci",
    action: "requests permission to change",
    project: "Project - Nganter App",
    time: "8 min ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    status: "online",
  },
  {
    id: 3,
    name: "Jocelyn Kenter",
    action: "requests permission to change",
    project: "Project - Nganter App",
    time: "15 min ago",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    status: "online",
  },
  {
    id: 4,
    name: "Brandon Philips",
    action: "requests permission to change",
    project: "Project - Nganter App",
    time: "1 hr ago",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
    status: "busy", // red
  },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  // --- UBAH BAGIAN INI ---
  const handleLogout = () => {
    // Hapus SEMUA data sesi
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_roles");
    navigate("/login");
  };

  // --- TAMBAHAN BARU: AMBIL DATA USER REAL ---
  // Kita baca data user yang disimpan saat login tadi
  const userDataStr = localStorage.getItem("user_data");
  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  
  // Fallback default jika data belum ada
  const userName = userData?.name || "User";
  const userEmail = userData?.email || "user@example.com";

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-md lg:px-6">
      {/* --- MOBILE SIDEBAR TRIGGER --- */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden rounded-full hover:bg-slate-100 w-10 h-10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-slate-600" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col w-[300px] sm:w-[350px]"
        >
          <SheetHeader className="mb-6 text-left">
            <SheetTitle className="flex items-center gap-3 font-bold text-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-500/30">
                <Command className="h-5 w-5" />
              </div>
              Master Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                    isActive
                      ? "bg-red-50 text-red-600 font-bold"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pb-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 rounded-xl py-6 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-bold">Log Out</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Spacer Spacer (Biar konten kanan mojok) */}
      <div className="w-full flex-1"></div>

      {/* --- 4. THEME TOGGLE BUTTON (BARU) --- */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-10 w-10 border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* --- NOTIFICATION POPOVER (NEW) --- */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full h-10 w-10 border border-slate-200 shadow-sm hover:bg-slate-100 focus-visible:ring-0"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            {/* Red Dot Indicator (Unread) */}
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-600 border border-white"></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-[380px] p-0 rounded-2xl shadow-xl overflow-hidden mr-2"
        >
          {/* Header Notifikasi */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
            <h4 className="font-bold text-lg text-slate-900">Notification</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-slate-400 hover:text-slate-900"
            >
              <X className="h-4 w-4" />{" "}
              {/* Icon Close (Hiasan, karena popover close otomatis) */}
            </Button>
          </div>

          {/* List Notifikasi (Scrollable) */}
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 hover:bg-slate-50 transition-colors border-b last:border-0 cursor-pointer"
              >
                {/* Avatar dengan Status Dot */}
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10 border border-slate-100">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  {/* Status Dot (Green/Red) */}
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                      item.status === "online" ? "bg-green-500" : "bg-red-500"
                    )}
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <p className="text-sm text-slate-600 leading-snug">
                    <span className="font-bold text-slate-900">
                      {item.name}
                    </span>{" "}
                    {item.action}{" "}
                    <span className="font-bold text-slate-900">
                      {item.project}
                    </span>
                  </p>
                  <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    Project • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Button 'View All' */}
          <div className="p-4 border-t bg-slate-50/50">
            <Button
              variant="outline"
              className="w-full rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-white hover:text-slate-900 hover:shadow-sm h-11"
            >
              View All Notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* --- USER PROFILE DROPDOWN --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 border border-slate-200 shadow-sm focus-visible:ring-0"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-72 rounded-xl shadow-xl p-2 mt-2 mr-4"
        >
          <DropdownMenuLabel className="p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-base font-bold text-slate-900 leading-none">
                {userName}
              </p>
              <p className="text-sm font-normal text-slate-500 leading-none">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <div className="px-2 pb-2">
            <DropdownMenuSeparator className="bg-slate-100" />
          </div>
          <div className="space-y-1 px-1">
            <DropdownMenuItem
              asChild
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 transition-colors"
            >
              {/* Pindahkan semua class styling ke induk (DropdownMenuItem) */}
              <Link to="/dashboard/profile" className="w-full">
                <User className="h-5 w-5 text-slate-400 mr-3" />{" "}
                {/* Kasih margin right di icon biar aman */}
                Edit profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:bg-slate-50 transition-colors">
              <Settings className="h-5 w-5 text-slate-400" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:bg-slate-50 transition-colors">
              <HelpCircle className="h-5 w-5 text-slate-400" />
              Support
            </DropdownMenuItem>
          </div>
          <div className="p-2">
            <DropdownMenuSeparator className="bg-slate-100" />
          </div>
          <div className="px-1 pb-1">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 transition-colors group"
            >
              <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-600 group-focus:text-red-600" />
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
