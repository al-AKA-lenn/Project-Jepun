// =============================================
//  NIHONGO YOMI — APP LOGIC v3
//  Streak + Timer + Progress + Kosakata
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  /* =============================================
     UTILS
     ============================================= */
  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
  function capitalize(s) { return s.trim().charAt(0).toUpperCase() + s.trim().slice(1); }
  function todayStr() { return new Date().toISOString().slice(0, 10); }

  /* =============================================
     LOCAL STORAGE HELPERS
     ============================================= */
  function lsGet(k, def) { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : def; } catch { return def; } }
  function lsSet(k, v)   { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

  /* =============================================
     LOGIN
     ============================================= */
  const loginScreen = document.getElementById("loginScreen");
  const appWrap     = document.getElementById("appWrap");
  const nameInput   = document.getElementById("nameInput");

  function applyName(name) {
    document.getElementById("heroName").textContent       = name;
    document.getElementById("headerGreeting").textContent = `Halo, ${name}! 🌿`;
  }

  function doLogin() {
    const raw = nameInput.value.trim();
    if (!raw) {
      nameInput.classList.remove("shake");
      void nameInput.offsetWidth;
      nameInput.classList.add("shake");
      return;
    }
    const name = capitalize(raw);
    sessionStorage.setItem("nihongoName", name);
    applyName(name);
    loginScreen.style.transition = "opacity 0.38s ease";
    loginScreen.style.opacity = "0";
    setTimeout(() => { loginScreen.classList.add("hidden"); appWrap.classList.remove("hidden"); checkStreak(); updateProgress(); }, 360);
  }

  document.getElementById("loginBtn").addEventListener("click", doLogin);
  nameInput.addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
  nameInput.addEventListener("animationend", () => nameInput.classList.remove("shake"));

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("nihongoName");
    appWrap.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    loginScreen.style.opacity = "1";
    nameInput.value = "";
    nameInput.focus();
  });

  const savedName = sessionStorage.getItem("nihongoName");
  if (savedName) {
    applyName(savedName);
    loginScreen.classList.add("hidden");
    appWrap.classList.remove("hidden");
    checkStreak();
    updateProgress();
  }

  /* =============================================
     STREAK
     ============================================= */
  function checkStreak() {
    const today     = todayStr();
    let streak      = lsGet("nihongo_streak", 0);
    let lastVisit   = lsGet("nihongo_lastvisit", "");
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    if (lastVisit === today) {
      // already visited today, keep streak
    } else if (lastVisit === yesterday) {
      streak++;
      lsSet("nihongo_streak", streak);
      lsSet("nihongo_lastvisit", today);
    } else {
      // broke streak or first visit
      streak = 1;
      lsSet("nihongo_streak", streak);
      lsSet("nihongo_lastvisit", today);
    }

    renderStreak(streak, today);
  }

  function renderStreak(streak, today) {
    document.getElementById("streakCount").textContent = streak;

    const title = document.getElementById("streakBannerTitle");
    const sub   = document.getElementById("streakBannerSub");
    title.textContent = streak > 1 ? `🔥 Streak ${streak} hari berturut-turut!` : `🔥 Streak dimulai hari ini!`;
    sub.textContent   = streak > 1 ? `Kamu sudah belajar ${streak} hari berturut-turut. Jangan putus ya!` : `Belajar setiap hari untuk membangun streak!`;

    // 7-day dots
    const dotsEl = document.getElementById("streakDots");
    dotsEl.innerHTML = "";
    const days = ["M","S","R","K","J","S","M"];
    const now  = new Date();
    for (let i = 6; i >= 0; i--) {
      const d   = new Date(now.getTime() - i * 86400000);
      const str = d.toISOString().slice(0, 10);
      const dot = document.createElement("div");
      dot.className = "streak-dot";
      if (str === today) {
        dot.classList.add("today");
        dot.textContent = "✓";
      } else if (i < streak) {
        dot.classList.add("active");
        dot.textContent = "🔥";
      } else {
        dot.textContent = days[d.getDay()];
      }
      dotsEl.appendChild(dot);
    }
  }

  /* =============================================
     PROGRESS TRACKER
     ============================================= */
  // We track which flashcard indices have been "seen" per type
  function updateProgress() {
    const hSeen = lsGet("nihongo_h_seen", []);
    const kSeen = lsGet("nihongo_k_seen", []);
    const vSeen = lsGet("nihongo_v_seen", []);

    const hPct = Math.round((hSeen.length / HIRAGANA.length) * 100);
    const kPct = Math.round((kSeen.length / KATAKANA.length) * 100);
    const vPct = Math.round((vSeen.length / VOCABULARY.length) * 100);

    document.getElementById("progHiragana").style.width    = hPct + "%";
    document.getElementById("progKatakana").style.width    = kPct + "%";
    document.getElementById("progVocab").style.width       = vPct + "%";
    document.getElementById("progHiraganaNum").textContent = `${hSeen.length}/${HIRAGANA.length}`;
    document.getElementById("progKatakanaNum").textContent = `${kSeen.length}/${KATAKANA.length}`;
    document.getElementById("progVocabNum").textContent    = `${vSeen.length}/${VOCABULARY.length}`;
  }

  function markSeen(type, index) {
    const key  = `nihongo_${type}_seen`;
    const seen = lsGet(key, []);
    if (!seen.includes(index)) { seen.push(index); lsSet(key, seen); }
    updateProgress();
  }

  /* =============================================
     NAVIGATION
     ============================================= */
  const navBtns  = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  function showSection(id) {
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById("section-" + id)?.classList.add("active");
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.section === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navBtns.forEach(b => b.addEventListener("click", () => showSection(b.dataset.section)));
  document.querySelectorAll("[data-section]").forEach(b => {
    if (b.tagName === "BUTTON") b.addEventListener("click", () => showSection(b.dataset.section));
  });
  document.querySelectorAll(".info-card[data-target]").forEach(c => {
    c.addEventListener("click", () => showSection(c.dataset.target));
  });

  /* =============================================
     CHAR GRIDS
     ============================================= */
  function buildGrid(data, containerId, type, seenKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    data.forEach((item, i) => {
      const card = document.createElement("div");
      card.className     = "char-card";
      card.dataset.group = item.group;
      card.innerHTML     = `<span class="char-jp">${item.char}</span><span class="char-roma">${item.roma}</span>`;
      card.addEventListener("click", () => { markSeen(seenKey, i); openPopup(item, type); });
      container.appendChild(card);
    });
  }
  buildGrid(HIRAGANA, "hiraganaGrid", "Hiragana", "h");
  buildGrid(KATAKANA, "katakanaGrid", "Katakana",  "k");

  function setupFilter(filterId, gridId, data) {
    document.getElementById(filterId).querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById(filterId).querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const group = btn.dataset.group;
        document.getElementById(gridId).querySelectorAll(".char-card").forEach((card, i) => {
          card.style.display = (group === "all" || data[i].group === group) ? "" : "none";
        });
      });
    });
  }
  setupFilter("hiraganaFilter", "hiraganaGrid", HIRAGANA);
  setupFilter("katakanaFilter", "katakanaGrid", KATAKANA);

  /* =============================================
     POPUP
     ============================================= */
  const popup = document.getElementById("cardPopup");
  const overlay = document.getElementById("popupOverlay");

  function openPopup(item, type) {
    document.getElementById("popupChar").textContent    = item.char;
    document.getElementById("popupRoma").textContent    = item.roma;
    document.getElementById("popupType").textContent    = type;
    document.getElementById("popupExample").textContent = item.example || "";
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
  function closePopup() { popup.classList.add("hidden"); overlay.classList.add("hidden"); }

  document.getElementById("popupClose").addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);
  document.getElementById("popupSound").addEventListener("click", () => {
    speakJapanese(document.getElementById("popupChar").textContent);
    const btn = document.getElementById("popupSound");
    btn.textContent = "▶ ...";
    setTimeout(() => btn.textContent = "▶ Dengarkan", 1400);
  });

  /* =============================================
     TTS
     ============================================= */
  function speakJapanese(text) {
    if (!window.speechSynthesis) { showToast("Browser tidak mendukung TTS"); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP"; u.rate = 0.82;
    const jp = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("ja"));
    if (jp) u.voice = jp;
    window.speechSynthesis.speak(u);
  }
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

  /* =============================================
     FLASHCARD — HIRAGANA
     ============================================= */
  let hIdx = 0, hFlipped = false;
  function updateHFC() {
    const item = HIRAGANA[hIdx];
    document.getElementById("hFlashChar").textContent    = item.char;
    document.getElementById("hFlashRoma").textContent    = item.roma;
    document.getElementById("hFlashMeaning").textContent = item.example || "";
    document.getElementById("hCounter").textContent      = `${hIdx + 1} / ${HIRAGANA.length}`;
    document.getElementById("hFlashcard").classList.remove("flipped");
    hFlipped = false;
    markSeen("h", hIdx);
  }
  document.getElementById("hFlashcard").addEventListener("click", () => { hFlipped = !hFlipped; document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped); });
  document.getElementById("hFlip").addEventListener("click",  () => { hFlipped = !hFlipped; document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped); });
  document.getElementById("hNext").addEventListener("click",  () => { hIdx = (hIdx + 1) % HIRAGANA.length; updateHFC(); });
  document.getElementById("hPrev").addEventListener("click",  () => { hIdx = (hIdx - 1 + HIRAGANA.length) % HIRAGANA.length; updateHFC(); });
  updateHFC();

  /* =============================================
     FLASHCARD — KATAKANA
     ============================================= */
  let kIdx = 0, kFlipped = false;
  function updateKFC() {
    const item = KATAKANA[kIdx];
    document.getElementById("kFlashChar").textContent = item.char;
    document.getElementById("kFlashRoma").textContent = item.roma;
    document.getElementById("kCounter").textContent   = `${kIdx + 1} / ${KATAKANA.length}`;
    document.getElementById("kFlashcard").classList.remove("flipped");
    kFlipped = false;
    markSeen("k", kIdx);
  }
  document.getElementById("kFlashcard").addEventListener("click", () => { kFlipped = !kFlipped; document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped); });
  document.getElementById("kFlip").addEventListener("click",  () => { kFlipped = !kFlipped; document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped); });
  document.getElementById("kNext").addEventListener("click",  () => { kIdx = (kIdx + 1) % KATAKANA.length; updateKFC(); });
  document.getElementById("kPrev").addEventListener("click",  () => { kIdx = (kIdx - 1 + KATAKANA.length) % KATAKANA.length; updateKFC(); });
  updateKFC();

  /* =============================================
     KOSAKATA
     ============================================= */
  const vocabFilterEl = document.getElementById("vocabFilter");
  const vocabGridEl   = document.getElementById("vocabGrid");
  const vocabSearchEl = document.getElementById("vocabSearch");
  const vocabEmptyEl  = document.getElementById("vocabEmpty");
  let activeVocabCat  = "all";

  // Build category filter tabs
  VOCAB_CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className    = "filter-btn" + (cat.id === "all" ? " active" : "");
    btn.dataset.cat  = cat.id;
    btn.textContent  = `${cat.emoji} ${cat.label}`;
    btn.addEventListener("click", () => {
      vocabFilterEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeVocabCat = cat.id;
      renderVocab();
    });
    vocabFilterEl.appendChild(btn);
  });

  function renderVocab() {
    const q    = vocabSearchEl.value.trim().toLowerCase();
    const list = VOCABULARY.filter(v => {
      const matchCat  = activeVocabCat === "all" || v.category === activeVocabCat;
      const matchQ    = !q || v.indo.toLowerCase().includes(q) || v.jp.includes(q) || v.roma.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    vocabGridEl.innerHTML = "";
    vocabEmptyEl.classList.toggle("hidden", list.length > 0);

    list.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "vocab-card";
      const catLabel = VOCAB_CATEGORIES.find(c => c.id === item.category)?.label || item.category;

      card.innerHTML = `
        <button class="vocab-sound-btn" title="Dengarkan">▶</button>
        <div class="vocab-card-top">
          <div class="vocab-indo">${item.indo}</div>
          <span class="vocab-category-tag">${catLabel}</span>
        </div>
        <div class="vocab-jp">${item.jp}</div>
        <div class="vocab-roma">${item.roma}</div>
        <div class="vocab-note">${item.note}</div>
      `;

      card.querySelector(".vocab-sound-btn").addEventListener("click", e => {
        e.stopPropagation();
        speakJapanese(item.jp);
        markSeen("v", item.id - 1);
      });

      card.addEventListener("click", () => {
        speakJapanese(item.jp);
        markSeen("v", item.id - 1);
      });

      vocabGridEl.appendChild(card);
    });
  }

  vocabSearchEl.addEventListener("input", renderVocab);
  renderVocab();

  /* =============================================
     QUIZ
     ============================================= */
  let quizQuestions = [], quizIdx = 0, quizScore = 0, quizWrong = 0;
  let quizMode = "", quizTimerSec = 0, quizAnswered = false;
  let timerInterval = null, timerRemaining = 0;
  let quizStartTime = 0, quizTotalTime = 0;

  const CIRC = 2 * Math.PI * 20; // 125.66

  function buildChoices(correct, pool) {
    const others = pool.filter(p => p.roma !== correct.roma).sort(() => Math.random() - 0.5).slice(0, 3);
    return shuffle([correct, ...others]);
  }

  function startTimer() {
    if (quizTimerSec === 0) return;
    timerRemaining = quizTimerSec;
    const arc    = document.getElementById("timerArc");
    const numEl  = document.getElementById("timerNum");
    document.getElementById("timerWrap").classList.remove("hidden");

    arc.style.strokeDashoffset = "0";
    arc.classList.remove("warning", "danger");

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerRemaining--;
      numEl.textContent = timerRemaining;
      const pct = timerRemaining / quizTimerSec;
      arc.style.strokeDashoffset = CIRC * (1 - pct);

      if (pct <= 0.3) { arc.classList.add("danger"); arc.classList.remove("warning"); }
      else if (pct <= 0.5) { arc.classList.add("warning"); }

      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        if (!quizAnswered) timeOut();
      }
    }, 1000);
  }

  function stopTimer() { clearInterval(timerInterval); }

  function timeOut() {
    quizAnswered = true;
    quizWrong++;
    // highlight correct
    document.querySelectorAll(".choice-btn").forEach(b => {
      b.disabled = true;
      const q = quizQuestions[quizIdx];
      if (quizMode === "charToRoma" && b.textContent === q.roma) b.classList.add("correct");
      if (quizMode === "romaToChar" && b.textContent === q.char) b.classList.add("correct");
    });
    showFeedback("⏱", "Waktu habis! もう一度！");
    setTimeout(() => { quizIdx++; quizIdx >= quizQuestions.length ? showResult() : showQuestion(); }, 1500);
  }

  function showQuestion() {
    stopTimer();
    const q = quizQuestions[quizIdx];
    document.getElementById("quizFill").style.width = (quizIdx / quizQuestions.length * 100) + "%";
    document.getElementById("quizProgress").textContent = `Soal ${quizIdx + 1}/${quizQuestions.length}`;
    document.getElementById("quizScore").textContent    = `✓ ${quizScore}  ✗ ${quizWrong}`;
    document.getElementById("quizFeedback").classList.add("hidden");
    quizAnswered = false;

    const choicesEl = document.getElementById("quizChoices");
    choicesEl.innerHTML = "";
    const choices = buildChoices(q, quizQuestions);

    if (quizMode === "charToRoma") {
      const qEl = document.getElementById("quizQuestion");
      qEl.style.fontFamily = "var(--font-jp)"; qEl.style.fontSize = "5rem";
      qEl.textContent = q.char;
      document.getElementById("quizLabel").textContent = "Apa romaji dari aksara ini?";
      choices.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "choice-btn"; btn.textContent = c.roma;
        btn.addEventListener("click", () => checkAnswer(btn, c.roma === q.roma, q.roma));
        choicesEl.appendChild(btn);
      });
    } else {
      const qEl = document.getElementById("quizQuestion");
      qEl.style.fontFamily = "var(--font-serif)"; qEl.style.fontSize = "2.8rem";
      qEl.textContent = q.roma;
      document.getElementById("quizLabel").textContent = "Pilih aksara yang benar!";
      choices.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "choice-btn"; btn.style.fontFamily = "var(--font-jp)"; btn.style.fontSize = "2rem";
        btn.textContent = c.char;
        btn.addEventListener("click", () => checkAnswer(btn, c.char === q.char, q.char));
        choicesEl.appendChild(btn);
      });
    }

    startTimer();
  }

  function checkAnswer(clickedBtn, isCorrect, correctAnswer) {
    if (quizAnswered) return;
    quizAnswered = true;
    stopTimer();

    document.querySelectorAll(".choice-btn").forEach(b => {
      b.disabled = true;
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });

    if (isCorrect) {
      clickedBtn.classList.add("correct"); quizScore++;
      const fb = FEEDBACK_CORRECT[Math.floor(Math.random() * FEEDBACK_CORRECT.length)];
      showFeedback("✓", fb.msg);
      speakJapanese(quizQuestions[quizIdx].char);
    } else {
      clickedBtn.classList.add("wrong"); quizWrong++;
      const fb = FEEDBACK_WRONG[Math.floor(Math.random() * FEEDBACK_WRONG.length)];
      showFeedback("✗", fb.msg);
    }

    setTimeout(() => { quizIdx++; quizIdx >= quizQuestions.length ? showResult() : showQuestion(); }, 1500);
  }

  function showFeedback(face, msg) {
    document.getElementById("feedbackFace").textContent = face;
    document.getElementById("feedbackMsg").textContent  = msg;
    document.getElementById("quizFeedback").classList.remove("hidden");
  }

  function showResult() {
    stopTimer();
    document.getElementById("quizGame").classList.add("hidden");
    document.getElementById("quizResult").classList.remove("hidden");
    const total   = quizScore + quizWrong;
    const percent = Math.round((quizScore / total) * 100);
    const elapsed = Math.round((Date.now() - quizStartTime) / 1000);

    document.getElementById("resultScore").textContent   = `${quizScore}/${total}`;
    document.getElementById("resultPercent").textContent = `${percent}%`;
    document.getElementById("quizFill").style.width      = "100%";

    // breakdown
    const bd = document.getElementById("resultBreakdown");
    bd.innerHTML = `
      <span class="rb-correct"><strong>${quizScore}</strong>Benar</span>
      <span class="rb-wrong"><strong>${quizWrong}</strong>Salah</span>
      <span class="rb-time"><strong>${elapsed}d</strong>Waktu</span>
    `;

    let title, msg;
    if (percent === 100) { title = "Sempurna! 🌿"; msg = "Penguasaan penuh. Luar biasa!"; }
    else if (percent >= 80) { title = "Sangat Baik"; msg = "Hampir sempurna. Terus berlatih!"; }
    else if (percent >= 60) { title = "Cukup Baik";  msg = "Fondasi bagus, sedikit lagi!"; }
    else if (percent >= 40) { title = "Terus Berjuang"; msg = "Konsistensi adalah kunci."; }
    else                    { title = "Mulai Lagi"; msg = "Tinjau materi dulu ya!"; }

    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultMsg").textContent   = msg;
  }

  document.getElementById("startQuiz").addEventListener("click", () => {
    const type  = document.querySelector('[name="quizType"]:checked').value;
    quizMode    = document.querySelector('[name="quizMode"]:checked').value;
    const cnt   = parseInt(document.querySelector('[name="quizCount"]:checked').value);
    quizTimerSec = parseInt(document.querySelector('[name="quizTimer"]:checked').value);

    if (quizTimerSec === 0) document.getElementById("timerWrap").classList.add("hidden");

    let pool = type === "hiragana" ? [...HIRAGANA] : type === "katakana" ? [...KATAKANA] : [...HIRAGANA, ...KATAKANA];
    quizQuestions = shuffle(pool).slice(0, Math.min(cnt, pool.length));
    quizIdx = 0; quizScore = 0; quizWrong = 0;
    quizStartTime = Date.now();

    document.getElementById("quizSetup").classList.add("hidden");
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("quizGame").classList.remove("hidden");
    document.getElementById("quizFill").style.width = "0%";
    showQuestion();
  });

  document.getElementById("retryQuiz").addEventListener("click", () => {
    quizQuestions = shuffle(quizQuestions);
    quizIdx = 0; quizScore = 0; quizWrong = 0;
    quizStartTime = Date.now();
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("quizGame").classList.remove("hidden");
    document.getElementById("quizFill").style.width = "0%";
    showQuestion();
  });

  document.getElementById("backToSetup").addEventListener("click", () => {
    stopTimer();
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("quizSetup").classList.remove("hidden");
  });

  /* =============================================
     TOAST
     ============================================= */
  function showToast(msg, duration = 2800) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.add("hidden"), duration);
  }

  /* =============================================
     KEYBOARD SHORTCUTS
     ============================================= */
  document.addEventListener("keydown", e => {
    const active = document.querySelector(".section.active")?.id;
    if (active === "section-hiragana") {
      if (e.key === "ArrowRight") document.getElementById("hNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("hPrev").click();
      if (e.key === " ") { e.preventDefault(); document.getElementById("hFlip").click(); }
    }
    if (active === "section-katakana") {
      if (e.key === "ArrowRight") document.getElementById("kNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("kPrev").click();
      if (e.key === " ") { e.preventDefault(); document.getElementById("kFlip").click(); }
    }
    if (e.key === "Escape") closePopup();
  });

  setTimeout(() => showToast("Tip: ← → Spasi untuk navigasi flashcard!"), 1800);
});
