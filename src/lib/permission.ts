export const ROLE = {
  ADMIN: "Admin",
  POSYANDU: "Posyandu",
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
  LAPORAN: "laporan",
} as const;

export const ACTION = {
  VIEW: "view",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  RECOMMENDATION: "recommendation",
} as const;

export type Page =
  (typeof PAGE)[keyof typeof PAGE];

export type Action =
  (typeof ACTION)[keyof typeof ACTION];


// ============================================================
// PERMISSION TYPE
// ============================================================

type PagePermission = {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  recommendation: boolean;
};


// ============================================================
// PERMISSION
// ============================================================

export const PERMISSION = {

  // ============================================================
  // ADMIN
  // ============================================================

  [ROLE.ADMIN]: {
    dashboard: true,

    user: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    balita: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    parent: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    pemeriksaan: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: true,
    },

    rekomendasi: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    kegiatan: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    laporan: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },
  },


  // ============================================================
  // POSYANDU
  // ============================================================

  [ROLE.POSYANDU]: {
    dashboard: true,

    user: false,

    balita: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    parent: {
      view: true,
      create: true,
      update: true,
      delete: false,
      recommendation: false,
    },

    pemeriksaan: {
      view: true,
      create: true,
      update: true,
      delete: false,
      recommendation: false,
    },

    rekomendasi: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    kegiatan: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },
  },


  // ============================================================
  // NAKES
  // ============================================================

  [ROLE.NAKES]: {
    dashboard: true,

    user: false,

    balita: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    parent: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    pemeriksaan: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: true,
    },

    rekomendasi: {
      view: true,
      create: true,
      update: true,
      delete: true,
      recommendation: false,
    },

    kegiatan: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },
  },


  // ============================================================
  // ORANG TUA
  // ============================================================

  [ROLE.ORANG_TUA]: {
    dashboard: false,

    user: false,

    balita: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    parent: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    pemeriksaan: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    rekomendasi: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    kegiatan: {
      view: true,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },

    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
      recommendation: false,
    },
  },

} satisfies Record<
  string,
  {
    dashboard: boolean;

    user: false | PagePermission;
    balita: PagePermission;
    parent: PagePermission;
    pemeriksaan: PagePermission;
    rekomendasi: PagePermission;
    kegiatan: PagePermission;
    laporan: PagePermission;
  }
>;


// ============================================================
// GET PERMISSION
// ============================================================

export function getPermission(status: string) {
  console.log("STATUS:", status);

  return (
    PERMISSION[
      status as keyof typeof PERMISSION
    ] ?? PERMISSION[ROLE.ORANG_TUA]
  );
}