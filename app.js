// =============================================
//  NIHONGO YOMI — APP LOGIC (Elegant Edition)
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---- NAVIGATION ---- */
  const navBtns  = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");

  function showSection(id) {
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById("section-" + id)?.classList.add("active");
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.section === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navBtns.forEach(b => b.addEventListener("click", () => showSection(b.dataset.section)));

  // Hero buttons
  document.querySelectorAll("[data-section]").forEach(b => {
    if (b.tagName === "BUTTON") b.addEventListener("click", () => showSection(b.dataset.section));
  });

  // Info cards
  document.querySelectorAll(".info-card[data-target]").forEach(card => {
    card.addEventListener("click", () => showSection(card.dataset.target));
  });

  /* ---- BUILD CHARACTER GRIDS ---- */
  function buildGrid(data, containerId, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "char-card";
      card.dataset.group = item.group;
      card.innerHTML = `<span class="char-jp">${item.char}</span><span class="char-roma">${item.roma}</span>`;
      card.addEventListener("click", () => openPopup(item, type));
      container.appendChild(card);
    });
  }

  buildGrid(HIRAGANA, "hiraganaGrid", "Hiragana");
  buildGrid(KATAKANA, "katakanaGrid", "Katakana");

  /* ---- FILTER TABS ---- */
  function setupFilter(filterId, gridId, data) {
    document.getElementById(filterId).querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.getElementById(filterId).querySelectorAll(".filter-btn")
          .forEach(b => b.classList.remove("active"));
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

  /* ---- POPUP ---- */
  const popup        = document.getElementById("cardPopup");
  const popupOverlay = document.getElementById("popupOverlay");

  function openPopup(item, type) {
    document.getElementById("popupChar").textContent    = item.char;
    document.getElementById("popupRoma").textContent    = item.roma;
    document.getElementById("popupType").textContent    = type;
    document.getElementById("popupExample").textContent = item.example || "";
    popup.classList.remove("hidden");
    popupOverlay.classList.remove("hidden");
  }
  function closePopup() {
    popup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
  }

  document.getElementById("popupClose").addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", closePopup);

  document.getElementById("popupSound").addEventListener("click", () => {
    speakJapanese(document.getElementById("popupChar").textContent);
    const btn = document.getElementById("popupSound");
    btn.textContent = "▶ ...";
    setTimeout(() => btn.textContent = "▶ Dengarkan", 1400);
  });

  /* ---- TEXT-TO-SPEECH ---- */
  function speakJapanese(text) {
    if (!window.speechSynthesis) { showToast("Browser tidak mendukung TTS"); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.82;
    const voices = window.speechSynthesis.getVoices();
    const jp = voices.find(v => v.lang.startsWith("ja"));
    if (jp) utter.voice = jp;
    window.speechSynthesis.speak(utter);
  }
  if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();

  /* ---- FLASHCARD HIRAGANA ---- */
  let hIdx = 0, hFlipped = false;

  function updateHFlashcard() {
    const item = HIRAGANA[hIdx];
    document.getElementById("hFlashChar").textContent    = item.char;
    document.getElementById("hFlashRoma").textContent    = item.roma;
    document.getElementById("hFlashMeaning").textContent = item.example || "";
    document.getElementById("hCounter").textContent      = `${hIdx+1} / ${HIRAGANA.length}`;
    document.getElementById("hFlashcard").classList.remove("flipped");
    hFlipped = false;
  }

  document.getElementById("hFlashcard").addEventListener("click", () => {
    hFlipped = !hFlipped;
    document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped);
  });
  document.getElementById("hFlip").addEventListener("click", () => {
    hFlipped = !hFlipped;
    document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped);
  });
  document.getElementById("hNext").addEventListener("click", () => { hIdx = (hIdx+1) % HIRAGANA.length; updateHFlashcard(); });
  document.getElementById("hPrev").addEventListener("click", () => { hIdx = (hIdx-1+HIRAGANA.length) % HIRAGANA.length; updateHFlashcard(); });
  updateHFlashcard();

  /* ---- FLASHCARD KATAKANA ---- */
  let kIdx = 0, kFlipped = false;

  function updateKFlashcard() {
    const item = KATAKANA[kIdx];
    document.getElementById("kFlashChar").textContent = item.char;
    document.getElementById("kFlashRoma").textContent = item.roma;
    document.getElementById("kCounter").textContent   = `${kIdx+1} / ${KATAKANA.length}`;
    document.getElementById("kFlashcard").classList.remove("flipped");
    kFlipped = false;
  }

  document.getElementById("kFlashcard").addEventListener("click", () => {
    kFlipped = !kFlipped;
    document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped);
  });
  document.getElementById("kFlip").addEventListener("click", () => {
    kFlipped = !kFlipped;
    document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped);
  });
  document.getElementById("kNext").addEventListener("click", () => { kIdx = (kIdx+1) % KATAKANA.length; updateKFlashcard(); });
  document.getElementById("kPrev").addEventListener("click", () => { kIdx = (kIdx-1+KATAKANA.length) % KATAKANA.length; updateKFlashcard(); });
  updateKFlashcard();

  /* ---- QUIZ ---- */
  let quizQuestions = [], quizCurrentIndex = 0, quizScore = 0, quizWrong = 0;
  let quizMode = "", quizAnswered = false;

  const quizSetupEl  = document.getElementById("quizSetup");
  const quizGameEl   = document.getElementById("quizGame");
  const quizResultEl = document.getElementById("quizResult");

  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  function buildChoices(correct, pool) {
    const others = pool.filter(p => p.roma !== correct.roma).sort(() => Math.random() - 0.5).slice(0, 3);
    return shuffle([correct, ...others]);
  }

  function showQuestion() {
    const q = quizQuestions[quizCurrentIndex];
    document.getElementById("quizFill").style.width = (quizCurrentIndex / quizQuestions.length * 100) + "%";
    document.getElementById("quizProgress").textContent = `Soal ${quizCurrentIndex+1}/${quizQuestions.length}`;
    document.getElementById("quizScore").textContent    = `✓ ${quizScore}  ✗ ${quizWrong}`;
    document.getElementById("orihimeFeedback").classList.add("hidden");
    quizAnswered = false;

    const choicesEl = document.getElementById("quizChoices");
    choicesEl.innerHTML = "";
    const choices = buildChoices(q, quizQuestions);

    if (quizMode === "charToRoma") {
      const qEl = document.getElementById("quizQuestion");
      qEl.style.fontFamily = "var(--font-jp)";
      qEl.style.fontSize   = "5rem";
      qEl.textContent      = q.char;
      document.getElementById("quizLabel").textContent = "Apa romaji dari aksara ini?";

      choices.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = c.roma;
        btn.addEventListener("click", () => checkAnswer(btn, c.roma === q.roma, q.roma));
        choicesEl.appendChild(btn);
      });
    } else {
      const qEl = document.getElementById("quizQuestion");
      qEl.style.fontFamily = "var(--font-serif)";
      qEl.style.fontSize   = "2.8rem";
      qEl.textContent      = q.roma;
      document.getElementById("quizLabel").textContent = "Pilih aksara yang benar!";

      choices.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.style.fontFamily = "var(--font-jp)";
        btn.style.fontSize   = "2rem";
        btn.textContent = c.char;
        btn.addEventListener("click", () => checkAnswer(btn, c.char === q.char, q.char));
        choicesEl.appendChild(btn);
      });
    }
  }

  function checkAnswer(clickedBtn, isCorrect, correctAnswer) {
    if (quizAnswered) return;
    quizAnswered = true;

    document.querySelectorAll(".choice-btn").forEach(b => {
      b.disabled = true;
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });

    if (isCorrect) {
      clickedBtn.classList.add("correct");
      quizScore++;
      showFeedback("✓", FEEDBACK_CORRECT[Math.floor(Math.random()*FEEDBACK_CORRECT.length)].msg);
      speakJapanese(quizQuestions[quizCurrentIndex].char);
    } else {
      clickedBtn.classList.add("wrong");
      quizWrong++;
      showFeedback("✗", FEEDBACK_WRONG[Math.floor(Math.random()*FEEDBACK_WRONG.length)].msg);
    }

    setTimeout(() => {
      quizCurrentIndex++;
      if (quizCurrentIndex >= quizQuestions.length) showResult();
      else showQuestion();
    }, 1500);
  }

  function showFeedback(face, msg) {
    document.getElementById("feedbackFace").textContent = face;
    document.getElementById("feedbackMsg").textContent  = msg;
    document.getElementById("orihimeFeedback").classList.remove("hidden");
  }

  function showResult() {
    quizGameEl.classList.add("hidden");
    quizResultEl.classList.remove("hidden");
    const total   = quizScore + quizWrong;
    const percent = Math.round((quizScore / total) * 100);
    document.getElementById("resultScore").textContent   = `${quizScore}/${total}`;
    document.getElementById("resultPercent").textContent = `${percent}%`;
    document.getElementById("quizFill").style.width = "100%";

    let title, msg;
    if (percent === 100) { title = "Sempurna!"; msg = "Penguasaan penuh. Luar biasa."; }
    else if (percent >= 80) { title = "Sangat Baik"; msg = "Hampir sempurna. Sedikit lagi!"; }
    else if (percent >= 60) { title = "Cukup Baik"; msg = "Fondasi yang bagus. Terus berlatih."; }
    else if (percent >= 40) { title = "Terus Berlatih"; msg = "Konsistensi adalah kunci. Jangan berhenti."; }
    else                   { title = "Mulai Lagi"; msg = "Tinjau kembali materi dan coba lagi."; }

    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultMsg").textContent   = msg;
  }

  document.getElementById("startQuiz").addEventListener("click", () => {
    const type  = document.querySelector('[name="quizType"]:checked').value;
    quizMode    = document.querySelector('[name="quizMode"]:checked').value;
    const count = parseInt(document.querySelector('[name="quizCount"]:checked').value);

    let pool = type === "hiragana" ? [...HIRAGANA] : type === "katakana" ? [...KATAKANA] : [...HIRAGANA, ...KATAKANA];
    quizQuestions    = shuffle(pool).slice(0, Math.min(count, pool.length));
    quizCurrentIndex = 0; quizScore = 0; quizWrong = 0;

    quizSetupEl.classList.add("hidden");
    quizResultEl.classList.add("hidden");
    quizGameEl.classList.remove("hidden");
    document.getElementById("quizFill").style.width = "0%";
    showQuestion();
  });

  document.getElementById("retryQuiz").addEventListener("click", () => {
    quizQuestions    = shuffle(quizQuestions);
    quizCurrentIndex = 0; quizScore = 0; quizWrong = 0;
    quizResultEl.classList.add("hidden");
    quizGameEl.classList.remove("hidden");
    document.getElementById("quizFill").style.width = "0%";
    showQuestion();
  });

  document.getElementById("backToSetup").addEventListener("click", () => {
    quizResultEl.classList.add("hidden");
    quizSetupEl.classList.remove("hidden");
  });

  /* ---- TOAST ---- */
  function showToast(msg, duration = 2800) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.add("hidden"), duration);
  }

  /* ---- KEYBOARD SHORTCUTS ---- */
  document.addEventListener("keydown", e => {
    const active = document.querySelector(".section.active")?.id;
    if (active === "section-hiragana") {
      if (e.key === "ArrowRight") document.getElementById("hNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("hPrev").click();
      if (e.key === " ")          { e.preventDefault(); document.getElementById("hFlip").click(); }
    }
    if (active === "section-katakana") {
      if (e.key === "ArrowRight") document.getElementById("kNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("kPrev").click();
      if (e.key === " ")          { e.preventDefault(); document.getElementById("kFlip").click(); }
    }
    if (e.key === "Escape") closePopup();
  });

  setTimeout(() => showToast("Tip: Gunakan ← → dan Spasi untuk flashcard"), 1800);
});
