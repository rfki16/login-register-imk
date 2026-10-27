
"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestSupabase() {
  const [status, setStatus] = useState("Belum diuji");

  async function testConnection() {
    setStatus("Sedang menguji...");

    try {
      const { error } = await supabase.auth.getSession();

      if (error) {
        setStatus(`Gagal: ${error.message}`);
        return;
      }

      setStatus("Client berhasil berkomunikasi dengan Supabase Auth.");
    } catch {
      setStatus("Gagal menghubungi Supabase. Periksa URL dan koneksi internet.");
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F5F9] p-8 text-[#243767]">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-3 text-2xl font-bold">
          Tes Koneksi Supabase
        </h1>

        <p className="mb-5 text-sm text-gray-600">
          Halaman sementara untuk memeriksa komunikasi aplikasi dengan Supabase Auth.
        </p>

        <button
          onClick={testConnection}
          className="rounded-lg bg-[#243767] px-5 py-3 font-semibold text-white"
        >
          Uji Koneksi
        </button>

        <p role="status" className="mt-5 text-sm">
          Status: {status}
        </p>
      </div>
    </main>
  );
}
