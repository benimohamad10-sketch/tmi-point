const API_URL = "PASTE_WEB_APP_URL_DISINI";
const STORAGE_KEY = "tmiPointStudent";

const KELAS_MATERI = {
  "X TMI": [
    "Kerja Bangku",
    "Keselamatan Kerja",
    "Pengukuran Teknik",
    "Pekakas Tangan",
    "Mesin Perkakas"
  ],
  "XI TMI": [
    "Kelistrikan Mesin Industri",
    "NCB",
    "Tombol ON/OFF",
    "Kontaktor",
    "Overload",
    "Rangkaian Kontrol Dasar",
    "Komponen Kelistrikan Mesin"
  ],
  "XII TMI": [
    "Proses Produksi",
    "Gambar Teknik Mesin",
    "CNC Dasar",
    "Kontrol Kualitas",
    "Proyek Akhir"
  ]
};

const KELAS_MISI = {
  "X TMI": [
    { id: "x1", name: "Identifikasi Alat Bengkel", points: 50, desc: "Mengenali alat dan fungsi kerja bangku" },
    { id: "x2", name: "Keselamatan Kerja", points: 75, desc: "Memahami SOP keselamatan di bengkel" },
    { id: "x3", name: "Baca Materi Teknik Mesin", points: 40, desc: "Membaca dan memahami materi dasar teknik mesin" },
    { id: "x4", name: "Pengukuran Teknik", points: 60, desc: "Melakukan pengukuran teknik dengan alat ukur" },
    { id: "x5", name: "Worksheet Kerja Bangku", points: 100, desc: "Menyelesaikan lembar kerja praktikum kerja bangku" }
  ],
  "XI TMI": [
    { id: "xi1", name: "Pengenalan NCB", points: 75, desc: "Memahami fungsi NCB pada rangkaian listrik" },
    { id: "xi2", name: "Instalasi Tombol ON/OFF", points: 80, desc: "Menyusun rangkaian saklar ON/OFF dengan benar" },
    { id: "xi3", name: "Pengenalan Kontaktor", points: 100, desc: "Mempelajari fungsi kontaktor dan terminalnya" },
    { id: "xi4", name: "Overload Safety Check", points: 100, desc: "Melakukan pengecekan overload pada rangkaian" },
    { id: "xi5", name: "Rangkaian Kontrol Dasar", points: 125, desc: "Menyusun rangkaian kontrol dasar mesin industri" }
  ],
  "XII TMI": [
    { id: "xii1", name: "Proses Produksi Industri", points: 125, desc: "Menjelaskan tahapan proses produksi industri" },
    { id: "xii2", name: "Membaca Gambar Teknik", points: 125, desc: "Membaca dan menafsirkan gambar teknik mesin" },
    { id: "xii3", name: "CNC Dasar", points: 150, desc: "Memahami dasar sistem CNC dan operasionalnya" },
    { id: "xii4", name: "Kontrol Kualitas", points: 100, desc: "Menganalisis hasil kerja berdasarkan kontrol kualitas" },
    { id: "xii5", name: "Proyek Akhir", points: 200, desc: "Menyelesaikan proyek akhir sesuai materi" }
  ]
};

const state = {
  student: null,
  submissions: [],
  ranking: []
};

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindAuthForm();
  bindLogout();
  initApp();
});

function bindNavigation() {
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetId = btn.getAttribute("data-target");
      document.querySelectorAll(".page-panel").forEach((panel) => panel.classList.add("hidden"));
      const target = document.getElementById(targetId);
      if (target) target.classList.remove("hidden");
    });
  });
}

function bindAuthForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nama: document.getElementById("nama").value.trim(),
      kelas: document.getElementById("kelas").value,
      absen: document.getElementById("absen").value.trim()
    };

    if (!data.nama || !data.kelas || !data.absen) {
      showToast("Semua data harus diisi.");
      return;
    }

    const result = await apiPost({
      action: "registerStudent",
      nama: data.nama,
      kelas: data.kelas,
      absen: data.absen
    });

    if (!result.ok) {
      showToast(result.message || "Gagal mendaftar siswa.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      nama: data.nama,
      kelas: data.kelas,
      absen: data.absen
    }));

    state.student = {
      Nama: data.nama,
      Kelas: data.kelas,
      Absen: data.absen
    };

    showToast("Berhasil masuk ke dashboard!");
    initApp();
  });
}

