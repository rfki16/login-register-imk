
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F5F9] md:flex md:items-center md:justify-center md:px-6 md:py-10">
  <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-4 pb-4 md:mx-0 md:max-w-5xl md:flex-row md:px-0 md:py-0">

        {/* Panel branding */}
        <section className="flex flex-col gap-3 rounded-t-2xl bg-[#243767] px-5 py-3 text-white md:w-[42%] md:justify-between md:gap-10 md:rounded-l-2xl md:rounded-tr-none md:px-10 md:py-10">
          <h1 className="text-2xl font-bold">
            IMK Login
          </h1>

          <div>
            <h2 className="mb-1 text-lg font-bold md:mb-4 md:text-4xl">
              Selamat Datang Kembali
            </h2>

            <p className="text-xs leading-snug text-white/80 md:text-lg">
              Masuk ke akun kamu untuk melanjutkan
              aktivitas dengan aman dan mudah.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Proyek Interaksi Manusia dan Komputer
          </p>
        </section>

        {/* Form login */}
        <section className="flex flex-1 items-center justify-center rounded-b-2xl bg-white px-6 py-8 shadow-sm md:w-[58%] md:rounded-r-2xl md:rounded-bl-none md:px-10 md:py-10">
          <div className="w-full">
            <h2 className="mb-2 text-3xl font-bold text-[#243767]">
              Login
            </h2>

            <p className="mb-8 text-sm text-gray-500">
              Masukkan email dan password kamu.
            </p>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#243767] px-4 py-3 font-semibold text-white transition hover:bg-[#1b294d] focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="font-semibold text-[#243767] hover:underline"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
