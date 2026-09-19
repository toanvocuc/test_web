// Bộ máy làm bài: dựng câu hỏi, chấm điểm 4 trục và vẽ kết quả ngay tại chỗ.
import { initShell, toast, store } from './ui.js';
import { QUESTIONS_7, QUESTIONS_AB, SCALE_LABELS } from './questions.js';
import { TYPES, GROUPS, AXES } from './types.js';

initShell();

/* ========================================================================
   1. Cấu hình hai bài
   ======================================================================== */
const KINDS = {
  '7-muc': {
    key: '7-muc',
    mode: 'scale',
    questions: QUESTIONS_7,
    eyebrow: 'Baans / 32 câu · thang 7 mức',
    title: 'Không ai giống bạn.<br>Kể cả gần giống.',
    lead: 'Chọn mức độ đồng ý đúng với bạn trong phần lớn tình huống. ' +
          'Trả lời như bạn vốn là, không phải như bạn nghĩ mình nên là.',
    count: '32 câu', time: '5–7 phút',
    other: 'ab', otherLabel: 'Đổi sang bài A/B'
  },
  'ab': {
    key: 'ab',
    mode: 'ab',
    questions: QUESTIONS_AB,
    eyebrow: 'Baans / 50 câu · lựa chọn A–B',
    title: 'Bạn thường chọn<br>theo cách nào?',
    lead: 'Chọn một trong hai mô tả thường giống bạn hơn. ' +
          'Trả lời như bạn vốn là, không phải như bạn nghĩ mình nên là.',
    count: '50 câu', time: '8–10 phút',
    other: '7-muc', otherLabel: 'Đổi sang bài 7 mức'
  }
};

const params = new URLSearchParams(location.search);
const KIND = KINDS[params.get('bai')] || KINDS['7-muc'];
const SAVE_KEY = 'baans-progress-' + KIND.key;

/* ========================================================================
   2. Trạng thái
   ======================================================================== */
const state = {
  idx: 0,
  answers: new Array(KIND.questions.length).fill(null)
};

const $ = id => document.getElementById(id);
const screens = { intro: $('introScreen'), quiz: $('quizScreen'), result: $('resultScreen') };

