"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/");
        return;
      }

      setEmail(data.user.email ?? "");
      setChecking(false);
    }

    checkSession();
  }, [router]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Gagal logout. Silakan coba kembali.");
      return;
    }

    router.replace("/");
  }

  if (checking) {
    return <main className="p-8">Memeriksa sesi login...</main>;
  }

  return (
    <main className="min-h-screen bg-[#F3F5F9] p-8">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#243767]">Dashboard</h1>

        <p className="mt-3 text-gray-600">
          Selamat datang! Kamu login sebagai {email}.
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 rounded-lg bg-[#243767] px-5 py-3 text-white"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
