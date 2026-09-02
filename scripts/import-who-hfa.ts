import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

type Gender = "L" | "P";

interface WHOHeightReference {
  gender: Gender;
  umur: number;
  minus3: number;
  minus2: number;
  minus1: number;
  median: number;
  plus1: number;
  plus2: number;
  plus3: number;
}

const files: {
  file: string;
  gender: Gender;
}[] = [
  {
    file: "frontend/engine/data/length-boys.xlsx",
    gender: "L",
  },
  {
    file: "frontend/engine/data/length-girls.xlsx",
    gender: "P",
  },
];

const result: WHOHeightReference[] = [];

for (const item of files) {
  console.log("\n==============================");
  console.log(`FILE   : ${item.file}`);
  console.log(`GENDER : ${item.gender}`);
  console.log("==============================");

  const workbook = XLSX.readFile(item.file);

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<any>(sheet, {
      defval: null,
    });

    console.log(`Sheet: ${sheetName}`);
    console.log(`Jumlah row: ${rows.length}`);

    for (const row of rows) {
      const umur = Number(row.Month);

      // Hanya umur 24–60 bulan
      if (umur < 24 || umur > 60) {
        continue;
      }

      result.push({
        gender: item.gender,
        umur,
        minus3: Number(row.SD3neg),
        minus2: Number(row.SD2neg),
        minus1: Number(row.SD1neg),
        median: Number(row.SD0),
        plus1: Number(row.SD1),
        plus2: Number(row.SD2),
        plus3: Number(row.SD3),
      });
    }
  }
}

// Urutkan gender kemudian umur
result.sort((a, b) => {
  if (a.gender !== b.gender) {
    return a.gender === "L" ? -1 : 1;
  }

  return a.umur - b.umur;
});

// Validasi
const boys = result.filter((item) => item.gender === "L");
const girls = result.filter((item) => item.gender === "P");

console.log("\n==============================");
console.log("VALIDASI");
console.log("==============================");

console.log("Boys  :", boys.length);
console.log("Girls :", girls.length);
console.log("Total :", result.length);

console.log(
  "Boys umur:",
  boys[0]?.umur,
  "-",
  boys[boys.length - 1]?.umur
);

console.log(
  "Girls umur:",
  girls[0]?.umur,
  "-",
  girls[girls.length - 1]?.umur
);

// Validasi jumlah
if (boys.length !== 37) {
  throw new Error(
    `Jumlah data Boys tidak sesuai. Expected 37, got ${boys.length}`
  );
}

if (girls.length !== 37) {
  throw new Error(
    `Jumlah data Girls tidak sesuai. Expected 37, got ${girls.length}`
  );
}

if (result.length !== 74) {
  throw new Error(
    `Total data tidak sesuai. Expected 74, got ${result.length}`
  );
}

// Output
const outputFile = path.join(
  process.cwd(),
  "frontend/src/engine/data/height-for-age.json"
);

fs.mkdirSync(path.dirname(outputFile), {
  recursive: true,
});

fs.writeFileSync(
  outputFile,
  JSON.stringify(result, null, 2),
  "utf-8"
);

console.log("\n==============================");
console.log("SUCCESS");
console.log("==============================");

console.log("Output:");
console.log(outputFile);

console.log(`Total data: ${result.length}`);