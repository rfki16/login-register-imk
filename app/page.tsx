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

  async function handleGoogleLogin() {
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError("Login dengan Google belum berhasil. Silakan coba kembali.");
        setIsLoading(false);
      }
    } catch {
      setError(
        "Terjadi masalah koneksi. Periksa internet kamu, lalu coba kembali.",
      );
      setIsLoading(false);
    }
  }

  async function handleFacebookLogin() {
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError("Login dengan Facebook belum berhasil. Silakan coba kembali.");
        setIsLoading(false);
      }
    } catch {
      setError(
        "Terjadi masalah koneksi. Periksa internet kamu, lalu coba kembali.",
      );
      setIsLoading(false);
    }
  }

  async function handleGithubLogin() {
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError("Login dengan GitHub belum berhasil. Silakan coba kembali.");
        setIsLoading(false);
      }
    } catch {
      setError(
        "Terjadi masalah koneksi. Periksa internet kamu, lalu coba kembali.",
      );
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

              <div className="my-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-500">atau</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M43.6 24.5c0-1.4-.1-2.9-.4-4.3H24v8.1h11a9.4 9.4 0 0 1-4.1 6.2l6.6 5.1c3.9-3.6 6.1-8.9 6.1-15.1Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 44c5.5 0 10.2-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4l-6.8 5.2A20.4 20.4 0 0 0 24 44Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12.6 27.7a12.3 12.3 0 0 1 0-7.4l-6.8-5.2a20.1 20.1 0 0 0 0 17.8l6.8-5.2Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 11.9c3 0 5.7 1 7.8 3l5.8-5.8C34.1 5.9 29.4 4 24 4A20.4 20.4 0 0 0 5.8 15.1l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
                  />
                </svg>

                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                  aria-hidden="true"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.93-1.956 1.884v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>

                <span>Continue with Facebook</span>
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22v3.3c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z"
                  />
                </svg>

                <span>Continue with GitHub</span>
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
