export enum WeightForAgeStatus {
  VERY_UNDERWEIGHT = "Berat Badan Sangat Kurang",
  UNDERWEIGHT = "Berat Badan Kurang",
  NORMAL = "Berat Badan Normal",
  RISK_OVERWEIGHT = "Risiko Berat Badan Lebih",
}

export enum LengthForAgeStatus {
  VERY_SHORT = "Sangat Pendek",
  SHORT = "Pendek",
  NORMAL = "Normal",
  TALL = "Tinggi",
}

export interface WHOWeightForHeightReference {
  gender: "L" | "P";

  height: number;

  minus3: number;
  minus2: number;
  minus1: number;
  median: number;
  plus1: number;
  plus2: number;
  plus3: number;
}