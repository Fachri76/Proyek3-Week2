'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  let pesanNama = '';
  let pesanProdi = '';

  if (calon.nama.trim().length < 3) {
    pesanNama = 'Nama minimal 3 karakter.';
  }

  if (calon.prodi === '') {
    pesanProdi = 'Program studi wajib dipilih.';
  }

  return {
    valid: pesanNama === '' && pesanProdi === '',
    errorNama: pesanNama,
    errorProdi: pesanProdi
  };
}

function buatKartuPeserta(item) {
  const article = document.createElement('article');
  const heading = document.createElement('h2');
  const paragraph = document.createElement('p');

  article.classList.add('kartu');

  heading.textContent = item.nama;
  paragraph.textContent = item.prodi;

  article.append(heading, paragraph);

  return article;
}

function renderPeserta(data) {
  daftar.replaceChildren();

  if (data.length === 0) {
    status.textContent = 'Tidak ada peserta';
    return;
  }

  for (const item of data) {
    daftar.append(buatKartuPeserta(item));
  }

  status.textContent = `${data.length} peserta ditampilkan.`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value.trim(),
    prodi: prodiInput.value
  };

  const hasilValidasi = validasiPeserta(calon);

  errorNama.textContent = hasilValidasi.errorNama;
  errorProdi.textContent = hasilValidasi.errorProdi;

  namaInput.setAttribute(
    'aria-invalid',
    String(Boolean(hasilValidasi.errorNama))
  );

  prodiInput.setAttribute(
    'aria-invalid',
    String(Boolean(hasilValidasi.errorProdi))
  );

  if (!hasilValidasi.valid) {
    status.textContent = 'Periksa kembali data peserta.';
    return;
  }

  const pesertaBaru = {
    id: Date.now(),
    nama: calon.nama,
    prodi: calon.prodi
  };

  peserta.push(pesertaBaru);

  form.reset();

  errorNama.textContent = '';
  errorProdi.textContent = '';

  namaInput.setAttribute('aria-invalid', 'false');
  prodiInput.setAttribute('aria-invalid', 'false');

  filterInput.value = 'semua';

  renderPeserta(peserta);

  status.textContent = 'Peserta berhasil ditambahkan.';
});

filterInput.addEventListener('change', () => {
  if (filterInput.value === 'semua') {
    renderPeserta(peserta);
    return;
  }

  const hasilFilter = peserta.filter(
    (item) => item.prodi === filterInput.value
  );

  renderPeserta(hasilFilter);
});

renderPeserta(peserta);