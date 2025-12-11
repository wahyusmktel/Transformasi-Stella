import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Trash2,
  FileDown,
  FileSpreadsheet,
  FileText,
  Eye,
  Filter,
  Search,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// IMPORT ALERT DIALOG (NEW)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// --- TIPE DATA ---
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
};

// --- DUMMY DATA ---
const data: UserData[] = Array.from({ length: 50 }, (_, i) => ({
  id: `USR-${1000 + i}`,
  name: `User Sample ${i + 1}`,
  email: `user${i + 1}@master.com`,
  role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "User",
  status: i % 5 === 0 ? "Inactive" : i % 10 === 0 ? "Pending" : "Active",
  lastLogin: "2025-04-12",
}));

export default function SampleTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // --- TAMBAHAN STATE LOADING ---
  const [isLoading, setIsLoading] = React.useState(true); // Default true (sedang memuat)
  const [tableData, setTableData] = React.useState<UserData[]>([]); // Data tabel dari state

  // Simulasi Fetch Data dari API
  React.useEffect(() => {
    // Set loading true
    setIsLoading(true);

    // Ceritanya nunggu 2 detik (Simulasi delay server)
    const timer = setTimeout(() => {
      setTableData(data); // Masukkan data dummy ke state
      setIsLoading(false); // Loading selesai
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // State Modals
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  // State Delete Confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<{
    type: "bulk" | "single";
    id?: string;
  } | null>(null);

  // --- HANDLER HAPUS ---
  const handleDeleteClick = (type: "bulk" | "single", id?: string) => {
    setDeleteTarget({ type, id });
    setDeleteConfirmOpen(true);
  };

  const executeDelete = () => {
    // DISINI LOGIC HAPUS KE API NANTI
    if (deleteTarget?.type === "bulk") {
      console.log(
        "Menghapus massal:",
        Object.keys(rowSelection).length,
        "item"
      );
      setRowSelection({}); // Reset checklist setelah hapus
    } else {
      console.log("Menghapus item ID:", deleteTarget?.id);
    }
    setDeleteConfirmOpen(false);
    // Tambahkan Toast Notification disini nanti
    alert("Data berhasil dihapus!");
  };

  // --- DEFINISI KOLOM ---
  const columns: ColumnDef<UserData>[] = [
    // KOLOM CEKLIST (DIPERBAIKI JARAKNYA)
    {
      id: "select",
      header: ({ table }) => (
        // Wrapper div dengan ml-3 supaya geser kanan dikit
        <div className="ml-3">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        // Wrapper div dengan ml-3
        <div className="ml-3">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium ml-4">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role Access",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return (
          <Badge
            variant="outline"
            className={
              role === "Admin"
                ? "border-red-200 text-red-600 bg-red-50"
                : "border-slate-200"
            }
          >
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                status === "Active"
                  ? "bg-green-500"
                  : status === "Inactive"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            />
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => alert(`Lihat detail user: ${user.name}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.id)}
                >
                  Copy User ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Data</DropdownMenuItem>
                {/* UPDATE: Trigger Hapus Per Item */}
                <DropdownMenuItem
                  className="text-red-600 font-bold focus:text-red-600 focus:bg-red-50"
                  onClick={() => handleDeleteClick("single", user.id)}
                >
                  Delete Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Data Users
        </h1>
        <p className="text-slate-500 text-sm dark:text-slate-400">
          Kelola data pengguna, role, dan status akun disini.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 rounded-xl border bg-white p-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
        {/* Left Group */}
        <div className="flex flex-1 items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Cari nama user..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-dashed">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  table.getColumn("status")?.setFilterValue("Active")
                }
              >
                Active
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  table.getColumn("status")?.setFilterValue("Inactive")
                }
              >
                Inactive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => table.getColumn("status")?.setFilterValue("")}
              >
                Reset Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Group */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* UPDATE: Bulk Delete Trigger Dialog */}
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="h-9"
              onClick={() => handleDeleteClick("bulk")}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}

          <div className="flex items-center gap-1 border-r pr-2 mr-2">
            <Button variant="ghost" size="icon" title="Import Excel">
              <FileSpreadsheet className="h-4 w-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="icon" title="Export PDF">
              <FileText className="h-4 w-4 text-red-600" />
            </Button>
            <Button variant="ghost" size="icon" title="Export Excel">
              <FileDown className="h-4 w-4 text-blue-600" />
            </Button>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 h-9">
                <Plus className="mr-2 h-4 w-4" /> Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tambah User Baru</DialogTitle>
                <DialogDescription>
                  Masukan detail user baru di sini. Klik simpan jika sudah
                  selesai.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsAddOpen(false)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Simpan Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabel */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* --- LOGIC LOADING --- */}
            {isLoading ? (
              // Tampilkan 5 baris Skeleton Loading
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex} className="py-3">
                      <div className="h-6 w-full rounded bg-slate-100 animate-pulse dark:bg-slate-800" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              // Tampilkan Data Asli jika sudah selesai loading
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Tampilkan Pesan Kosong jika data 0
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- ALERT DIALOG COMPONENT (DI TARUH PALING BAWAH) --- */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {deleteTarget?.type === "bulk"
                ? `Anda akan menghapus ${
                    table.getFilteredSelectedRowModel().rows.length
                  } data yang dipilih. `
                : "Anda akan menghapus data ini. "}
              Tindakan ini tidak dapat dibatalkan dan data akan hilang permanen
              dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, Hapus Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
