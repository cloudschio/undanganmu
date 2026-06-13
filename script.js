document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("rsvpCategory");
  const guestSelect = document.getElementById("rsvpGuest");

  if (categorySelect && guestSelect) {
    categorySelect.addEventListener("change", function () {
      const category = this.value;

      guestSelect.innerHTML = "";
      guestSelect.disabled = true;

      if (!category) {
        guestSelect.innerHTML = `<option value="">-- Pilih kategori dulu --</option>`;
        return;
      }

      const maxGuest = category === "teman" ? 2 : 4;

      let options = `<option value="">-- Jumlah Tamu --</option>`;
      for (let i = 1; i <= maxGuest; i++) {
        options += `<option value="${i}">${i} Orang</option>`;
      }

      guestSelect.innerHTML = options;
      guestSelect.disabled = false;
    });
  }
});
const targetDate = new Date("2027-01-09T08:00:00+07:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const cover = document.getElementById("cover");
const openInvite = document.getElementById("openInvite");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

openInvite.addEventListener("click", async () => {
  cover.classList.add("hidden");
  try {
    await bgMusic.play();
    musicToggle.textContent = "❚❚ Musik";
  } catch (e) {}
});

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicToggle.textContent = "❚❚ Musik";
    } catch (e) {}
  } else {
    bgMusic.pause();
    musicToggle.textContent = "♫ Musik";
  }
});
function sendRSVP(e) {
  e.preventDefault();

  const name = document.getElementById("rsvpName").value.trim();
  const category = document.getElementById("rsvpCategory").value;
  const attend = document.getElementById("rsvpAttend").value;
  const guest = document.getElementById("rsvpGuest").value;
  const message = document.getElementById("rsvpMessage").value.trim();

  if (!name || !category || !attend || !guest) {
    alert("Harap lengkapi semua kolom terlebih dahulu.");
    return;
  }

  const attendText = {
    hadir: "✅ Hadir",
    tidak: "❌ Tidak Hadir",
    mungkin: "🤔 Mungkin Hadir"
  }[attend];

  const categoryText = {
    ortu: "👨‍👩‍👧 Orang Tua Mempelai",
    tamu: "🤝 Tamu Mempelai",
    teman: "👫 Teman Mempelai"
  }[category];

  const waMessage =
    `Halo, saya ingin konfirmasi kehadiran:%0A%0A` +
    `👤 Nama: ${encodeURIComponent(name)}%0A` +
    `🏷️ Kategori: ${encodeURIComponent(categoryText)}%0A` +
    `📋 Status: ${encodeURIComponent(attendText)}%0A` +
    `👥 Jumlah tamu: ${guest} Orang%0A` +
    (message ? `💬 Ucapan: ${encodeURIComponent(message)}%0A` : "") +
    `%0ATerima kasih 🙏`;

  window.open(`https://wa.me/6281234567890?text=${waMessage}`, "_blank");
}
// Scroll animation observer
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".detail .card, .lokasi .card, .maps-preview, .gallery-grid img, .qris .card, .rsvp-form, .wishes .card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeBounce 0.7s ease both";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
};

document.addEventListener("DOMContentLoaded", animateOnScroll);
