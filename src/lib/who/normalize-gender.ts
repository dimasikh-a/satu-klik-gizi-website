export function normalizeGender(
  gender: string
): "L" | "P" {

  console.log("Normalize Gender :", gender);

  const value = gender
    .trim()
    .toLowerCase();

  switch (value) {

    case "l":
    case "laki-laki":
    case "laki - laki":
    case "lakilaki":
      return "L";

    case "p":
    case "perempuan":
      return "P";

    default:
      throw new Error(
        `Gender tidak dikenali : ${gender}`
      );
  }
}