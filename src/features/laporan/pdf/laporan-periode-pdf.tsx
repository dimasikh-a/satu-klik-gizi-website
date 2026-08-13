import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

type Pemeriksaan = {
  idperiksa: number;
  idbalita: number;

  tglperiksa: string | Date;

  bb: number;
  tb: number;

  cara_pengukuran?: string | null;
  asi_eksklusif?: string | null;

  umur_bulan: number;

  balita: {
    nokk: string;
    nik_anak?: string | null;
    namaanak: string;
    tanggallahir: string | Date;

    jeniskelamin: string;

    bblahir?: number | null;
    tblahir?: number | null;

    anakke?: number | null;
    imd?: boolean | null;
    buku_kia?: boolean | null;

    orang_tua: {
      nik_ayah?: string | null;
      nama_ayah?: string | null;
      no_telp_hp: string;
      alamat: string;
      rt: string;
      rw: string;
    };
  };
};

type Props = {
  data: Pemeriksaan[];
  bulan: number;
  tahun: number;
};

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 6,
    fontFamily: "Helvetica",
  },

  title: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },

  periode: {
    textAlign: "center",
    fontSize: 8,
    marginBottom: 12,
  },

  table: {
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#000",
  },

  row: {
    flexDirection: "row",
    width: "100%",
  },

  headerRow: {
    backgroundColor: "#E5E7EB",
  },

  cell: {
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    padding: 2,
    textAlign: "center",
    fontSize: 5,
    minHeight: 22,
    justifyContent: "center",
  },

  headerCell: {
    fontWeight: "bold",
    fontSize: 4.5,
    lineHeight: 1.1,
  },

  textLeft: {
    textAlign: "left",
  },
});

/**
 * Konversi boolean menjadi format
 * yang digunakan pada formulir:
 *
 * 1 = Ya
 * 2 = Tidak
 */
function yesNo(value?: boolean | null) {
  if (value === true) return "1";
  if (value === false) return "2";

  return "-";
}

/**
 * Ambil status ASI berdasarkan bulan.
 *
 * Database:
 * "0,1,2,3"
 *
 * Maka:
 * umur 0  -> 1
 * umur 1  -> 1
 * umur 2  -> 1
 * umur 3  -> 1
 * umur 4  -> 2
 * umur 5  -> 2
 */
function asiStatus(
  value: string | null | undefined,
  bulan: number
) {
  if (!value) return "-";

  const monthsChecked = value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => !Number.isNaN(item));

  return monthsChecked.includes(bulan) ? "1" : "2";
}

function formatDate(
  value?: string | Date | null
) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("id-ID");
}

function formatNumber(
  value?: number | null
) {
  if (value === null || value === undefined) {
    return "-";
  }

  return String(value);
}

function formatGender(
  gender?: string | null
) {
  if (!gender) return "-";

  const normalized = gender.toLowerCase();

  if (
    normalized === "l" ||
    normalized === "laki-laki" ||
    normalized === "laki laki" ||
    normalized === "male"
  ) {
    return "L";
  }

  if (
    normalized === "p" ||
    normalized === "perempuan" ||
    normalized === "female"
  ) {
    return "P";
  }

  return gender;
}

