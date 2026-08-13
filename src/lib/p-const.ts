export const ROLE = {
  ADMIN: "Admin",
  PKK: "PKK",
  NAKES: "Nakes",
  ORANG_TUA: "Orang Tua",
} as const;

export const PAGE = {
  DASHBOARD: "dashboard",
  USER: "user",
  BALITA: "balita",
  PARENT: "parent",
  PEMERIKSAAN: "pemeriksaan",
  REKOMENDASI: "rekomendasi",
  KEGIATAN: "kegiatan",
} as const;

export const ACTION = {
  VIEW: "view",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type Role =
  (typeof ROLE)[keyof typeof ROLE];

export type Page =
  (typeof PAGE)[keyof typeof PAGE];

export type Action =
  (typeof ACTION)[keyof typeof ACTION];