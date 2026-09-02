import { calculateLengthForAge } from "../engine/indicators/length-for-age";

const tests = [
  {
    nama: "Bayi 20 bulan - Terlentang",
    gender: "L",
    umur: 20,
    tinggi: 80,
    caraPengukuran: "Terlentang",
  },
  {
    nama: "Bayi 20 bulan - Berdiri",
    gender: "L",
    umur: 20,
    tinggi: 80,
    caraPengukuran: "Berdiri",
  },
  {
    nama: "Anak 40 bulan - Berdiri",
    gender: "L",
    umur: 40,
    tinggi: 100,
    caraPengukuran: "Berdiri",
  },
  {
    nama: "Anak 40 bulan - Terlentang",
    gender: "L",
    umur: 40,
    tinggi: 100,
    caraPengukuran: "Terlentang",
  },
  {
    nama: "Anak 57 bulan - Berdiri",
    gender: "L",
    umur: 57,
    tinggi: 105,
    caraPengukuran: "Berdiri",
  },
  {
    nama: "Anak perempuan 57 bulan - Berdiri",
    gender: "P",
    umur: 57,
    tinggi: 105,
    caraPengukuran: "Berdiri",
  },
];

console.log("=================================");
console.log("TEST ENGINE TB/U");
console.log("=================================");

for (const test of tests) {
  console.log("\n---------------------------------");
  console.log(test.nama);
  console.log("---------------------------------");

  try {
    const result = calculateLengthForAge({
      gender: test.gender,
      umur: test.umur,
      tinggi: test.tinggi,
      caraPengukuran: test.caraPengukuran,
    });

    console.log("Input:", {
      gender: test.gender,
      umur: test.umur,
      tinggi: test.tinggi,
      caraPengukuran: test.caraPengukuran,
    });

    console.log("STATUS TB/U:", result);
    console.log("✅ TEST BERHASIL");
  } catch (error) {
    console.error("❌ TEST GAGAL");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}