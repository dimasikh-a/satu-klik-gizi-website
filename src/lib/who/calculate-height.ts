import heightForAge from "@/data/who/height-for-age.json";

type Gender = "Laki-laki" | "Perempuan";

export function calculateHeightStatus(
  gender: Gender,
  age: number,
  height: number
) {
  const reference = (heightForAge as any[]).filter(
    (item) =>
      item["Jenis Kelamin"] === gender &&
      Number(item["Months"]) === age
  );

  if (!reference.length) {
    throw new Error(
      `Referensi TB/U tidak ditemukan.
Gender: ${gender}
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
  const plus3 = sdMap["3sd"];

  let hasilAnalisis = "";
  let rekomendasi = "";

  if (height < minus3) {
    hasilAnalisis =
      "Sangat Pendek (Severely Stunted)";

    rekomendasi =
      "Segera konsultasikan ke Puskesmas untuk pemeriksaan lebih lanjut. Tingkatkan konsumsi makanan kaya protein hewani (telur, ikan, ayam, daging), sayur, buah, dan sumber zat besi. Pastikan imunisasi lengkap, cegah infeksi, perhatikan kebersihan lingkungan, dan lakukan pemantauan pertumbuhan secara rutin.";
  }

  else if (height < minus2) {
    hasilAnalisis =
      "Pendek (Stunted)";

    rekomendasi =
      "Tingkatkan kualitas asupan gizi terutama protein hewani, susu sesuai kebutuhan, sayur, dan buah. Berikan makanan dengan frekuensi dan porsi sesuai usia, lakukan stimulasi tumbuh kembang, pantau tinggi badan secara berkala, dan konsultasikan ke tenaga kesehatan bila pertumbuhan tidak membaik.";
  }

  else if (height <= plus3) {
    hasilAnalisis =
      "Normal";

    rekomendasi =
      "Pertahankan pola makan bergizi seimbang, aktivitas fisik yang cukup, tidur yang berkualitas, serta pemantauan pertumbuhan dan perkembangan secara rutin di Posyandu.";
  }

  else {
    hasilAnalisis =
      "Tinggi";

    rekomendasi =
      "Kondisi ini umumnya bukan masalah apabila sesuai dengan faktor genetik dan perkembangan anak. Tetap pertahankan pola makan seimbang, aktivitas fisik yang cukup, dan lakukan pemantauan pertumbuhan secara berkala. Konsultasikan ke tenaga kesehatan apabila tinggi badan disertai gangguan pertumbuhan atau kelainan hormonal.";
  }

  return {
    indikator: "TB",
    hasilAnalisis,
    rekomendasi,
  };
}