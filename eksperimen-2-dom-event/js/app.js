'use strict';
const judulUtama = document.querySelector('#judul-utama');
const status = document.querySelector('#status');
const namaInput = document.querySelector('#nama');
const jumlahKarakter =
 document.querySelector('#jumlah-karakter');
const tombolUbahJudul =
 document.querySelector('#ubah-judul');
const tombolToggleStatus =
 document.querySelector('#toggle-status');
console.log({
 judulUtama,
 status,
 namaInput,
 jumlahKarakter,
 tombolUbahJudul,
 tombolToggleStatus
});

tombolUbahJudul.addEventListener('click', () => {
 judulUtama.textContent = 'DOM Berhasil Diubah';
 status.textContent = 'Teks heading berhasil diubah.';
});

tombolToggleStatus.addEventListener('click', () => {
 const aktif = document.body.classList.toggle('is-active');
 tombolToggleStatus.setAttribute(
 'aria-pressed',
 String(aktif)
 );
 status.textContent = aktif
 ? 'Mode aktif dinyalakan.'
 : 'Mode aktif dimatikan.';
});

namaInput.addEventListener('input', (event) => {
 const jumlah = event.target.value.length;
 jumlahKarakter.textContent = jumlah;
});

