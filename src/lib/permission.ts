
export const ROLE = {
  ADMIN: "Admin",
  Posyandu: "Posyandu",
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
} as const;

export type Page =
  (typeof PAGE)[keyof typeof PAGE];

export type Action =
  (typeof ACTION)[keyof typeof ACTION];
export const PERMISSION = {
  [ROLE.ADMIN]: {
    dashboard: true,

    user: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    balita: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    parent: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    pemeriksaan: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    rekomendasi: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    kegiatan: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    laporan: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },

  [ROLE.Posyandu]: {
    dashboard: true,

    user: false,

    balita: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    parent: {
      view: true,
      create: true,
      update: true,
      delete: false,
    },

    pemeriksaan: {
      view: true,
      create: true,
      update: true,
      delete: false,
    },

    rekomendasi: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },

    kegiatan: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
    }
  },

  [ROLE.NAKES]: {
    dashboard: true,

    user: false,

    balita: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },

    parent: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },

    pemeriksaan: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },

    rekomendasi: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },

    kegiatan: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },
    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
    }
  },

  [ROLE.ORANG_TUA]: {
    dashboard: false,

    user: false,

    balita: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },

    parent: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },

    pemeriksaan: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },

    rekomendasi: {
      view: false,
      create: false,
      update: false,
      delete: false,
    },

    kegiatan: {
      view: true,
      create: false,
      update: false,
      delete: false,
    },
    laporan: {
      view: false,
      create: false,
      update: false,
      delete: false,
    }
  },
} as const;

export function getPermission(status: string) {
  console.log("STATUS:", status);
  return (
    PERMISSION[
      status as keyof typeof PERMISSION
    ] ??
    PERMISSION[ROLE.ORANG_TUA]
  );
}
