"use strict";

console.log("P09 JavaScript aktif");

const produkMakan = [
  { nama: "Bakso Telur", kategori: "Bakso", harga: 15000, stok: 30 },
  { nama: "Bakso Urat", kategori: "Bakso", harga: 19000, stok: 100 },
  { nama: "Bakso Keju", kategori: "Bakso", harga: 16000, stok: 0 },
  { nama: "Mie Ayam Biasa", kategori: "Mie Ayam", harga: 12000, stok: 100 },
  { nama: "Mie Ayam Ceker", kategori: "Mie Ayam", harga: 15000, stok: 50 },
  { nama: "Mie Ayam bakso", kategori: "Mie Ayam", harga: 15000, stok: 20 },
  { nama: "Mie Ayam Ceker + Bakso", kategori: "Mie Ayam", harga: 17000, stok: 10 },
  { nama: "Soto Tauto", kategori: "Soto", harga: 12000, stok: 40 },
  { nama: "Soto Semarang", kategori: "Soto", harga: 12000, stok: 9 },
];
console.table(produkMakan);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
console.log(formatRupiah.format(produkMakan[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 10) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Bakso":
      return "Produk bakso pilihan";
    case "Mie Ayam":
      return "Produk mie ayam pilihan";
    case "Soto":
      return "Produk soto pilihan";
    default:
      return "Produk UMKM";
  }
}

const labelAksi = produkMakan.stok > 0 ? "Siap dipesan" : "Hubungi admin";

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkMakan) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }
    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkMakan.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);