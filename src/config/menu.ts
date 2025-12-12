import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  UserPlus,
  List,
  Table as TableIcon,
  MessageSquare,
  GraduationCap, // Icon baru untuk Akademik
  School,        // Icon baru untuk Sekolah/Kelas
  BookOpen       // Icon baru untuk Mapel
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: any;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  // --- 1. UTAMA ---
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  // --- 2. MANAJEMEN PENGGUNA (YANG KITA KERJAKAN SEKARANG) ---
  {
    title: "User Management",
    href: "#", 
    icon: Users,
    children: [
      {
        title: "Semua Pengguna", // Ini yang SUDAH JADI (Real API)
        href: "/dashboard/users",
        icon: List,
      },
      // Fitur Masa Depan (Saya comment dulu biar user gak bingung)
      /*
      {
        title: "Tambah User",
        href: "/dashboard/users/create",
        icon: UserPlus,
      },
      {
        title: "Roles & Permission",
        href: "/dashboard/users/roles",
        icon: Shield,
      },
      */
    ],
  },

  // --- 3. DATA AKADEMIK (SESUAI DATABASE KAMU) ---
  // Ini persiapan untuk next step (Siswa, Guru, Kelas)
  {
    title: "Data Akademik",
    href: "#",
    icon: GraduationCap,
    children: [
      {
        title: "Data Siswa",
        href: "/dashboard/siswa",
        icon: Users,
      },
      {
        title: "Data Guru",
        href: "/dashboard/guru",
        icon: UserPlus,
      },
      {
        title: "Data Kelas & Rombel",
        href: "/dashboard/kelas",
        icon: School,
      },
      {
        title: "Mata Pelajaran",
        href: "/dashboard/mapel",
        icon: BookOpen,
      },
    ],
  },

  // --- 4. KOMUNIKASI ---
  {
    title: "Pesan & Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },

  // --- 5. DEVELOPMENT TOOLS (JANGAN DIHAPUS DULU) ---
  // Simpan ini buat nyontek kodingan tabel/komponen
  {
    title: "UI Template",
    href: "/dashboard/table",
    icon: TableIcon, 
  },
  
  // --- 6. SYSTEM ---
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];