function bindLogout() {
  const btn = document.getElementById("logoutBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state.student = null;
    state.submissions = [];
    state.ranking = [];

    document.getElementById("authView").classList.remove("hidden");
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("registerForm").reset();
  });
}

function initApp() {
  const student = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (!student) {
    document.getElementById("authView").classList.remove("hidden");
    document.getElementById("mainApp").classList.add("hidden");
    return;
  }

  document.getElementById("authView").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  state.student = {
    Nama: student.nama,
    Kelas: student.kelas,
    Absen: student.absen
  };

  loadProfile();
  loadRanking();
}

async function loadProfile() {
  if (!state.student) return;

  const result = await apiGet({
    action: "getStudent",
    nama: state.student.Nama,
    kelas: state.student.Kelas,
    absen: state.student.Absen
  });

  if (result?.student) {
    state.student = result.student;
  }

  if (result?.submissions) {
    state.submissions = Array.isArray(result.submissions) ? result.submissions : [];
  }

  renderBeranda();
  renderMisi();
  renderMateri();
  renderProfil();
}

async function loadRanking() {
  const result = await apiGet({ action: "getRanking" });
  state.ranking = result?.data || [];
  renderPrestasi();
}

function renderBeranda() {
  const siswa = state.student || {};
  const totalPoin = Number(siswa["Total Poin"] || siswa.TotalPoin || 0);
  const kelas = siswa.Kelas || "X TMI";
  const missions = KELAS_MISI[kelas] || [];
  const accepted = state.submissions.filter((item) => String(item.Status).toUpperCase() === "DITERIMA");
  const waiting = state.submissions.filter((item) => String(item.Status).toUpperCase() === "MENUNGGU");
  const progress = getProgressPoints(totalPoin);

  document.getElementById("welcomeName").textContent = `Halo, ${siswa.Nama || "Siswa"}`;
  document.getElementById("welcomeText").textContent = `${siswa.Kelas || "-"} • Absen ${siswa.Absen || "-"}`;
  document.getElementById("kelasLabel").textContent = kelas;
  document.getElementById("levelLabel").textContent = getLevel(totalPoin);
  document.getElementById("totalPoin").textContent = totalPoin;
  document.getElementById("misiSelesai").textContent = accepted.length;
  document.getElementById("misiMenunggu").textContent = waiting.length;
  document.getElementById("progressValue").textContent = `${progress}%`;

  const summaryBox = document.getElementById("missionSummary");
  summaryBox.innerHTML = "";

  missions.forEach((mission) => {
    const related = state.submissions
      .filter((item) => String(item.IDMisi) === String(mission.id))
      .sort((a, b) => new Date(b.Tanggal) - new Date(a.Tanggal));

    const last = related[0];
    const status = last ? last.Status : "BELUM";
    const statusClass = {
      MENUNGGU: "status-menunggu",
      DITERIMA: "status-diterima",
      DITOLAK: "status-ditolak",
      BELUM: "status-belum"
    }[status || "BELUM"];

    const item = document.createElement("div");
    item.className = "mission-card";
    item.innerHTML = `
      <div>
        <h4>${mission.name}</h4>
        <div class="mission-points">${mission.points} poin</div>
      </div>
      <div class="mission-status ${statusClass}">
        ${status === "BELUM" ? "BELUM DIKERJAKAN" : status}
      </div>
      <div class="tiny">${mission.desc}</div>
    `;
    summaryBox.appendChild(item);
  });
}

function renderMisi() {
  const siswa = state.student || {};
  const kelas = siswa.Kelas || "X TMI";
  const missions = KELAS_MISI[kelas] || [];

  const missionList = document.getElementById("missionList");
  missionList.innerHTML = "";

  missions.forEach((mission) => {
    const related = state.submissions
      .filter((item) => String(item.IDMisi) === String(mission.id))
      .sort((a, b) => new Date(b.Tanggal) - new Date(a.Tanggal));

    const last = related[0];
    const status = last ? last.Status : "BELUM";

    const div = document.createElement("div");
    div.className = "mission-card";
    div.innerHTML = `
      <div>
        <h4>${mission.name}</h4>
        <div class="mission-points">${mission.points} poin</div>
      </div>
      <div class="tiny">${mission.desc}</div>
      <div class="mission-status ${getStatusClass(status)}">
        ${formatStatus(status)}
      </div>
      <div>
        <button class="btn primary" data-upload="${mission.id}" data-name="${mission.name}" data-points="${mission.points}">
          ${status === "BELUM" ? "Kirim Bukti" : "Upload Ulang Bukti"}
        </button>
      </div>
      ${last && last.Bukti ? `<div class="tiny"><a href="${last.Bukti}" target="_blank" rel="noopener">Lihat bukti</a></div>` : ""}
    `;

    missionList.appendChild(div);
  });

  document.querySelectorAll("[data-upload]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const missionId = btn.getAttribute("data-upload");
      const missionName = btn.getAttribute("data-name");
      const missionPoints = btn.getAttribute("data-points");

      uploadMission(missionId, missionName, missionPoints);
    });
  });
}

