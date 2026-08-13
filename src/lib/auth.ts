import { cookies } from "next/headers";

export type SessionData = {
  userId: number;
  nama: string;
  status: string;
};

const SESSION_NAME = "session";

export async function createSession(
  userId: number,
  nama: string,
  status: string
) {
  const cookieStore = await cookies();

  const session: SessionData = {
    userId,
    nama,
    status,
  };

  cookieStore.set(
    SESSION_NAME,
    JSON.stringify(session),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    }
  );
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get(SESSION_NAME);

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value) as SessionData;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_NAME);
}