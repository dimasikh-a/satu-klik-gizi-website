import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

interface WeightForLengthReference {
  gender: "P";
  height: number;
  minus3: number;
  minus2: number;
  minus1: number;
  median: number;
  plus1: number;
  plus2: number;
  plus3: number;
}

const PDF_PATH = path.join(
  process.cwd(),
  "sft-wfh-girls-z-2-5.pdf"
);

const OUTPUT_PATH = path.join(
  process.cwd(),
  "src",
  "engine",
  "data",
  "weight-for-height-girls.json"
);

async function main() {
  try {
    const buffer = fs.readFileSync(PDF_PATH);
    const result = await pdfParse(buffer);

    const lines = result.text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const data: WeightForLengthReference[] = [];

    for (const line of lines) {
      // Ambil hanya baris yang diawali angka tinggi badan (mis. 45.0)
      if (!/^\d+\.\d/.test(line)) continue;

      const cols = line.split(/\s+/);

      if (cols.length !== 8) continue;

      data.push({
        gender: "P",
        height: Number(cols[0]),
        minus3: Number(cols[1]),
        minus2: Number(cols[2]),
        minus1: Number(cols[3]),
        median: Number(cols[4]),
        plus1: Number(cols[5]),
        plus2: Number(cols[6]),
        plus3: Number(cols[7]),
      });
    }

    fs.writeFileSync(
      OUTPUT_PATH,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    console.log(`✅ Berhasil mengonversi ${data.length} data.`);
    console.log(`📁 Output: ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("❌ Gagal mengonversi PDF:", error);
  }
}

main();