import { redirect } from "next/navigation";
import { getSession } from "./auth";

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requirePKK() {
  const session = await requireAuth();

  if (session.status !== "PKK") {
    redirect("/unauthorized");
  }

  return session;
}
export async function requireADMIN() {
  const session = await requireAuth();

  if (session.status !== "ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireNakes() {
  const session = await requireAuth();

  if (session.status !== "NAKES") {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireOrangTua() {
  const session = await requireAuth();

  if (session.status !== "ORANG_TUA") {
    redirect("/unauthorized");
  }

  return session;
}