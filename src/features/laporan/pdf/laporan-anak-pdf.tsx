import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const COLUMN_WIDTH = `${100 / 13}%`;

const TABLE_HEADERS = [
  "No",
  "No KK",
  "Nama Ibu",
  "NIK Anak",
  "Nama Anak",
  "BB Lahir",
  "TB Lahir",
  "Tgl Periksa",
  "TB",
  "BB",
  "TB/U",
  "BB/U",
  "Hasil Gizi",
];

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  section: {
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    marginBottom: 4,
  },

  label: {
    width: 110,
    fontWeight: "bold",
  },

  value: {
    flex: 1,
  },

  table: {
    borderWidth: 1,
    borderColor: "#000",
  },

  tableRow: {
    flexDirection: "row",
  },

  headerCell: {
    width: COLUMN_WIDTH,
    padding: 4,
    textAlign: "center",
    fontSize: 8,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },

  cell: {
    width: COLUMN_WIDTH,
    padding: 4,
    textAlign: "center",
    fontSize: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
});

type Props = {
  balita: any;
};

export default function LaporanAnakPDF({
  balita,
}: Props) {
  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
      >
        {/* TITLE */}

        <Text style={styles.title}>
          FORMULIR PEMANTAUAN
        </Text>

        <Text style={styles.subtitle}>
          PERTUMBUHAN BALITA
        </Text>

        {/* INFORMASI */}

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Nama Anak
            </Text>

            <Text style={styles.value}>
              : {balita.namaanak}
            </Text>

            <Text style={styles.label}>
              No. KK
            </Text>

            <Text style={styles.value}>
              : {balita.orang_tua.nokk}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              NIK Anak
            </Text>

            <Text style={styles.value}>
              : {balita.nik_anak}
            </Text>

            <Text style={styles.label}>
              Nama Ibu
            </Text>

            <Text style={styles.value}>
              : {balita.orang_tua.nama_ibu}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Tahun
            </Text>

            <Text style={styles.value}>
              : {new Date().getFullYear()}
            </Text>
          </View>
        </View>

        {/* TABLE */}

        <View style={styles.table}>
          {/* HEADER */}

          <View style={styles.tableRow}>
            {TABLE_HEADERS.map((header) => (
              <Text
                key={header}
                style={styles.headerCell}
              >
                {header}
              </Text>
            ))}
          </View>

          {/* DATA */}

          {balita.pemeriksaan.map(
            (
              item: any,
              index: number
            ) => (
              <View
                key={item.idperiksa}
                style={styles.tableRow}
              >
                <Text style={styles.cell}>
                  {index + 1}
                </Text>

                <Text style={styles.cell}>
                  {balita.orang_tua.nokk}
                </Text>

                <Text style={styles.cell}>
                  {balita.orang_tua.nama_ibu}
                </Text>

                <Text style={styles.cell}>
                  {balita.nik_anak}
                </Text>

                <Text style={styles.cell}>
                  {balita.namaanak}
                </Text>

                <Text style={styles.cell}>
                  {balita.bblahir ?? "-"}
                </Text>

                <Text style={styles.cell}>
                  {balita.tblahir ?? "-"}
                </Text>

                <Text style={styles.cell}>
                  {new Date(
                    item.tglperiksa
                  ).toLocaleDateString("id-ID")}
                </Text>

                <Text style={styles.cell}>
                  {item.tb}
                </Text>

                <Text style={styles.cell}>
                  {item.bb}
                </Text>

                <Text style={styles.cell}>
                  {item.statustb ?? "-"}
                </Text>

                <Text style={styles.cell}>
                  {item.statusbb ?? "-"}
                </Text>

                <Text style={styles.cell}>
                  {item.hasilgizi ?? "-"}
                </Text>
              </View>
            )
          )}
        </View>
      </Page>
    </Document>
  );
}