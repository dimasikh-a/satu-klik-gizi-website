-- CreateTable
CREATE TABLE "balita" (
    "idbalita" SERIAL NOT NULL,
    "id_orang_tua" INTEGER NOT NULL,
    "no_kia" TEXT NOT NULL,
    "nik_anak" TEXT,
    "namaanak" TEXT NOT NULL,
    "jeniskelamin" TEXT NOT NULL,
    "tanggallahir" DATE NOT NULL,
    "bblahir" DECIMAL(5,2),
    "tblahir" DECIMAL(5,2),
    "anakke" INTEGER,
    "imd" BOOLEAN,
    "buku_kia" BOOLEAN,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "balita_pkey" PRIMARY KEY ("idbalita")
);

-- CreateTable
CREATE TABLE "orang_tua" (
    "id_orang_tua" SERIAL NOT NULL,
    "id_user" INTEGER,
    "nokk" TEXT NOT NULL,
    "nik_ayah" TEXT,
    "nama_ayah" TEXT,
    "nik_ibu" TEXT NOT NULL,
    "nama_ibu" TEXT NOT NULL,
    "no_telp_hp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "rw" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "orang_tua_pkey" PRIMARY KEY ("id_orang_tua")
);

-- CreateTable
CREATE TABLE "pemeriksaan" (
    "idperiksa" SERIAL NOT NULL,
    "idbalita" INTEGER NOT NULL,
    "tglperiksa" DATE NOT NULL,
    "bb" DECIMAL(5,2) NOT NULL,
    "tb" DECIMAL(5,2) NOT NULL,
    "lingkarkepala" DECIMAL(5,2),
    "lingkarlengan" DECIMAL(5,2),
    "lingkarpaha" DECIMAL(5,2),
    "asi_eksklusif" BOOLEAN,
    "statusbb" TEXT,
    "statustb" TEXT,
    "hasilgizi" TEXT,
    "idrekomendasi" INTEGER,

    CONSTRAINT "pemeriksaan_pkey" PRIMARY KEY ("idperiksa")
);

-- CreateTable
CREATE TABLE "rekomendasi" (
    "idrekomendasi" SERIAL NOT NULL,
    "kategori" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "rekomendasi_pkey" PRIMARY KEY ("idrekomendasi")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "nama_user" TEXT NOT NULL,
    "no_telp_hp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "idkegiatan" SERIAL NOT NULL,
    "foto" VARCHAR(255),
    "tanggal_pelaksanaan" DATE NOT NULL,
    "jam" VARCHAR(10) NOT NULL,
    "tempat" VARCHAR(255) NOT NULL,
    "keterangan" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "judul_kegiatan" VARCHAR(150) NOT NULL,

    CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("idkegiatan")
);

-- CreateIndex
CREATE UNIQUE INDEX "balita_no_kia_key" ON "balita"("no_kia");

-- CreateIndex
CREATE UNIQUE INDEX "orang_tua_id_user_key" ON "orang_tua"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "orang_tua_nokk_key" ON "orang_tua"("nokk");

-- CreateIndex
CREATE UNIQUE INDEX "users_no_telp_hp_key" ON "users"("no_telp_hp");

-- AddForeignKey
ALTER TABLE "balita" ADD CONSTRAINT "balita_id_orang_tua_fkey" FOREIGN KEY ("id_orang_tua") REFERENCES "orang_tua"("id_orang_tua") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orang_tua" ADD CONSTRAINT "orang_tua_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemeriksaan" ADD CONSTRAINT "pemeriksaan_idbalita_fkey" FOREIGN KEY ("idbalita") REFERENCES "balita"("idbalita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pemeriksaan" ADD CONSTRAINT "pemeriksaan_idrekomendasi_fkey" FOREIGN KEY ("idrekomendasi") REFERENCES "rekomendasi"("idrekomendasi") ON DELETE SET NULL ON UPDATE CASCADE;
