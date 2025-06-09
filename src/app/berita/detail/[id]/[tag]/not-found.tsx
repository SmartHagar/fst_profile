/** @format */

import Link from "next/link";
import { FileX, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-error/10 rounded-full mb-4">
            <FileX className="w-10 h-10 text-error" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Berita Tidak Ditemukan</h1>
          <p className="text-base-content/70">
            Maaf, berita yang Anda cari tidak ditemukan atau mungkin telah
            dihapus.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/berita" className="btn btn-primary btn-block gap-2">
            <ArrowLeft size={16} />
            Kembali ke Daftar Berita
          </Link>

          <Link href="/" className="btn btn-ghost btn-block gap-2">
            <Home size={16} />
            Ke Beranda
          </Link>
        </div>

        <div className="mt-8 text-sm text-base-content/60">
          <p>
            Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
