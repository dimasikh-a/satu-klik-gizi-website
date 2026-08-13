export function getRecommendationColor(
  kategori: string
) {
  switch (kategori) {
    case "Berat Badan Sangat Kurang (Severely Wasted)":
      return "bg-red-100 text-red-700";

    case "Berat Badan Kurang (Wasted)":
      return "bg-orange-100 text-orange-700";

    case "Berat Badan Normal (Normal)":
      return "bg-green-100 text-green-700";

    case "Risiko Berat Badan Lebih (Overweight/Obesitas)":
      return "bg-purple-100 text-purple-700";

    case "Sangat Pendek (Severely Stunted)":
      return "bg-red-100 text-red-700";

    case "Pendek (Stunted)":
      return "bg-orange-100 text-orange-700";

    case "Normal (Tinggi Badan Normal)":
      return "bg-green-100 text-green-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}