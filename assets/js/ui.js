// Phần giao diện dùng chung cho mọi trang: menu, giao diện sáng/tối, header dính.

const THEME_KEY = 'baans-theme';

/** Đọc/ghi localStorage an toàn — chế độ riêng tư của Safari có thể ném lỗi. */
export const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* bỏ qua */ }
  },
  del(key) {
    try { localStorage.removeItem(key); } catch { /* bỏ qua */ }
  }
};

function currentTheme() {
  const saved = store.get(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  const paint = () => {
    const dark = currentTheme() === 'dark';
    if (icon) icon.textContent = dark ? '☀' : '☾';
    btn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  };

  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set(THEME_KEY, next);
    // Đổi cả màu thanh trạng thái trên trình duyệt di động
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove());
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = next === 'dark' ? '#121a17' : '#fbfaf6';
    document.head.appendChild(meta);
    paint();
  });

  paint();
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Bấm vào một mục thì đóng menu lại (trên điện thoại menu che nội dung)
  menu.addEventListener('click', e => {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // Quay lại bố cục desktop thì luôn trả menu về trạng thái mặc định
  matchMedia('(min-width: 900px)').addEventListener('change', close);
}

function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Chạy một lần trên mọi trang. */
export function initShell() {
  initTheme();
  initNav();
  initStickyHeader();
}

/** Hiện thông báo ngắn ở cuối màn hình. */
export function toast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('is-on');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => el.classList.remove('is-on'), 2600);
}
