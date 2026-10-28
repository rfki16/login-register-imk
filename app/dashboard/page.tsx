"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (error || !data.user) {
          router.replace("/");
          return;
        }

        setEmail(data.user.email ?? "");
        setChecking(false);
      } catch {
        if (isMounted) {
          router.replace("/");
        }
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleLogout() {
    setErrorMessage("");
    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage("Gagal logout. Silakan coba kembali.");
        setIsLoggingOut(false);
        return;
      }

      router.replace("/");
    } catch {
      setErrorMessage("Terjadi masalah koneksi. Silakan coba kembali.");
      setIsLoggingOut(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F3F5F9] p-8">
        <p className="text-gray-600" role="status" aria-live="polite">
          Memeriksa sesi login...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F5F9] p-4 sm:p-8">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-[#243767]">Dashboard</h1>

        <p className="mt-3 text-gray-600">
          Selamat datang! Kamu login sebagai {email}.
        </p>

        {errorMessage && (
          <p
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#243767] px-5 py-3 font-semibold text-white transition hover:bg-[#1b294d] focus:outline-none focus:ring-2 focus:ring-[#243767]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoggingOut ? "Keluar..." : "Logout"}
        </button>
      </section>
    </main>
  );
}
