/**
 * generate-license.js
 * Tool internal untuk Trisna — JANGAN disertakan ke pembeli.
 *
 * Cara pakai:
 *   node generate-license.js "Nama Usaha Pembeli"
 *
 * Kode yang dihasilkan harus dimasukkan oleh pembeli persis sama dengan
 * Nama Usaha yang mereka isi di tab "Profil Usaha" pada NotaKilat.html.
 *
 * PENTING: SECRET_SALT di bawah ini HARUS SAMA PERSIS dengan yang ada
 * di dalam NotaKilat.html. Ganti nilainya sebelum mulai berjualan,
 * lalu jangan diubah lagi setelah ada pembeli (kalau diubah, lisensi
 * lama tidak akan valid lagi).
 */

const SECRET_SALT = "notakilat-trisna-2026"; // harus identik dengan di NotaKilat.html
const APP_PREFIX = "NOTA";

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateLicense(businessName) {
  const clean = businessName.trim().toUpperCase();
  const h = simpleHash(clean + SECRET_SALT).toString(36).toUpperCase().padStart(8, "0");
  return `${APP_PREFIX}-${h.slice(0, 4)}-${h.slice(4, 8)}`;
}

// --- jalankan dari command line ---
const name = process.argv.slice(2).join(" ");
if (!name) {
  console.log("Cara pakai: node generate-license.js \"Nama Usaha Pembeli\"");
  process.exit(1);
}

console.log("Nama Usaha :", name);
console.log("Kode Lisensi:", generateLicense(name));
