"use client";

export default function HomeSection() {
  return (
    <section className="flex flex-col md:flex-row md:gap-5 gap-3 md:pb-16 md:px-10 px-5 h-full  bg-white items-center xl:h-[700px]  pb-14 py-[170px]  w-full items-center">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-10">
      <div className="lg:w-full">
        <div className="flex md:hidden">
          <video controls className="w-full max-w-[450px] rounded-lg ">
            <source src="/video_1.mp4" type="video/mp4" />
          </video>
        </div>
        <h3 className="text-black font-bold md:text-4xl text-2xl text-teal-600 pt-7 md:pt-0">
          Selamat <span>Datang</span>
        </h3>
        <div className="md:w-[90%] lg:w-full">
          <p className="text-slate-600 md:text-lg text-base md:leading-9 leading-7 mt-4 lg:w-full text-justify lg:text-xl">
            Website resmi Posyandu Gurame Kelurahan Pamulang Timur Kecamatan
            Pamulang, Tangerang Selatan. Aplikasi ini membantu monitoring tumbuh
            kembang anak, pelayanan kesehatan ibu, serta mendukung kegiatan
            posyandu secara digital dan terintegrasi.
          </p>

          <p className="text-slate-600 md:text-lg text-base md:leading-9 leading-7 mt-2  lg:w-full text-justify lg:text-xl">
            Melalui platform Satu Klik Gizi, orang tua, tenaga kesehatan, ketua
            PKK, dan admin dapat memantau data kesehatan anak dengan lebih
            cepat, mudah, dan akurat.
          </p>
        </div>
      </div>
      <div className="hidden md:flex">
        <video controls className="w-full max-w-[450px] lg:max-w-full rounded-lg ">
          <source src="/video_1.mp4" type="video/mp4" />
        </video>
      </div>
      </div>
    </section>
  );
}