function show(name) {
  Object.entries(screens).forEach(([k, el]) => { el.hidden = k !== name; });
  document.body.classList.toggle('is-quizzing', name === 'quiz');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function saveProgress() {
  store.set(SAVE_KEY, JSON.stringify({ idx: state.idx, answers: state.answers }));
}

function loadProgress() {
  try {
    const raw = store.get(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!Array.isArray(data.answers) || data.answers.length !== KIND.questions.length) return null;
    if (data.answers.every(a => a === null)) return null;
    return data;
  } catch { return null; }
}

/* ========================================================================
   3. Màn giới thiệu
   ======================================================================== */
$('introEyebrow').textContent = KIND.eyebrow;
$('introTitle').innerHTML = KIND.title;
$('introLead').textContent = KIND.lead;
$('introCount').textContent = KIND.count;
$('introTime').textContent = KIND.time;
$('pgTotal').textContent = String(KIND.questions.length);
$('btnOther').href = 'lam-bai.html?bai=' + KIND.other;
$('btnOther').textContent = KIND.otherLabel;
$('btnTryOther').href = 'lam-bai.html?bai=' + KIND.other;
$('btnTryOther').textContent = KIND.other === 'ab' ? 'Thử bài A/B' : 'Thử bài 7 mức';
document.title = (KIND.key === 'ab' ? 'Trắc nghiệm A/B' : 'Trắc nghiệm 7 mức') + ' — Baans';

const saved = loadProgress();
if (saved) {
  const done = saved.answers.filter(a => a !== null).length;
  const btn = $('btnResume');
  btn.hidden = false;
  btn.textContent = `Tiếp tục (đã trả lời ${done}/${KIND.questions.length})`;
  btn.addEventListener('click', () => {
    state.idx = Math.min(saved.idx, KIND.questions.length - 1);
    state.answers = saved.answers;
    show('quiz');
    render();
  });
}

$('btnStart').addEventListener('click', () => {
  state.idx = 0;
  state.answers.fill(null);
  store.del(SAVE_KEY);
  show('quiz');
  render();
});

/* ========================================================================
   4. Dựng câu hỏi
   ======================================================================== */
const scaleBox = $('scaleBox');
const scaleDots = $('scaleDots');
const abBox = $('abBox');
const qcard = $('qcard');

// Thang 7 mức: dựng sẵn 7 nút, mỗi lần chuyển câu chỉ đổi trạng thái chọn.
if (KIND.mode === 'scale') {
  scaleBox.hidden = false;
  scaleDots.innerHTML = SCALE_LABELS.map((label, i) => {
    const value = i + 1;
    const magnitude = Math.abs(value - 4);           // 3 = mạnh nhất, 0 = trung lập
    const side = value < 4 ? 'no' : value > 4 ? 'yes' : 'mid';
    // Không đặt data-step cho mức mạnh nhất để nút to nhất nằm ở hai đầu
    const step = magnitude === 3 ? '' : ` data-step="${3 - magnitude}"`;
    return `<button class="dot" type="button" role="radio" aria-checked="false"
              data-value="${value}" data-side="${side}"${step}
              aria-label="${label}" title="${label}"></button>`;
  }).join('');

  scaleDots.addEventListener('click', e => {
    const dot = e.target.closest('.dot');
    if (dot) answer(Number(dot.dataset.value));
  });
  scaleDots.addEventListener('pointerover', e => {
    const dot = e.target.closest('.dot');
    if (dot) $('scaleHint').textContent = dot.dataset.value + ' · ' + SCALE_LABELS[dot.dataset.value - 1];
  });
  scaleDots.addEventListener('pointerleave', () => {
    $('scaleHint').textContent = 'Chọn một mức · hoặc bấm phím 1–7';
  });
} else {
  abBox.hidden = false;
  abBox.addEventListener('click', e => {
    const opt = e.target.closest('.ab__opt');
    if (opt) answer(opt.dataset.pick);
  });
}

function render() {
  const q = KIND.questions[state.idx];
  const total = KIND.questions.length;
  const value = state.answers[state.idx];

  $('qindex').textContent = `Câu ${state.idx + 1}`;
  qcard.classList.remove('is-swapping');
  void qcard.offsetWidth;                 // ép trình duyệt chạy lại animation
  qcard.classList.add('is-swapping');

  if (KIND.mode === 'scale') {
    $('qstem').hidden = true;
    $('qtext').textContent = q.t;
    scaleDots.querySelectorAll('.dot').forEach(dot => {
      const picked = Number(dot.dataset.value) === value;
      dot.classList.toggle('is-picked', picked);
      dot.setAttribute('aria-checked', String(picked));
    });
    $('scaleHint').textContent = value
      ? `Đã chọn: ${SCALE_LABELS[value - 1]}`
      : 'Chọn một mức · hoặc bấm phím 1–7';
  } else {
    // Từ câu 31 trở đi bài A/B chỉ có hai cụm từ, không có câu dẫn
    $('qstem').hidden = !q.s;
    $('qstem').textContent = q.s || '';
    $('qtext').textContent = q.s ? '' : 'Bạn nghiêng về bên nào hơn?';
    $('qtext').hidden = !!q.s;
    abBox.querySelector('[data-slot="a"]').textContent = q.a;
    abBox.querySelector('[data-slot="b"]').textContent = q.b;
    abBox.querySelectorAll('.ab__opt').forEach(opt => {
      opt.classList.toggle('is-picked', opt.dataset.pick === value);
    });
  }

  const done = state.answers.filter(a => a !== null).length;
  const percent = Math.round(done / total * 100);
  $('pgNow').textContent = String(state.idx + 1);
  $('pgPercent').textContent = percent + '%';
  $('pgFill').style.width = percent + '%';

  $('btnPrev').disabled = state.idx === 0;
  const last = state.idx === total - 1;
  $('btnNext').disabled = value === null;
  $('btnNext').textContent = last ? 'Xem kết quả →' : 'Câu sau →';
}

function answer(value) {
  state.answers[state.idx] = value;
  saveProgress();
  render();
  // Tự sang câu kế sau một nhịp ngắn để người dùng kịp thấy lựa chọn của mình
  setTimeout(next, 280);
}

function next() {
  if (state.answers[state.idx] === null) return;
  if (state.idx === KIND.questions.length - 1) { finish(); return; }
  state.idx++;
  saveProgress();
  render();
}

function prev() {
  if (state.idx === 0) return;
  state.idx--;
  saveProgress();
  render();
}

$('btnNext').addEventListener('click', next);
$('btnPrev').addEventListener('click', prev);
$('btnQuit').addEventListener('click', () => {
  if (confirm('Thoát ra ngoài? Tiến độ vẫn được giữ để bạn quay lại sau.')) {
    location.href = 'index.html';
  }
});

// Phím tắt cho người dùng máy tính
document.addEventListener('keydown', e => {
  if (screens.quiz.hidden) return;
  if (e.target.closest('input, textarea')) return;

  if (KIND.mode === 'scale' && e.key >= '1' && e.key <= '7') {
    answer(Number(e.key)); e.preventDefault(); return;
  }
  if (KIND.mode === 'ab') {
    const k = e.key.toLowerCase();
    if (k === 'a' || k === '1') { answer('a'); e.preventDefault(); return; }
    if (k === 'b' || k === '2') { answer('b'); e.preventDefault(); return; }
  }
  if (e.key === 'ArrowLeft')  { prev(); e.preventDefault(); }
  if (e.key === 'ArrowRight' || e.key === 'Enter') { next(); e.preventDefault(); }
});

/* ========================================================================
   5. Chấm điểm
   Kết quả của mỗi trục là phần trăm nghiêng về CỰC ĐẦU (E / S / T / J).
   ======================================================================== */
function score() {
  const sum = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const max = { EI: 0, SN: 0, TF: 0, JP: 0 };

  KIND.questions.forEach((q, i) => {
    const value = state.answers[i];
    if (value === null) return;

    if (KIND.mode === 'scale') {
      // 1..7 -> -3..+3, rồi đảo dấu nếu câu hỏi nghiêng về cực sau
      const delta = value - 4;
      const towardFirst = q.p === q.ax[0] ? delta : -delta;
      sum[q.ax] += towardFirst;
      max[q.ax] += 3;
    } else {
      sum[q.ax] += value === 'a' ? 1 : -1;
      max[q.ax] += 1;
    }
  });

  const percents = {};
  for (const ax of ['EI', 'SN', 'TF', 'JP']) {
    // Không có câu nào được trả lời -> coi như cân bằng 50%
    percents[ax] = max[ax] === 0 ? 50 : Math.round(50 + (sum[ax] / max[ax]) * 50);
  }
  return percents;
}

function codeFrom(percents) {
  return AXES.map(a => percents[a.key] >= 50 ? a.left : a.right).join('');
}

/* ========================================================================
   6. Vẽ kết quả
   ======================================================================== */
function renderResult(percents, withReview) {
  const code = codeFrom(percents);
  const type = TYPES[code];
  const group = GROUPS[type.group];

  $('rsGroup').textContent = group.mark + ' ' + group.name;
  $('rsCode').textContent = code;
  $('rsName').textContent = type.name;
  $('rsTagline').textContent = '“' + type.tagline + '”';
  $('rsIntro').textContent = type.intro;

  // Bốn thanh trục
  $('rsAxes').innerHTML = AXES.map(a => {
    const first = percents[a.key];
    const second = 100 - first;
    const leadLeft = first >= 50;
    return `
      <div class="abar">
        <div class="abar__top">
          <span class="abar__side${leadLeft ? ' is-lead' : ''}">
            <b>${a.left}</b> ${a.leftName} ${first}%
          </span>
          <span class="abar__side${leadLeft ? '' : ' is-lead'}">
            ${second}% ${a.rightName} <b>${a.right}</b>
          </span>
        </div>
        <div class="abar__track">
          <div class="abar__fill" data-w="${first}"></div>
        </div>
        <p class="abar__desc">${a.desc}</p>
      </div>`;
  }).join('');

  const fill = list => list.map(item => `<li>${item}</li>`).join('');
  $('rsStrengths').innerHTML = fill(type.strengths);
  $('rsWatch').innerHTML = fill(type.watch);
  $('rsTips').innerHTML = fill(type.tips);

  // Bảng xem lại chỉ có ý nghĩa khi chính người này vừa làm bài
  $('rsReviewPanel').hidden = !withReview;
  if (withReview) {
    $('rsReview').innerHTML = KIND.questions.map((q, i) => {
      const value = state.answers[i];
      const text = KIND.mode === 'scale' ? q.t : (q.s || `${q.a} / ${q.b}`);
      const picked = value === null ? '—'
        : KIND.mode === 'scale' ? SCALE_LABELS[value - 1]
        : (value === 'a' ? q.a : q.b);
      return `<li><span>${i + 1}.</span><span>${text}<br><b>${picked}</b></span></li>`;
    }).join('');
  }

  // Link chia sẻ: nhúng 4 phần trăm vào hash để mở lại đúng kết quả
  const hash = '#kq=' + KIND.key + '-' + AXES.map(a => percents[a.key]).join('-');
  history.replaceState(null, '', location.pathname + location.search + hash);

  show('result');
  requestAnimationFrame(() => {
    document.querySelectorAll('.abar__fill').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 90 * i);
    });
  });
}

function finish() {
  store.del(SAVE_KEY);
  renderResult(score(), true);
}

$('btnRetry').addEventListener('click', () => {
  state.idx = 0;
  state.answers.fill(null);
  store.del(SAVE_KEY);
  history.replaceState(null, '', location.pathname + location.search);
  show('quiz');
  render();
});

$('btnCopy').addEventListener('click', async () => {
  const url = location.href;
  try {
    await navigator.clipboard.writeText(url);
    toast('Đã sao chép link kết quả.');
  } catch {
    // Trình duyệt cũ hoặc trang không chạy trên https
    prompt('Sao chép link này:', url);
  }
});

/* ========================================================================
   7. Mở thẳng một kết quả đã chia sẻ
   ======================================================================== */
function readHash() {
  const m = location.hash.match(/^#kq=(7-muc|ab)-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})$/);
  if (!m) return null;
  const nums = m.slice(2).map(Number);
  if (nums.some(n => n < 0 || n > 100)) return null;
  return { EI: nums[0], SN: nums[1], TF: nums[2], JP: nums[3] };
}

const shared = readHash();
if (shared) {
  renderResult(shared, false);
} else {
  show('intro');
}
