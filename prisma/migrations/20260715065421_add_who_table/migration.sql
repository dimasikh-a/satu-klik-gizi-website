-- CreateTable
CREATE TABLE "who_weight_for_age" (
    "id" SERIAL NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "umur_bulan" INTEGER NOT NULL,
    "sd" TEXT NOT NULL,
    "nilai" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "who_weight_for_age_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "who_height_for_age" (
    "id" SERIAL NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "umur_bulan" INTEGER NOT NULL,
    "sd" TEXT NOT NULL,
    "nilai" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "who_height_for_age_pkey" PRIMARY KEY ("id")
);
