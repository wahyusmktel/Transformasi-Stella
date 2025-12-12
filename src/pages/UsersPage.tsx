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
  Search,
  Eye,
  Trash2,
  Edit,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Tambahan
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Untuk Modal Edit
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Untuk Alert Hapus
import { Badge } from "@/components/ui/badge";

// Tipe Data
export type UserData = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

export default function UsersPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  
  // State Data
  const [tableData, setTableData] = React.useState<UserData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isProcessLoading, setIsProcessLoading] = React.useState(false); // Loading saat simpan/hapus

  // --- STATE UNTUK MODALS ---
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({ id: "", name: "", email: "" });

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);


  // --- 1. FETCH DATA ---
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users");
      setTableData(response.data);
    } catch (error) {
      console.error("Gagal ambil data users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);


  // --- 2. HANDLER EDIT ---
  const openEditModal = (user: UserData) => {
    setEditData({ id: user.id, name: user.name, email: user.email });
    setIsEditOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessLoading(true);
    try {
        await api.put(`/users/${editData.id}`, {
            name: editData.name,
            email: editData.email
        });
        alert("User berhasil diperbarui!");
        setIsEditOpen(false);
        fetchData(); // Refresh tabel
    } catch (error) {
        console.error(error);
        alert("Gagal update user.");
    } finally {
        setIsProcessLoading(false);
    }
  };

  // --- 3. HANDLER DELETE ---
  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  }

  const handleDeleteUser = async () => {
    if(!deleteId) return;
    setIsProcessLoading(true);
    try {
        await api.delete(`/users/${deleteId}`);
        setIsDeleteOpen(false);
        fetchData(); // Refresh tabel
    } catch (error) {
        console.error(error);
        alert("Gagal menghapus user.");
    } finally {
        setIsProcessLoading(false);
    }
  };


  // --- DEFINISI KOLOM ---
  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nama User <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold ml-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase text-slate-500">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role Access",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        let badgeColor = "bg-slate-100 text-slate-600 border-slate-200";
        if (role.toLowerCase().includes("admin")) badgeColor = "bg-red-50 text-red-600 border-red-200";
        else if (role.toLowerCase().includes("guru")) badgeColor = "bg-blue-50 text-blue-600 border-blue-200";
        else if (role.toLowerCase().includes("siswa")) badgeColor = "bg-green-50 text-green-600 border-green-200";

        return <Badge variant="outline" className={`capitalize ${badgeColor}`}>{role}</Badge>;
      },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const isActive = status === "Active";
          return (
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className="text-sm font-medium text-slate-600">{status}</span>
            </div>
          );
        },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                Copy User ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {/* TOMBOL EDIT */}
              <DropdownMenuItem onClick={() => openEditModal(user)} className="gap-2 cursor-pointer">
                 <Edit className="w-4 h-4"/> Edit Data
              </DropdownMenuItem>
              
              {/* TOMBOL DELETE */}
              <DropdownMenuItem onClick={() => openDeleteModal(user.id)} className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer font-medium">
                 <Trash2 className="w-4 h-4"/> Hapus User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="w-full space-y-6">
       {/* Header Page */}
       <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Management Users</h2>
            <p className="text-muted-foreground">Kelola data pengguna sistem disini.</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
             <Plus className="mr-2 h-4 w-4" /> Add New User
          </Button>
       </div>

      {/* Toolbar Table */}
      <div className="flex items-center justify-between py-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
            placeholder="Cari nama user..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="pl-9 h-10 bg-slate-50 border-slate-200"
            />
        </div>
        {/* Column Toggle (Optional) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                    {column.id}
                </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Content */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
                Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}><TableCell colSpan={columns.length} className="h-16"><div className="h-4 bg-slate-100 rounded animate-pulse w-full"></div></TableCell></TableRow>
                ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-slate-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>

      {/* --- MODAL EDIT USER --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update nama dan email pengguna.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name" 
                    value={editData.name} 
                    onChange={(e) => setEditData({...editData, name: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={editData.email} 
                    onChange={(e) => setEditData({...editData, email: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isProcessLoading}>
                  {isProcessLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Perubahan
                </Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- MODAL ALERT DELETE --- */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
             <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <AlertDialogTitle>Hapus Pengguna?</AlertDialogTitle>
             </div>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction 
                onClick={(e) => {
                    e.preventDefault(); // Mencegah tutup otomatis biar loading kelihatan
                    handleDeleteUser();
                }} 
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isProcessLoading}
            >
               {isProcessLoading ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}