import { redirect } from "next/navigation";

import { getSession } from "./auth";

import {
  PAGE,
  ACTION,
  Page,
  Action,
  getPermission,
} from "@/lib/permission";

export async function authorize(
  page: Page,
  action: Action = ACTION.VIEW
) {
  const session = await getSession();
  console.log("SESSION:", session);

  if (!session) {
    redirect("/login");
  }

  const permission = getPermission(
    session.status
  );

  if (page === PAGE.DASHBOARD) {
    if (!permission.dashboard) {
      redirect("/unauthorized");
    }

    return session;
  }

  const pagePermission =
    permission[
      page as keyof typeof permission
    ];

  if (
    typeof pagePermission !== "object" ||
    !pagePermission[action]
  ) {
    redirect("/unauthorized");
  }

  return session;
}