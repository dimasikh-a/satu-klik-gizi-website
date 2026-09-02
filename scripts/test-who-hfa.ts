import { whoService } from "../engine/services/who.service";

console.log("=================================");
console.log("TEST WHO HEIGHT-FOR-AGE");
console.log("=================================");

const tests = [
  {
    gender: "L",
    umur: 25,
  },
  {
    gender: "L",
    umur: 40,
  },
  {
    gender: "L",
    umur: 57,
  },
  {
    gender: "L",
    umur: 60,
  },
  {
    gender: "P",
    umur: 25,
  },
  {
    gender: "P",
    umur: 40,
  },
  {
    gender: "P",
    umur: 57,
  },
  {
    gender: "P",
    umur: 60,
  },
];

for (const test of tests) {
  const result = whoService.getHeightReference(
    test.gender,
    test.umur
  );

  console.log("\nTest:", test);

  if (result) {
    console.log("✅ FOUND");
    console.log(result);
  } else {
    console.log("❌ NOT FOUND");
  }
}