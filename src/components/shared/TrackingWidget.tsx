import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Truck, Package, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipe data untuk step tracking
type TrackingStep = {
  title: string;
  date: string;
  time: string;
  status: "completed" | "current" | "pending";
  icon: any;
};

// Data Dummy (Bisa diganti props nanti)
const trackingSteps: TrackingStep[] = [
  {
    title: "Picked up",
    date: "12 Apr 2025",
    time: "12:54",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    title: "In Transit",
    date: "12 Apr 2025",
    time: "12:58",
    status: "current", // Posisi sekarang
    icon: Truck,
  },
  {
    title: "Delivered",
    date: "13 Apr 2025",
    time: "--:--",
    status: "pending",
    icon: Package,
  },
];

export default function TrackingWidget() {
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Tracking ID
          </CardTitle>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            #28745-72809bjk
          </p>
        </div>
        {/* Badge Status Utama */}
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
        >
          In Transit
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="relative space-y-0">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === trackingSteps.length - 1;

            return (
              <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                {/* GARIS PENGHUBUNG (Dotted Line) */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[19px] top-10 bottom-0 w-[2px] border-l-2 border-dashed",
                      step.status === "completed"
                        ? "border-blue-300"
                        : "border-slate-200 dark:border-slate-700"
                    )}
                  />
                )}

                {/* ICON LINGKARAN */}
                <div
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors bg-white dark:bg-slate-900",
                    // Style untuk status 'completed' & 'current' (Biru)
                    step.status === "completed" || step.status === "current"
                      ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400"
                      : "border-slate-100 bg-slate-50 text-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-1 items-start justify-between pt-1">
                  <div className="space-y-0.5">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {step.date}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-bold",
                        step.status === "pending"
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-slate-900 dark:text-white"
                      )}
                    >
                      {step.title}
                    </p>
                    {/* Animasi pulse kecil kalau statusnya 'current' */}
                    {step.status === "current" && (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400">
                        Proses
                      </span>
                    )}
                  </div>

                  {/* JAM */}
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {step.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
