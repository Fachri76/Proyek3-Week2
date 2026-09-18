'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  const response = await fetch('data/materi.json');

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

function renderMateri(data) {
  daftar.replaceChildren();

  for (const item of data) {
    const article = document.createElement('article');
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');

    article.classList.add('kartu');

    heading.textContent = item.judul;
    paragraph.textContent = `Durasi: ${item.durasi} menit`;

    article.append(heading, paragraph);
    daftar.append(article);
  }
}

async function muatData() {
  if (tombolMuat.disabled) {
    return;
  }

  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    const data = await ambilMateri();

    if (!Array.isArray(data)) {
      throw new Error('Format data bukan array.');
    }

    if (data.length === 0) {
      aturState('empty', 'Data materi kosong.');
      return;
    }

    renderMateri(data);

    aturState(
      'success',
      `${data.length} materi berhasil dimuat.`
    );
  } catch (error) {
    console.error(error);

    aturState(
      'error',
      `Gagal memuat data: ${error.message}`
    );
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);