"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  { nama: "Bakso Telur", kategori: "Bakso", harga: 15000, stok: 30, unggulan: false},
  { nama: "Bakso Urat", kategori: "Bakso", harga: 19000, stok: 100, unggulan: true},
  { nama: "Bakso Keju", kategori: "Bakso", harga: 16000, stok: 0, unggulan: false},
  { nama: "Mie Ayam Biasa", kategori: "Mie Ayam", harga: 12000, stok: 100, unggulan: false},
  { nama: "Mie Ayam Ceker", kategori: "Mie Ayam", harga: 15000, stok: 50, unggulan: false},
  { nama: "Mie Ayam bakso", kategori: "Mie Ayam", harga: 15000, stok: 20, unggulan: true},
  { nama: "Mie Ayam Ceker + Bakso", kategori: "Mie Ayam", harga: 17000, stok: 10, unggulan: false},
  { nama: "Soto Tauto", kategori: "Soto", harga: 12000, stok: 40, unggulan: false},
  { nama: "Soto Semarang", kategori: "Soto", harga: 12000, stok: 9, unggulan: true},
];
console.table(produkUmkm);

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}
console.log(formatRupiah(85000));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 10) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}
console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia: ${produkTersedia.map((produk) => produk.nama).join(", ")}`;

  unggulan.textContent = produkUnggulan
    ? `Produk unggulan hari ini: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";
  
  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);
