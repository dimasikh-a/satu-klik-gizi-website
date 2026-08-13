import * as XLSX from "xlsx";
import * as fs from "fs";

interface Row {
  "Jenis Kelamin": string;
  "Year:Month": string;
  Months: number;
  "Keterangan SD": string;
  Nilai: number;
}

interface WHOReference {
  gender: "L" | "P";
  umur: number;
  minus3?: number;
  minus2?: number;
  minus1?: number;
  median?: number;
  plus1?: number;
  plus2?: number;
  plus3?: number;
}

function normalizeGender(gender: string): "L" | "P" {
  const value = gender.trim().toLowerCase();

  if (
    [
      "pria",
      "laki-laki",
      "laki - laki",
      "lakilaki",
      "male",
      "l",
    ].includes(value)
  ) {
    return "L";
  }

  if (
    [
      "perempuan",
      "wanita",
      "female",
      "p",
    ].includes(value)
  ) {
    return "P";
  }

  throw new Error(`Gender tidak dikenali: ${gender}`);
}

function convertExcelToJson(
  inputFile: string,
  outputFile: string
) {
  const workbook = XLSX.readFile(inputFile);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json<Row>(sheet);

  const grouped: Record<string, WHOReference> = {};

  for (const row of rows) {
    const gender = normalizeGender(row["Jenis Kelamin"]);

    const umur = Number(row.Months);

    const key = `${gender}-${umur}`;

    if (!grouped[key]) {
      grouped[key] = {
        gender,
        umur,
      };
    }

    const nilai = Number(row.Nilai);

    switch (row["Keterangan SD"].trim()) {
      case "-3 SD":
        grouped[key].minus3 = nilai;
        break;

      case "-2 SD":
        grouped[key].minus2 = nilai;
        break;

      case "-1 SD":
        grouped[key].minus1 = nilai;
        break;

      case "Median":
        grouped[key].median = nilai;
        break;

      case "1 SD":
        grouped[key].plus1 = nilai;
        break;

      case "2 SD":
        grouped[key].plus2 = nilai;
        break;

      case "3 SD":
        grouped[key].plus3 = nilai;
        break;
    }
  }

  const result = Object.values(grouped).sort((a, b) => {
    if (a.gender !== b.gender) {
      return a.gender.localeCompare(b.gender);
    }

    return a.umur - b.umur;
  });

  fs.writeFileSync(
    outputFile,
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  const totalL = result.filter(
    (item) => item.gender === "L"
  ).length;

  const totalP = result.filter(
    (item) => item.gender === "P"
  ).length;

  console.log("================================");
  console.log(`📊 Total Data : ${result.length}`);
  console.log(`👦 Laki-laki : ${totalL}`);
  console.log(`👧 Perempuan : ${totalP}`);
  console.log(`📁 Output : ${outputFile}`);
  console.log("================================");
}

// ==============================
// BB/U
// ==============================

convertExcelToJson(
  "./WHO_Length_for_Age.xlsx",
  "./src/engine/data/length-for-age.json"
);

// ==============================
// TB/U
// Aktifkan jika ingin convert TB/U
// ==============================

// convertExcelToJson(
//   "./WHO_Length_for_Age.xlsx",
//   "./src/engine/data/length-for-age.json"
// );