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

const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}
renderProduk();

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(title, category, price, stock, removeButton);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

const removeButton = document.createElement("button");
removeButton.type = "button";
removeButton.textContent = "Sembunyikan";
removeButton.classList.add("ghost-button");

removeButton.addEventListener("click", () => {
  card.remove();
  produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
});

card.append(removeButton);