"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Jika email terdaftar, instruksi pemulihan password akan dikirim. Silakan periksa kotak masuk email kamu.",
      );
    } catch {
      setError("Terjadi kesalahan koneksi. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F5F9] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#243767]">Lupa Password?</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Masukkan email yang kamu gunakan saat mendaftar. Kami akan
            mengirimkan instruksi untuk membuat password baru.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#243767] px-4 py-3 font-medium text-white transition hover:bg-[#1b2950] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {isLoading ? "Mengirim..." : "Kirim Instruksi"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ingat password?{" "}
          <Link
            href="/"
            className="font-semibold text-[#243767] hover:underline"
          >
            Kembali ke Login
          </Link>
        </p>
      </section>
    </main>
  );
}
