export interface ReportPemeriksaan {
  idperiksa: number;

  tglperiksa: Date;

  bb: number;

  tb: number;

  statusbb: string | null;

  statustb: string | null;

  hasilgizi: string | null;

  umur_bulan: number;
}

export interface ReportOrangTua {
  nokk: string;

  nama_ayah: string | null;

  nama_ibu: string;
}

export interface ReportBalita {
  idbalita: number;

  nik_anak: string | null;

  namaanak: string;

  jeniskelamin: string;

  tanggallahir: Date;

  bblahir: number | null;

  tblahir: number | null;

  orang_tua: ReportOrangTua;

  pemeriksaan: ReportPemeriksaan[];
}

export interface ReportActionState {
  success?: string;

  error?: string;

  data?: ReportBalita;
}