"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Home() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    // 1. Validasi input
    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (!password) {
      setError("Password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(
          "Login gagal. Periksa kembali email dan password kamu, atau pastikan email sudah diverifikasi.",
        );
        return;
      }

      window.location.href = "/dashboard";
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
      <div className="mx-auto flex w-full max-w-md flex-col px-4 pt-4 pb-4 md:mx-0 md:max-w-5xl md:flex-row md:px-0 md:py-0">
        {/* Panel branding */}
        <section className="flex flex-col gap-3 rounded-t-2xl bg-[#243767] px-5 py-3 text-white md:w-[42%] md:justify-between md:gap-10 md:rounded-l-2xl md:rounded-tr-none md:px-10 md:py-10">
          <h1 className="text-2xl font-bold">IMK Login</h1>

          <div>
            <h2 className="mb-1 text-lg font-bold md:mb-4 md:text-4xl">
              Selamat Datang Kembali
            </h2>

            <p className="text-xs leading-snug text-white/80 md:text-lg">
              Masuk ke akun kamu untuk melanjutkan aktivitas dengan aman dan
              mudah.
            </p>
          </div>

          <p className="text-sm text-white/60">
            Proyek Interaksi Manusia dan Komputer
          </p>
        </section>

        {/* Form login */}
        <section className="flex flex-1 items-center justify-center rounded-b-2xl bg-white px-6 py-8 shadow-sm md:w-[58%] md:rounded-r-2xl md:rounded-bl-none md:px-10 md:py-10">
          <div className="w-full">
            <h2 className="mb-2 text-3xl font-bold text-[#243767]">Login</h2>

            <p className="mb-8 text-sm text-gray-500">
              Masukkan email dan password kamu.
            </p>

            <form onSubmit={handleLogin}>
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

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
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
              {error && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-5 w-full rounded-lg bg-[#243767] px-4 py-3 font-semibold text-white transition hover:bg-[#1b294d] focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Memproses..." : "Masuk"}
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
