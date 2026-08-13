"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function loginAction(
  prevState: any,
  formData: FormData
) {
  const telepon = formData
    .get("notelp")
    ?.toString()
    .trim();

  const password = formData
    .get("password")
    ?.toString();

  if (!telepon || !password) {
    return {
      error: "Nomor telepon dan password wajib diisi",
    };
  }

  const user = await db.users.findFirst({
    where: {
      no_telp_hp: telepon,
      is_active: true,
    },
  });

  if (!user) {
    return {
      error: "User tidak ditemukan",
    };
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return {
      error: "Password salah",
    };
  }

  await createSession(
    user.id_user,
    user.nama_user,
    user.status
  );

  redirect("/admin/dashboard");
}