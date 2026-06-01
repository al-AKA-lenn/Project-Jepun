// =============================================
//  NIHONGO YOMI — APP LOGIC
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---- BACKGROUND BUBBLES ---- */
  const bubbleContainer = document.getElementById("bgBubbles");
  const bubbleColors = ["#FF85C1","#4FC3F7","#FFD740","#69F0AE","#CE93D8","#FFB74D","#FF8A80"];
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 30 + Math.random() * 80;
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${bubbleColors[Math.floor(Math.random()*bubbleColors.length)]};
      animation-duration:${8 + Math.random()*12}s;
      animation-delay:${Math.random()*10}s;
    `;
    bubbleContainer.appendChild(b);
  }

  /* ---- NAVIGATION ---- */
  const navBtns   = document.querySelectorAll(".nav-btn");
  const sections  = document.querySelectorAll(".section");
  const heroBtns  = document.querySelectorAll("[data-section]");

  function showSection(id) {
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById("section-" + id)?.classList.add("active");
    navBtns.forEach(b => {
      b.classList.toggle("active", b.dataset.section === id);
    });
    // Rotate Orihime bubble message
    if (id === "home") randomOrihimeBubble();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navBtns.forEach(b => b.addEventListener("click", () => showSection(b.dataset.section)));
  heroBtns.forEach(b => {
    if (b.dataset.section) b.addEventListener("click", () => showSection(b.dataset.section));
  });

  // Info cards navigation
  document.querySelectorAll(".info-card").forEach((card, i) => {
    const targets = ["hiragana","katakana","quiz","hiragana"];
    card.addEventListener("click", () => showSection(targets[i]));
  });

  /* ---- ORIHIME BUBBLE ---- */
  const orihimeBubble = document.getElementById("orihimeBubble");
  function randomOrihimeBubble() {
    const msg = ORIHIME_MESSAGES[Math.floor(Math.random() * ORIHIME_MESSAGES.length)];
    orihimeBubble.innerHTML = msg;
  }
  setInterval(randomOrihimeBubble, 4000);

  /* ---- BUILD CHARACTER GRIDS ---- */
  function buildGrid(data, containerId, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "char-card";
      card.dataset.group = item.group;
      card.innerHTML = `
        <span class="char-jp">${item.char}</span>
        <span class="char-roma">${item.roma}</span>
      `;
      card.addEventListener("click", () => openPopup(item, type));
      container.appendChild(card);
    });
  }

  buildGrid(HIRAGANA, "hiraganaGrid", "Hiragana");
  buildGrid(KATAKANA, "katakanaGrid", "Katakana");

  /* ---- FILTER TABS ---- */
  function setupFilter(filterId, gridId, data, type) {
    const filterEl = document.getElementById(filterId);
    filterEl.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const group = btn.dataset.group;
        const grid  = document.getElementById(gridId);
        grid.querySelectorAll(".char-card").forEach((card, i) => {
          const item = data[i];
          card.style.display = (group === "all" || item.group === group) ? "" : "none";
        });
      });
    });
  }

  setupFilter("hiraganaFilter", "hiraganaGrid", HIRAGANA, "Hiragana");
  setupFilter("katakanaFilter", "katakanaGrid", KATAKANA, "Katakana");

  /* ---- POPUP CARD ---- */
  const popup        = document.getElementById("cardPopup");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupClose   = document.getElementById("popupClose");
  const popupChar    = document.getElementById("popupChar");
  const popupRoma    = document.getElementById("popupRoma");
  const popupType    = document.getElementById("popupType");
  const popupExample = document.getElementById("popupExample");
  const popupSound   = document.getElementById("popupSound");

  function openPopup(item, type) {
    popupChar.textContent    = item.char;
    popupRoma.textContent    = item.roma;
    popupType.textContent    = type;
    popupExample.textContent = item.example || "";
    popup.classList.remove("hidden");
    popupOverlay.classList.remove("hidden");
  }

  function closePopup() {
    popup.classList.add("hidden");
    popupOverlay.classList.add("hidden");
  }

  popupClose.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", closePopup);

  popupSound.addEventListener("click", () => {
    speakJapanese(popupChar.textContent);
    popupSound.textContent = "🔊 ...";
    setTimeout(() => popupSound.textContent = "🔊 Dengarkan", 1200);
  });

  /* ---- TEXT-TO-SPEECH (Web Speech API) ---- */
  function speakJapanese(text) {
    if (!window.speechSynthesis) { showToast("Browser tidak mendukung TTS 😅"); return; }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    // Try to find a Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jpVoice = voices.find(v => v.lang.startsWith("ja"));
    if (jpVoice) utter.voice = jpVoice;
    window.speechSynthesis.speak(utter);
  }

  // Load voices
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }

  /* ---- FLASHCARDS — HIRAGANA ---- */
  let hIndex   = 0;
  let hFlipped = false;

  function updateHFlashcard() {
    const item = HIRAGANA[hIndex];
    document.getElementById("hFlashChar").textContent  = item.char;
    document.getElementById("hFlashRoma").textContent  = item.roma;
    document.getElementById("hFlashMeaning").textContent = item.example || "";
    document.getElementById("hCounter").textContent = `${hIndex+1} / ${HIRAGANA.length}`;
    const card = document.getElementById("hFlashcard");
    card.classList.remove("flipped");
    hFlipped = false;
  }

  document.getElementById("hFlip").addEventListener("click", () => {
    hFlipped = !hFlipped;
    document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped);
  });
  document.getElementById("hFlashcard").addEventListener("click", () => {
    hFlipped = !hFlipped;
    document.getElementById("hFlashcard").classList.toggle("flipped", hFlipped);
  });
  document.getElementById("hNext").addEventListener("click", () => {
    hIndex = (hIndex + 1) % HIRAGANA.length;
    updateHFlashcard();
  });
  document.getElementById("hPrev").addEventListener("click", () => {
    hIndex = (hIndex - 1 + HIRAGANA.length) % HIRAGANA.length;
    updateHFlashcard();
  });
  updateHFlashcard();

  /* ---- FLASHCARDS — KATAKANA ---- */
  let kIndex   = 0;
  let kFlipped = false;

  function updateKFlashcard() {
    const item = KATAKANA[kIndex];
    document.getElementById("kFlashChar").textContent = item.char;
    document.getElementById("kFlashRoma").textContent = item.roma;
    document.getElementById("kCounter").textContent   = `${kIndex+1} / ${KATAKANA.length}`;
    const card = document.getElementById("kFlashcard");
    card.classList.remove("flipped");
    kFlipped = false;
  }

  document.getElementById("kFlip").addEventListener("click", () => {
    kFlipped = !kFlipped;
    document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped);
  });
  document.getElementById("kFlashcard").addEventListener("click", () => {
    kFlipped = !kFlipped;
    document.getElementById("kFlashcard").classList.toggle("flipped", kFlipped);
  });
  document.getElementById("kNext").addEventListener("click", () => {
    kIndex = (kIndex + 1) % KATAKANA.length;
    updateKFlashcard();
  });
  document.getElementById("kPrev").addEventListener("click", () => {
    kIndex = (kIndex - 1 + KATAKANA.length) % KATAKANA.length;
    updateKFlashcard();
  });
  updateKFlashcard();

  /* ---- QUIZ ---- */
  let quizQuestions = [];
  let quizCurrentIndex = 0;
  let quizScore    = 0;
  let quizWrong    = 0;
  let quizMode     = "";  // charToRoma | romaToChar
  let quizAnswered = false;

  const quizSetupEl   = document.getElementById("quizSetup");
  const quizGameEl    = document.getElementById("quizGame");
  const quizResultEl  = document.getElementById("quizResult");
  const startQuizBtn  = document.getElementById("startQuiz");
  const retryBtn      = document.getElementById("retryQuiz");
  const backSetupBtn  = document.getElementById("backToSetup");
  const orihimeFeedEl = document.getElementById("orihimeFeedback");

  function getQuizConfig() {
    const type  = document.querySelector('[name="quizType"]:checked').value;
    const mode  = document.querySelector('[name="quizMode"]:checked').value;
    const count = parseInt(document.querySelector('[name="quizCount"]:checked').value);

    let pool = [];
    if (type === "hiragana")  pool = [...HIRAGANA];
    else if (type === "katakana") pool = [...KATAKANA];
    else pool = [...HIRAGANA, ...KATAKANA];

    // Shuffle
    pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
    return { pool, mode };
  }

  function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }

  function buildChoices(correct, pool, mode) {
    // Pick 3 wrong answers from pool
    const others = pool.filter(p => p.roma !== correct.roma).sort(() => Math.random() - 0.5).slice(0, 3);
    const all = shuffle([correct, ...others]);
    return all;
  }

  function showQuizQuestion() {
    const q     = quizQuestions[quizCurrentIndex];
    const fill  = (quizCurrentIndex / quizQuestions.length) * 100;
    document.getElementById("quizFill").style.width = fill + "%";
    document.getElementById("quizProgress").textContent = `Soal ${quizCurrentIndex+1}/${quizQuestions.length}`;
    document.getElementById("quizScore").textContent   = `✅ ${quizScore} | ❌ ${quizWrong}`;
    orihimeFeedEl.classList.add("hidden");
    quizAnswered = false;

    const choicesEl = document.getElementById("quizChoices");
    choicesEl.innerHTML = "";

    // Build pool for choices (same type)
    const sameTypePool = quizMode === "charToRoma"
      ? quizQuestions
      : quizQuestions;

    if (quizMode === "charToRoma") {
      document.getElementById("quizQuestion").style.fontFamily = "var(--font-jp)";
      document.getElementById("quizQuestion").style.fontSize = "5rem";
      document.getElementById("quizQuestion").textContent = q.char;
      document.getElementById("quizLabel").textContent = "Apa romaji dari aksara ini?";

      const choices = buildChoices(q, quizQuestions, quizMode);
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.roma;
        btn.addEventListener("click", () => checkAnswer(btn, choice.roma === q.roma, q.roma, "roma"));
        choicesEl.appendChild(btn);
      });

    } else {
      document.getElementById("quizQuestion").style.fontFamily = "var(--font-main)";
      document.getElementById("quizQuestion").style.fontSize = "2.8rem";
      document.getElementById("quizQuestion").textContent = q.roma;
      document.getElementById("quizLabel").textContent = "Pilih aksara yang benar!";

      const choices = buildChoices(q, quizQuestions, quizMode);
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.style.fontFamily = "var(--font-jp)";
        btn.style.fontSize = "2rem";
        btn.textContent = choice.char;
        btn.addEventListener("click", () => checkAnswer(btn, choice.char === q.char, q.char, "char"));
        choicesEl.appendChild(btn);
      });
    }
  }

  function checkAnswer(clickedBtn, isCorrect, correctAnswer, answerKey) {
    if (quizAnswered) return;
    quizAnswered = true;

    const allBtns = document.querySelectorAll(".choice-btn");
    allBtns.forEach(b => {
      b.disabled = true;
      if (b.textContent === correctAnswer || b.style.fontFamily && b.textContent === correctAnswer) {
        b.classList.add("correct");
      }
    });

    if (isCorrect) {
      clickedBtn.classList.add("correct");
      quizScore++;
      const fb = FEEDBACK_CORRECT[Math.floor(Math.random()*FEEDBACK_CORRECT.length)];
      showFeedback(fb.face, fb.msg);
      speakJapanese(quizQuestions[quizCurrentIndex].char);
    } else {
      clickedBtn.classList.add("wrong");
      // Highlight correct answer
      allBtns.forEach(b => {
        if (b.textContent === correctAnswer) b.classList.add("correct");
      });
      quizWrong++;
      const fb = FEEDBACK_WRONG[Math.floor(Math.random()*FEEDBACK_WRONG.length)];
      showFeedback(fb.face, fb.msg);
    }

    setTimeout(() => {
      quizCurrentIndex++;
      if (quizCurrentIndex >= quizQuestions.length) {
        showResult();
      } else {
        showQuizQuestion();
      }
    }, 1600);
  }

  function showFeedback(face, msg) {
    document.getElementById("feedbackFace").textContent = face;
    document.getElementById("feedbackMsg").textContent  = msg;
    orihimeFeedEl.classList.remove("hidden");
  }

  function showResult() {
    quizGameEl.classList.add("hidden");
    quizResultEl.classList.remove("hidden");

    const total   = quizScore + quizWrong;
    const percent = Math.round((quizScore / total) * 100);

    document.getElementById("resultScore").textContent   = `${quizScore}/${total}`;
    document.getElementById("resultPercent").textContent = `${percent}%`;

    let title, msg;
    if (percent === 100) { title = "SEMPURNA! 🎊"; msg = "Wah! Orihime super bangga sama kamu! がんばったね！"; }
    else if (percent >= 80) { title = "Hebat sekali! ⭐"; msg = "Kamu keren banget! Terus semangat ya! よくできました！"; }
    else if (percent >= 60) { title = "Bagus! 👍"; msg = "Lumayan! Sedikit lagi pasti master nihongo! がんばれ！"; }
    else if (percent >= 40) { title = "Terus berjuang! 💪"; msg = "Jangan nyerah ya! Latihan lagi pasti bisa! ファイト！"; }
    else { title = "Ayo coba lagi! 🌸"; msg = "Orihime percaya kamu bisa lebih baik lagi! 頑張って！"; }

    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultMsg").textContent   = msg;
    document.getElementById("quizFill").style.width    = "100%";
  }

  startQuizBtn.addEventListener("click", () => {
    const cfg       = getQuizConfig();
    quizQuestions   = cfg.pool;
    quizMode        = cfg.mode;
    quizCurrentIndex = 0;
    quizScore       = 0;
    quizWrong       = 0;

    quizSetupEl.classList.add("hidden");
    quizResultEl.classList.add("hidden");
    quizGameEl.classList.remove("hidden");
    showQuizQuestion();
  });

  retryBtn.addEventListener("click", () => {
    quizResultEl.classList.add("hidden");
    quizGameEl.classList.remove("hidden");
    // Reshuffle same config
    quizQuestions   = quizQuestions.sort(() => Math.random() - 0.5);
    quizCurrentIndex = 0;
    quizScore       = 0;
    quizWrong       = 0;
    document.getElementById("quizFill").style.width = "0%";
    showQuizQuestion();
  });

  backSetupBtn.addEventListener("click", () => {
    quizResultEl.classList.add("hidden");
    quizSetupEl.classList.remove("hidden");
  });

  /* ---- TOAST ---- */
  function showToast(msg, duration = 2500) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.add("hidden"), duration);
  }

  /* ---- KEYBOARD SHORTCUTS ---- */
  document.addEventListener("keydown", (e) => {
    const activeSection = document.querySelector(".section.active")?.id;

    // Flashcard navigation
    if (activeSection === "section-hiragana") {
      if (e.key === "ArrowRight") document.getElementById("hNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("hPrev").click();
      if (e.key === " ")          { e.preventDefault(); document.getElementById("hFlip").click(); }
    }
    if (activeSection === "section-katakana") {
      if (e.key === "ArrowRight") document.getElementById("kNext").click();
      if (e.key === "ArrowLeft")  document.getElementById("kPrev").click();
      if (e.key === " ")          { e.preventDefault(); document.getElementById("kFlip").click(); }
    }
    // Close popup
    if (e.key === "Escape") closePopup();
  });

  // Show keyboard hint toast
  setTimeout(() => {
    showToast("💡 Tips: Gunakan ← → Space untuk navigasi flashcard!", 4000);
  }, 2000);
});
