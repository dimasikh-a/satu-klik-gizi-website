import { calculateWeightForHeight } from "../engine/indicators/weight-for-height";

const result = calculateWeightForHeight({
  gender: "Laki-laki",
  umurBulan: 36,
  tinggi: 90,
  berat: 13,
});

console.log(result);