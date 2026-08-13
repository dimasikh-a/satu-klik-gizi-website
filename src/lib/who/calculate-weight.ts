import weightForAge from "@/data/who/weight-for-age.json";

type Gender = "Laki-laki" | "Perempuan";

export function calculateWeightStatus(
  gender: Gender,
  age: number,
  weight: number
) {
  const whoGender =
    gender === "Laki-laki"
      ? "Pria"
      : "Perempuan";

  const reference = (weightForAge as any[]).filter(
    (item) =>
      item["Jenis Kelamin"] === whoGender &&
      Number(item["Months"]) === age
  );

  if (!reference.length) {
    throw new Error(
      `Referensi BB/U tidak ditemukan.
Gender: ${whoGender}
Umur: ${age}`
    );
  }

  const sdMap: Record<string, number> = {};

  reference.forEach((item) => {
    const key = item["Keterangan SD"]
      .replace(/\s/g, "")
      .toLowerCase();

    sdMap[key] = Number(item["Nilai"]);
  });

  const minus3 = sdMap["-3sd"];
  const minus2 = sdMap["-2sd"];
  const plus1 = sdMap["1sd"];

  let hasilAnalisis = "";
  let rekomendasi = "";

  if (weight < minus3) {
    hasilAnalisis =
      "Berat Badan Sangat Kurang (Severely Wasted)";

    rekomendasi =
      "Segera rujuk ke Puskesmas atau fasilitas kesehatan. Berikan ASI (jika masih menyusu), makanan tinggi energi dan protein sesuai usia, pantau berat badan setiap minggu, dan ikuti terapi gizi sesuai anjuran tenaga kesehatan. Jika balita tampak lemas, tidak mau makan, muntah, diare berat, atau demam, segera mendapatkan penanganan medis.";
  }

  else if (weight < minus2) {
    hasilAnalisis =
      "Berat Badan Kurang (Wasted)";

    rekomendasi =
      "Tingkatkan asupan energi, protein, vitamin, dan mineral melalui makanan bergizi seimbang. Berikan makanan utama dan camilan bergizi sesuai usia, lanjutkan ASI bila masih menyusu, lakukan pemantauan berat badan setiap bulan, dan konsultasikan ke tenaga kesehatan apabila berat badan tidak meningkat.";
  }

  else if (weight <= plus1) {
    hasilAnalisis =
      "Berat Badan Normal (Normal)";

    rekomendasi =
      "Pertahankan pola makan bergizi seimbang, berikan variasi makanan sesuai usia, lanjutkan ASI bila masih menyusu, lakukan imunisasi dan pemantauan pertumbuhan secara rutin di Posyandu setiap bulan, serta terapkan pola hidup bersih dan sehat.";
  }

  else {
    hasilAnalisis =
      "Risiko Berat Badan Lebih (Overweight/Obesitas)";

    rekomendasi =
      "Atur pola makan dengan gizi seimbang, batasi makanan tinggi gula, garam, dan lemak, kurangi minuman manis, tingkatkan aktivitas fisik sesuai usia (minimal 60 menit/hari untuk anak yang sudah aktif), batasi waktu layar (screen time), dan konsultasikan ke tenaga kesehatan bila berat badan terus meningkat.";
  }

  return {
    indikator: "BB",
    hasilAnalisis,
    rekomendasi,
  };
}