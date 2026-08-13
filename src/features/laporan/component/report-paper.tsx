type ReportPaperProps = {
  children: React.ReactNode;
};

export default function ReportPaper({
  children,
}: ReportPaperProps) {
  return (
    <div className="flex justify-center">
      <div
        className="
          w-[210mm]
          min-h-[297mm]
          bg-white
          p-[20mm]
          shadow-xl
          border
          border-gray-300
        "
      >
        {children}
      </div>
    </div>
  );
}