function renderMateri() {
  const siswa = state.student || {};
  const kelas = siswa.Kelas || "X TMI";
  const list = KELAS_MATERI[kelas] || [];

  const container = document.getElementById("materiList");
  container.innerHTML = "";

  list.forEach((item) => {
    const block = document.createElement("div");
    block.className = "materi-item";
    block.innerHTML = `
      <strong>${item}</strong>
      <div class="tiny">Materi pembelajaran untuk ${kelas}</div>
    `;
    container.appendChild(block);
  });
}

function renderProfil() {
  const siswa = state.student || {};
  document.getElementById("profileNama").textContent = siswa.Nama || "-";
  document.getElementById("profileKelas").textContent = siswa.Kelas || "-";
  document.getElementById("profileAbsen").textContent = siswa.Absen || "-";
  document.getElementById("profileTotalPoin").textContent = Number(siswa["Total Poin"] || siswa.TotalPoin || 0);
}

function renderPrestasi() {
  const tbody = document.getElementById("rankingBody");
  tbody.innerHTML = "";

  if (!state.ranking.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="padding:18px; color:#64748b;">Belum ada data ranking.</td></tr>`;
    return;
  }

  state.ranking.forEach((siswa, index) => {
    const tr = document.createElement("tr");
    const points = Number(siswa["Total Poin"] || siswa.TotalPoin || 0);
    const rank = index + 1;
    const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

    tr.innerHTML = `
      <td><span class="badge-rank">${medal}</span></td>
      <td>${siswa.Nama}</td>
      <td>${siswa.Kelas}</td>
      <td>${points} poin</td>
    `;
    tbody.appendChild(tr);
  });
}

async function uploadMission(missionId, missionName, missionPoints) {
  if (!state.student) {
    showToast("Siswa belum login.");
    return;
  }

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*,.pdf,.png,.jpg,.jpeg,.webp";
  fileInput.click();

  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const fileBase64 = await fileToBase64(file);

    const result = await apiPost({
      action: "submitMission",
      nama: state.student.Nama,
      kelas: state.student.Kelas,
      absen: state.student.Absen,
      missionId,
      missionName,
      poin: Number(missionPoints || 0),
      fileName: file.name,
      fileType: file.type,
      fileBase64
    });

    if (!result.ok) {
      showToast(result.message || "Gagal mengirim bukti.");
      return;
    }

    showToast("Bukti berhasil dikirim. Menunggu review guru.");
    await loadProfile();
  };
}

function getStatusClass(status) {
  const s = String(status || "BELUM").toUpperCase();
  if (s === "MENUNGGU") return "status-menunggu";
  if (s === "DITERIMA") return "status-diterima";
  if (s === "DITOLAK") return "status-ditolak";
  return "status-belum";
}

function formatStatus(status) {
  const s = String(status || "BELUM").toUpperCase();
  if (s === "MENUNGGU") return "MENUNGGU";
  if (s === "DITERIMA") return "DITERIMA";
  if (s === "DITOLAK") return "DITOLAK";
  return "BELUM";
}

function getLevel(total) {
  if (total >= 800) return "Master TMI";
  if (total >= 600) return "Profesional";
  if (total >= 400) return "Mahir";
  if (total >= 200) return "Berjalan";
  return "Pemula";
}

function getProgressPoints(total) {
  const maxTarget = 1000;
  return Math.min(100, Math.round((total / maxTarget) * 100));
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.style.display = "none";
  }, 2200);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function apiGet(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}?${query}`);
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return { ok: false, message: "Gagal membaca data dari server." };
  }
}

async function apiPost(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    return { ok: false, message: "Gagal memproses data." };
  }
}