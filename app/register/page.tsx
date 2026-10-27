"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    // 1. Validasi input
    if (!name) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      // 2. Tangani error dari Supabase
      if (error) {
        const message = error.message.toLowerCase();

        if (
          message.includes("rate limit") ||
          message.includes("too many requests")
        ) {
          setError(
            "Permintaan email terlalu sering. Silakan tunggu beberapa saat sebelum mencoba kembali.",
          );
        } else if (message.includes("invalid email")) {
          setError("Format email tidak valid. Periksa kembali email kamu.");
        } else if (message.includes("password")) {
          setError(
            "Password belum memenuhi persyaratan. Periksa kembali password kamu.",
          );
        } else if (
          message.includes("already registered") ||
          message.includes("already exists")
        ) {
          setError(
            "Email mungkin sudah terdaftar. Coba login atau gunakan fitur lupa password.",
          );
        } else {
          setError(
            "Registrasi belum berhasil. Silakan coba kembali beberapa saat lagi.",
          );
        }

        return;
      }

      // 3. Tangani hasil registrasi
      if (data.user && !data.session) {
        setSuccess(
          "Permintaan registrasi berhasil. Silakan periksa email untuk mengonfirmasi akun.",
        );
      } else if (data.user && data.session) {
        setSuccess("Registrasi berhasil. Akun kamu sudah siap digunakan.");
      } else {
        setError(
          "Status registrasi belum dapat dipastikan. Silakan coba login atau periksa kembali nanti.",
        );
      }
    } catch {
      setError(
        "Terjadi masalah koneksi. Periksa internet kamu, lalu coba kembali.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F5F9] md:flex md:items-center md:justify-center md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-4 pb-4 md:max-w-5xl md:flex-row md:px-0 md:py-0">
        {/* Panel branding */}
        <section className="flex flex-col gap-3 rounded-t-2xl bg-[#243767] px-5 py-3 text-white md:w-[42%] md:justify-between md:gap-10 md:rounded-l-2xl md:rounded-tr-none md:px-10 md:py-10">
          <h1 className="text-2xl font-bold">IMK Login</h1>

          <div>
            <h2 className="mb-1 text-lg font-bold md:mb-4 md:text-4xl">
              Bergabung Bersama Kami
            </h2>

            <p className="text-xs leading-snug text-white/80 md:text-lg">
              Buat akun baru untuk mulai menggunakan aplikasi dengan aman dan
              mudah.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Proyek Interaksi Manusia dan Komputer
          </p>
        </section>

        {/* Form registrasi */}
        <section className="flex flex-1 items-center justify-center rounded-b-2xl bg-white px-6 py-8 shadow-sm md:w-[58%] md:rounded-r-2xl md:rounded-bl-none md:px-10 md:py-10">
          <div className="w-full">
            <h2 className="mb-2 text-3xl font-bold text-[#243767]">
              Buat Akun
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Lengkapi data berikut untuk mendaftar.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {success}
                </p>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nama Lengkap
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                />
              </div>

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

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-[#243767]"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-4 4.8" />
                        <path d="M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a10.6 10.6 0 0 0 4-.8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Konfirmasi Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Masukkan ulang password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan konfirmasi password"
                        : "Tampilkan konfirmasi password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-[#243767]"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-4 4.8" />
                        <path d="M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a10.6 10.6 0 0 0 4-.8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#243767] px-4 py-3 font-semibold text-white transition hover:bg-[#1b294d] focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-5 w-5 shrink-0 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  "Daftar"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a
                href="/"
                className="font-semibold text-[#243767] hover:underline"
              >
                Login sekarang
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
