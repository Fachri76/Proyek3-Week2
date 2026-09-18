'use strict';

const layanan = [
  {
    nama: 'Epic ke Legend',
    kategori: 'rank',
    harga: 'Mulai Rp40.000',
    deskripsi: 'Untuk pemain yang ingin naik dari Epic ke Legend.'
  },
  {
    nama: 'Legend ke Mythic',
    kategori: 'rank',
    harga: 'Mulai Rp75.000',
    deskripsi: 'Untuk pemain yang ingin melanjutkan rank sampai Mythic.'
  },
  {
    nama: 'Placement Rank',
    kategori: 'placement',
    harga: 'Mulai Rp25.000',
    deskripsi: 'Bantuan menyelesaikan pertandingan placement.'
  }
];

const tombolMenu = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');
const tombolTema = document.querySelector('#tema-toggle');

const filterLayanan = document.querySelector('#filter-layanan');
const daftarLayanan = document.querySelector('#daftar-layanan');
const statusLayanan = document.querySelector('#status-layanan');

const faqQuestions = document.querySelectorAll('.faq-question');

const formKontak = document.querySelector('#form-kontak');
const namaInput = document.querySelector('#nama');
const emailInput = document.querySelector('#email');
const pesanInput = document.querySelector('#pesan');

const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorPesan = document.querySelector('#error-pesan');
const statusForm = document.querySelector('#status-form');

const tombolKembaliAtas = document.querySelector('#kembali-atas');

function buatKartuLayanan(item) {
  const article = document.createElement('article');
  const heading = document.createElement('h3');
  const harga = document.createElement('p');
  const deskripsi = document.createElement('p');

  article.classList.add('box');

  heading.textContent = item.nama;
  harga.textContent = item.harga;
  harga.classList.add('harga');
  deskripsi.textContent = item.deskripsi;

  article.append(heading, harga, deskripsi);

  return article;
}

function renderLayanan(data) {
  daftarLayanan.replaceChildren();

  if (data.length === 0) {
    statusLayanan.textContent = 'Tidak ada layanan.';
    return;
  }

  for (const item of data) {
    daftarLayanan.append(buatKartuLayanan(item));
  }

  statusLayanan.textContent = `${data.length} layanan ditampilkan.`;
}

function tutupMenuMobile() {
  navMenu.classList.remove('is-open');
  tombolMenu.setAttribute('aria-expanded', 'false');
}

tombolMenu.addEventListener('click', () => {
  const terbuka = navMenu.classList.toggle('is-open');

  tombolMenu.setAttribute(
    'aria-expanded',
    String(terbuka)
  );
});

navMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    tutupMenuMobile();
  }
});

tombolTema.addEventListener('click', () => {
  const aktif = document.body.classList.toggle('dark-theme');

  tombolTema.setAttribute(
    'aria-pressed',
    String(aktif)
  );

  tombolTema.textContent = aktif
    ? 'Tema Terang'
    : 'Tema Gelap';
});

filterLayanan.addEventListener('change', () => {
  const pilihan = filterLayanan.value;

  if (pilihan === 'semua') {
    renderLayanan(layanan);
    return;
  }

  const hasil = layanan.filter(
    (item) => item.kategori === pilihan
  );

  renderLayanan(hasil);
});

for (const tombol of faqQuestions) {
  tombol.addEventListener('click', () => {
    const idJawaban = tombol.getAttribute('aria-controls');
    const jawabanAktif = document.querySelector(`#${idJawaban}`);
    const akanDibuka =
      tombol.getAttribute('aria-expanded') === 'false';

    for (const tombolLain of faqQuestions) {
      const idLain = tombolLain.getAttribute('aria-controls');
      const jawabanLain = document.querySelector(`#${idLain}`);

      tombolLain.setAttribute('aria-expanded', 'false');
      jawabanLain.hidden = true;
    }

    if (akanDibuka) {
      tombol.setAttribute('aria-expanded', 'true');
      jawabanAktif.hidden = false;
    }
  });
}

function validasiForm() {
  const nama = namaInput.value.trim();
  const email = emailInput.value.trim();
  const pesan = pesanInput.value.trim();

  let valid = true;

  errorNama.textContent = '';
  errorEmail.textContent = '';
  errorPesan.textContent = '';

  namaInput.setAttribute('aria-invalid', 'false');
  emailInput.setAttribute('aria-invalid', 'false');
  pesanInput.setAttribute('aria-invalid', 'false');

  if (nama.length < 3) {
    errorNama.textContent = 'Nama minimal 3 karakter.';
    namaInput.setAttribute('aria-invalid', 'true');
    valid = false;
  }

  if (email === '' || !email.includes('@')) {
    errorEmail.textContent = 'Email belum valid.';
    emailInput.setAttribute('aria-invalid', 'true');
    valid = false;
  }

  if (pesan.length < 5) {
    errorPesan.textContent = 'Pesan minimal 5 karakter.';
    pesanInput.setAttribute('aria-invalid', 'true');
    valid = false;
  }

  return valid;
}

formKontak.addEventListener('submit', (event) => {
  event.preventDefault();

  statusForm.textContent = '';

  if (!validasiForm()) {
    statusForm.textContent = 'Periksa kembali data yang diisi.';
    return;
  }

  statusForm.textContent = 'Pesan berhasil diperiksa dan siap dikirim.';
  formKontak.reset();

  namaInput.setAttribute('aria-invalid', 'false');
  emailInput.setAttribute('aria-invalid', 'false');
  pesanInput.setAttribute('aria-invalid', 'false');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    tombolKembaliAtas.classList.add('is-visible');
  } else {
    tombolKembaliAtas.classList.remove('is-visible');
  }
});

tombolKembaliAtas.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

renderLayanan(layanan);
