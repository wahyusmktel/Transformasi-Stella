import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                // SEKARANG PRISMA SUDAH KENAL INI (Setelah langkah 1 & 2)
                model_has_roles: {
                    include: {
                        roles: true
                    }
                }
            }
        });

        const formattedUsers = users.map((user: any) => { // Tambahkan :any sementara biar aman
            // Ambil nama role dengan safety check (?.)
            const roleData = user.model_has_roles?.[0]?.roles;
            const roleName = roleData?.name || "User";
            
            return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                role: roleName, 
                status: user.email_verified_at ? "Active" : "Pending",
                lastLogin: user.updated_at || new Date()
            };
        });

        return res.status(200).json(formattedUsers);

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Gagal mengambil data user" });
    }
};

// --- 1. FITUR UPDATE USER ---
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body; // Kita update Name & Email dulu

        // Update data di database
        const updatedUser = await prisma.users.update({
            where: { id: BigInt(id) }, // Ingat konversi BigInt
            data: {
                name: name,
                email: email,
                // updated_at: new Date() // Prisma biasanya otomatis, tapi bisa manual
            }
        });

        // Konversi BigInt ke String untuk response
        const responseData = {
            ...updatedUser,
            id: updatedUser.id.toString()
        };

        return res.status(200).json({ message: "User berhasil diupdate", data: responseData });

    } catch (error) {
        console.error("Error update user:", error);
        return res.status(500).json({ message: "Gagal mengupdate user" });
    }
};

// --- 2. FITUR DELETE USER ---
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Hapus user berdasarkan ID
        await prisma.users.delete({
            where: { id: BigInt(id) }
        });

        return res.status(200).json({ message: "User berhasil dihapus" });

    } catch (error) {
        console.error("Error delete user:", error);
        return res.status(500).json({ message: "Gagal menghapus user" });
    }
};