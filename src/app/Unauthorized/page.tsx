export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Akses Ditolak
        </h1>

        <p className="mt-2 text-gray-500">
          Anda tidak memiliki izin untuk
          mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}