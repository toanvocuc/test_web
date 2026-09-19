// Trang chủ: dựng lưới 16 nhóm tính cách và chạy hiệu ứng thẻ minh hoạ.
import { initShell } from './ui.js';
import { GROUPS, TYPES } from './types.js';

initShell();

/* --- Lưới 4 nhóm lớn, mỗi nhóm kèm 4 mã tính cách ------------------------- */
const grid = document.getElementById('groupGrid');
if (grid) {
  const html = Object.entries(GROUPS).map(([key, g]) => {
    const codes = Object.keys(TYPES).filter(code => TYPES[code].group === key);
    return `
      <article class="group">
        <p class="group__mark" aria-hidden="true">${g.mark}</p>
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <ul class="group__codes">${codes.map(c => `<li>${c}</li>`).join('')}</ul>
      </article>`;
  }).join('');
  grid.innerHTML = html;
}

/* --- Thanh trục trong thẻ hero: chỉ chạy khi cuộn tới ---------------------- */
const card = document.getElementById('heroCard');
if (card) {
  const bars = card.querySelectorAll('.axis-track__fill');
  const fill = () => bars.forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 120 * i);
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { fill(); io.disconnect(); }
    }, { threshold: .25 });
    io.observe(card);
  } else {
    fill();
  }
}
