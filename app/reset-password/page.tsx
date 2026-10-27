"use client";

import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isRecoverySession, setIsRecoverySession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isRecovery = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" && session) {
        isRecovery = true;
        setIsRecoverySession(true);
      }
    });

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isRecovery && !data.session) {
        setIsRecoverySession(false);
      }

      setIsCheckingSession(false);
    };

    void checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isRecoverySession) {
      setError(
        "Sesi pemulihan tidak valid. Silakan minta tautan pemulihan baru.",
      );
      return;
    }
    setError("");
    setSuccess(false);

    if (password.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama.");
      return;
    }

    setIsLoading(true);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session || !isRecoverySession) {
        setError(
          "Sesi pemulihan tidak valid atau sudah berakhir. Silakan minta tautan baru.",
        );
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      await supabase.auth.signOut();
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
          <h1 className="text-2xl font-bold text-[#243767]">
            Buat Password Baru
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Masukkan password baru untuk akun kamu. Gunakan minimal 8 karakter.
          </p>
        </div>

        {isCheckingSession ? (
          <p className="text-sm text-gray-600">Memeriksa tautan pemulihan...</p>
        ) : success ? (
          <div>
            <p
              role="status"
              className="rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-700"
            >
              Password berhasil diperbarui. Silakan login menggunakan password
              baru kamu.
            </p>

            <Link
              href="/"
              className="mt-5 block w-full rounded-lg bg-[#243767] px-4 py-3 text-center font-medium text-white transition hover:bg-[#1b2950]"
            >
              Kembali ke Login
            </Link>
          </div>
        ) : isRecoverySession ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password Baru
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-[#243767]"
                >
                  {showPassword ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Konfirmasi Password Baru
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Masukkan ulang password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-[#243767] focus:ring-2 focus:ring-[#243767]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Sembunyikan konfirmasi password"
                      : "Tampilkan konfirmasi password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-[#243767]"
                >
                  {showConfirmPassword ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm leading-6 text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-[#243767] px-4 py-3 font-medium text-white transition hover:bg-[#1b2950] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Memperbarui..." : "Simpan Password Baru"}
            </button>
          </form>
        ) : (
          <div>
            <p className="text-sm leading-6 text-red-600">
              Tautan pemulihan tidak valid, sudah digunakan, atau telah
              kedaluwarsa. Silakan minta tautan baru.
            </p>

            <Link
              href="/forgot-password"
              className="mt-5 block rounded-lg bg-[#243767] px-4 py-3 text-center font-medium text-white hover:bg-[#1b2950]"
            >
              Minta Tautan Baru
            </Link>
          </div>
        )}

        {!success && (
          <p className="mt-6 text-center text-sm text-gray-600">
            Ingat password?{" "}
            <Link
              href="/"
              className="font-semibold text-[#243767] hover:underline"
            >
              Kembali ke Login
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
