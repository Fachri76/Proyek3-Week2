'use strict';

const status = document.querySelector('#status');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const profilElement = document.querySelector('#profil');
const namaProfil = document.querySelector('#nama-profil');
const prodiProfil = document.querySelector('#prodi-profil');
const bioProfil = document.querySelector('#bio-profil');
const tombolDetail = document.querySelector('#toggle-detail');
const detail = document.querySelector('#detail');
const tombolTema = document.querySelector('#toggle-tema');
const daftarSkill = document.querySelector('#daftar-skill');
const formSkill = document.querySelector('#form-skill');
const skillInput = document.querySelector('#skill');
const errorSkill = document.querySelector('#error-skill');

let skills = [];
let sedangMemuat = false;

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;

  tombolCobaLagi.hidden = state !== 'error';
}
function renderSkills() {
  daftarSkill.replaceChildren();

  if (skills.length === 0) {
    const pesan = document.createElement('li');
    pesan.textContent = 'Belum ada keterampilan.';
    daftarSkill.append(pesan);
    return;
  }

  for (const skill of skills) {
    const item = document.createElement('li');
    const teks = document.createElement('span');
    const tombolHapus = document.createElement('button');

    item.classList.add('skill-item');
    teks.textContent = skill;
    tombolHapus.type = 'button';
    tombolHapus.textContent = 'Hapus';

    tombolHapus.addEventListener('click', () => {
      skills = skills.filter(
        (itemSkill) => itemSkill !== skill
      );

      renderSkills();
    });

    item.append(teks, tombolHapus);
    daftarSkill.append(item);
  }
}

function renderProfil(data) {
  namaProfil.textContent = data.nama;
  prodiProfil.textContent = data.programStudi;
  bioProfil.textContent = data.bio;

  skills = Array.isArray(data.keterampilan)
    ? [...data.keterampilan]
    : [];

  renderSkills();

  profilElement.hidden = false;
}

async function ambilProfil() {
  const response = await fetch('data/profile.json');

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function muatProfil() {
  if (sedangMemuat) {
    return;
  }

  sedangMemuat = true;

  profilElement.hidden = true;

  aturState(
    'loading',
    'Memuat profil...'
  );

  try {
    const data = await ambilProfil();

    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data) ||
      Object.keys(data).length === 0
    ) {
      aturState(
        'empty',
        'Data profil kosong.'
      );

      return;
    }

    renderProfil(data);

    aturState(
      'success',
      'Profil berhasil dimuat.'
    );
  } catch (error) {
    console.error(error);

    aturState(
      'error',
      `Gagal memuat profil: ${error.message}`
    );
  } finally {
    sedangMemuat = false;
  }
}

tombolCobaLagi.addEventListener(
  'click',
  muatProfil
);

tombolDetail.addEventListener('click', () => {
  const terbuka =
    detail.classList.toggle('terbuka');

  tombolDetail.setAttribute(
    'aria-expanded',
    String(terbuka)
  );

  tombolDetail.textContent = terbuka
    ? 'Tutup Detail'
    : 'Lihat Detail';
});

tombolTema.addEventListener('click', () => {
  document.body.classList.toggle(
    'dark-theme'
  );
});

formSkill.addEventListener('submit', (event) => {
  event.preventDefault();

  const skillBaru = skillInput.value.trim();

  if (skillBaru === '') {
    errorSkill.textContent =
      'Keterampilan tidak boleh kosong.';

    return;
  }

  errorSkill.textContent = '';

  skills.push(skillBaru);

  skillInput.value = '';

  renderSkills();
});

muatProfil();