export default function LaporanPeriodePDF({
  data,
  bulan,
  tahun,
}: Props) {
  const namaBulan =
    months[bulan - 1] ?? "-";

  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <Text style={styles.title}>
          FORM PEMANTAUAN PERTUMBUHAN BALITA POSYANDU
        </Text>

        <Text style={styles.periode}>
          Periode {namaBulan} {tahun}
        </Text>

        {/* ========================= */}
        {/* TABLE */}
        {/* ========================= */}

        <View style={styles.table}>
          {/* HEADER */}

          <View
            style={[
              styles.row,
              styles.headerRow,
            ]}
          >
            <HeaderCell width="2.5%">
              No
            </HeaderCell>

            <HeaderCell width="3%">
              Anak
              {"\n"}
              Ke
            </HeaderCell>

            <HeaderCell width="4%">
              Tanggal
              {"\n"}
              Lahir
            </HeaderCell>

            <HeaderCell width="2.8%">
              Jenis
              {"\n"}
              Kelamin
            </HeaderCell>

            <HeaderCell width="5%">
              No Kartu
              {"\n"}
              Keluarga
            </HeaderCell>

            <HeaderCell width="5%">
              NIK
            </HeaderCell>

            <HeaderCell width="5%">
              Nama
              {"\n"}
              Anak
            </HeaderCell>

            <HeaderCell width="3.5%">
              BB
              {"\n"}
              Lahir
            </HeaderCell>

            <HeaderCell width="3.5%">
              PB
              {"\n"}
              Lahir
            </HeaderCell>

            <HeaderCell width="3%">
              Buku
              {"\n"}
              KIA
            </HeaderCell>

            <HeaderCell width="2.5%">
              IMD
            </HeaderCell>

            <HeaderCell width="5%">
              Nama
              {"\n"}
              Ayah
            </HeaderCell>

            <HeaderCell width="5%">
              NIK
              {"\n"}
              Ayah
            </HeaderCell>

            <HeaderCell width="5%">
              No. Telp/
              {"\n"}
              HP Ayah
            </HeaderCell>

            <HeaderCell width="7%">
              Alamat
            </HeaderCell>

            <HeaderCell width="2.5%">
              RT
            </HeaderCell>

            <HeaderCell width="2.5%">
              RW
            </HeaderCell>

            <HeaderCell width="4.5%">
              Tgl.
              {"\n"}
              Pengukuran
            </HeaderCell>

            <HeaderCell width="3.5%">
              BB
              {"\n"}
              (kg)
            </HeaderCell>

            <HeaderCell width="4.5%">
              PB/TB
              {"\n"}
              (cm)
            </HeaderCell>

            <HeaderCell width="4%">
              Cara
              {"\n"}
              Ukur
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              0 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              1 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              2 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              3 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              4 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              ASI
              {"\n"}
              5 bln
            </HeaderCell>

            <HeaderCell width="2.5%">
              Vit A
            </HeaderCell>

            <HeaderCell width="2.5%">
              Vit A
            </HeaderCell>

            <HeaderCell width="3%">
              Umur
            </HeaderCell>

            <HeaderCell width="3%">
              Balita
              {"\n"}
              &gt;5 tahun
            </HeaderCell>
          </View>

          {/* DATA */}

          {data.map((item, index) => {
            const balita = item.balita;
            const orangTua =
              balita.orang_tua;

            const umurLebih5 =
              item.umur_bulan > 60;

            return (
              <View
                key={item.idperiksa}
                style={styles.row}
              >
                <DataCell width="2.5%">
                  {index + 1}
                </DataCell>

                <DataCell width="3%">
                  {formatNumber(
                    balita.anakke
                  )}
                </DataCell>

                <DataCell width="4%">
                  {formatDate(
                    balita.tanggallahir
                  )}
                </DataCell>

                <DataCell width="2.8%">
                  {formatGender(
                    balita.jeniskelamin
                  )}
                </DataCell>

                <DataCell width="5%">
                  {balita.nokk}
                </DataCell>

                <DataCell width="5%">
                  {balita.nik_anak ?? "-"}
                </DataCell>

                <DataCell
                  width="5%"
                  left
                >
                  {balita.namaanak}
                </DataCell>

                <DataCell width="3.5%">
                  {formatNumber(
                    balita.bblahir
                  )}
                </DataCell>

                <DataCell width="3.5%">
                  {formatNumber(
                    balita.tblahir
                  )}
                </DataCell>

                <DataCell width="3%">
                  {yesNo(
                    balita.buku_kia
                  )}
                </DataCell>

                <DataCell width="2.5%">
                  {yesNo(balita.imd)}
                </DataCell>

                <DataCell
                  width="5%"
                  left
                >
                  {orangTua.nama_ayah ??
                    "-"}
                </DataCell>

                <DataCell width="5%">
                  {orangTua.nik_ayah ??
                    "-"}
                </DataCell>

                <DataCell width="5%">
                  {orangTua.no_telp_hp}
                </DataCell>

                <DataCell
                  width="7%"
                  left
                >
                  {orangTua.alamat}
                </DataCell>

                <DataCell width="2.5%">
                  {orangTua.rt}
                </DataCell>

                <DataCell width="2.5%">
                  {orangTua.rw}
                </DataCell>

                <DataCell width="4.5%">
                  {formatDate(
                    item.tglperiksa
                  )}
                </DataCell>

                <DataCell width="3.5%">
                  {item.bb}
                </DataCell>

                <DataCell width="4.5%">
                  {item.tb}
                </DataCell>

                <DataCell
                  width="4%"
                  left
                >
                  {item.cara_pengukuran ??
                    "-"}
                </DataCell>

                {/* ASI 0 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    0
                  )}
                </DataCell>

                {/* ASI 1 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    1
                  )}
                </DataCell>

                {/* ASI 2 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    2
                  )}
                </DataCell>

                {/* ASI 3 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    3
                  )}
                </DataCell>

                {/* ASI 4 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    4
                  )}
                </DataCell>

                {/* ASI 5 BULAN */}
                <DataCell width="2.5%">
                  {asiStatus(
                    item.asi_eksklusif,
                    5
                  )}
                </DataCell>

                {/* VIT A */}
                <DataCell width="2.5%">
                  -
                </DataCell>

                <DataCell width="2.5%">
                  -
                </DataCell>

                {/* UMUR */}
                <DataCell width="3%">
                  {item.umur_bulan}
                </DataCell>

                {/* BALITA > 5 TAHUN */}
                <DataCell width="3%">
                  {umurLebih5 ? "1" : "2"}
                </DataCell>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

/* ================================= */
/* HEADER CELL                       */
/* ================================= */

function HeaderCell({
  children,
  width,
}: {
  children: React.ReactNode;
  width: string;
}) {
  return (
    <Text
      style={{
        ...styles.cell,
        ...styles.headerCell,
        width,
      }}
    >
      {children}
    </Text>
  );
}

/* ================================= */
/* DATA CELL                         */
/* ================================= */

function DataCell({
  children,
  width,
  left = false,
}: {
  children: React.ReactNode;
  width: string;
  left?: boolean;
}) {
  return (
    <Text
      style={{
        ...styles.cell,
        width,
        ...(left
          ? styles.textLeft
          : {}),
      }}
    >
      {children}
    </Text>
  );
}