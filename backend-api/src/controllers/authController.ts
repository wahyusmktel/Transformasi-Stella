import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        // 1. Cari user di database
        // PERHATIKAN: 'prisma.users'. Jika di schema.prisma namanya 'User', ganti jadi 'prisma.user'
        const user = await prisma.users.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ message: "Email tidak ditemukan" });
        }

        // 2. Cek Password (menggunakan bcrypt bawaan Laravel)
        // Laravel menggunakan bcrypt, jadi kita bisa cek pakai bcryptjs di sini.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password salah" });
        }

        // 3. Generate Token JWT
        const token = jwt.sign(
            { id: user.id.toString(), email: user.email }, // <--- UBAH DISINI
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        // 4. Kirim Respon Sukses
        return res.status(200).json({
            message: "Login Berhasil",
            token: token,
            user: {
                id: user.id.toString(), // <--- UBAH DISINI JUGA
                name: user.name,
                email: user.email,
                // roles: user.roles (jika ada)
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};