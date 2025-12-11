import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  ArrowRight,
  Download,
} from "lucide-react";

import TrackingWidget from "@/components/shared/TrackingWidget";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* HEADER TITLE */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Pantau performa aplikasi dan statistik bisnis Anda hari ini.
        </p>
      </div>

      {/* --- WELCOME BANNER (NEW) --- */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 p-8 text-white shadow-xl shadow-red-500/20">
        {/* Konten Teks */}
        <div className="relative z-10 flex flex-col items-start gap-4 max-w-xl">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">
              Selamat Datang kembali, Administrator! 👋
            </h2>
            <p className="text-red-100 text-lg leading-relaxed opacity-90">
              Sistem berjalan dengan optimal hari ini. Anda memiliki{" "}
              <span className="font-bold text-white underline decoration-wavy decoration-white/50">
                4 notifikasi penting
              </span>{" "}
              yang perlu ditinjau. Siap untuk memulai produktivitas hari ini?
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <Button
              variant="secondary"
              className="font-bold text-red-600 hover:bg-white shadow-lg border-0"
            >
              Lihat Laporan
            </Button>
            <Button
              variant="outline"
              className="font-bold bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Unduh Data
            </Button>
          </div>
        </div>

        {/* Ilustrasi Vector (SVG) di Pojok Kanan Bawah */}
        <div className="absolute bottom-0 right-0 hidden lg:block translate-y-4 translate-x-4 opacity-90">
          {/* SVG Illustration: Working Desk */}
          <svg
            width="320"
            height="240"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Meja */}
            <path
              d="M50 250H350V260C350 265.523 345.523 270 340 270H60C54.4772 270 50 265.523 50 260V250Z"
              fill="white"
              fillOpacity="0.2"
            />

            {/* Laptop Base */}
            <path
              d="M120 250L130 200H270L280 250H120Z"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Laptop Screen */}
            <path
              d="M130 200V130C130 124.477 134.477 120 140 120H260C265.523 120 270 124.477 270 130V200H130Z"
              fill="white"
              fillOpacity="0.5"
            />
            {/* Logo di Laptop */}
            <circle cx="200" cy="160" r="10" fill="#EF4444" />

            {/* Orang (Badan) */}
            <path
              d="M200 250C240 250 260 280 260 300H140C140 280 160 250 200 250Z"
              fill="#FEE2E2"
            />
            {/* Orang (Baju) */}
            <path
              d="M200 250C230 250 250 280 250 300H150C150 280 170 250 200 250Z"
              fill="white"
            />

            {/* Kepala */}
            <circle cx="200" cy="210" r="35" fill="#FEE2E2" />
            {/* Rambut */}
            <path
              d="M165 210C165 180 180 170 200 170C220 170 235 180 235 210V220H165V210Z"
              fill="#7F1D1D"
            />

            {/* Elemen Dekorasi Melayang (Bubbles) */}
            <circle cx="320" cy="80" r="20" fill="white" fillOpacity="0.1" />
            <circle cx="50" cy="100" r="10" fill="white" fillOpacity="0.1" />
            <circle cx="350" cy="200" r="15" fill="white" fillOpacity="0.1" />
          </svg>
        </div>

        {/* Pola Background Abstrak (Biar gak polos) */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-black/10 blur-2xl"></div>
      </div>

      {/* --- CARD STATISTIK (SAMA SEPERTI SEBELUMNYA) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total Pendapatan
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              Rp 45.231.000
            </div>
            <p className="text-xs text-green-600 font-bold mt-1 bg-green-100 dark:bg-green-900/30 w-fit px-2 py-0.5 rounded-full">
              +20.1% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              User Aktif
            </CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              +2350
            </div>
            <p className="text-xs text-slate-500 mt-1">+180 user baru</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Penjualan
            </CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              +12,234
            </div>
            <p className="text-xs text-slate-500 mt-1">+19% dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Keaktifan
            </CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              +573
            </div>
            <p className="text-xs text-slate-500 mt-1">
              +201 sejak jam terakhir
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- CHART SECTION & TRACKING WIDGET (UPDATED) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Kolom Kiri: Chart (Lebar 4/7) */}
        <Card className="col-span-4 dark:bg-slate-900 dark:border-slate-800 lg:col-span-4">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Overview Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 border border-dashed border-slate-200 dark:border-slate-700">
              Area Chart Disini
            </div>
          </CardContent>
        </Card>

        {/* Kolom Kanan: Tracking Widget (Lebar 3/7) */}
        <div className="col-span-3 lg:col-span-3">
          <TrackingWidget />
        </div>
      </div>

      {/* Kolom Bawah: Recent Sales (Opsional, pindah ke bawah full width atau biarkan) */}
      <div className="grid gap-4 grid-cols-1">
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Dummy List Transaction */}
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2 last:border-0 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        User {i + 1}
                      </p>
                      <p className="text-xs text-slate-500">
                        user{i + 1}@example.com
                      </p>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    +$250.00
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
