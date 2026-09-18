'use strict';
const tombolMuat = document.querySelector('#muat-data');
const status = document.querySelector('#status');
const daftarFitur = document.querySelector('#daftar-fitur');
function tampilkanState(state, pesan) {
 status.dataset.state = state;
 status.textContent = pesan;
}
function buatKartu(item) {
 const article = document.createElement('article');
 const heading = document.createElement('h2');
 const description = document.createElement('p');
 article.classList.add('feature-card');
 heading.textContent = item.judul;
 description.textContent = item.deskripsi;
 article.append(heading, description);
 return article;
}
function renderFitur(items) {
 daftarFitur.textContent = '';
 for (const item of items) {
 daftarFitur.append(buatKartu(item));
 }
}


console.log('A: mulai');
setTimeout(() => {
 console.log('C: timer selesai');
}, 0);
console.log('B: akhir');