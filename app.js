// =============================================
//  NIHONGO YOMI — APP LOGIC v4
//  Badge + Chart + Budaya + Favorit + Daily Word
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---- UTILS ---- */
  const $ = id => document.getElementById(id);
  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
  function capitalize(s) { return s.trim().charAt(0).toUpperCase() + s.trim().slice(1); }
  function todayStr() { return new Date().toISOString().slice(0,10); }
  function lsGet(k,def) { try { const v=localStorage.getItem(k); return v!==null?JSON.parse(v):def; } catch{ return def; } }
  function lsSet(k,v)   { try { localStorage.setItem(k,JSON.stringify(v)); } catch{} }

  /* =============================================
     LOGIN
     ============================================= */
  function applyName(name) {
    $("heroName").textContent = name;
    // sidebar
    if($("sidebarName"))  $("sidebarName").textContent  = name;
    if($("sidebarAvatar")) $("sidebarAvatar").textContent = name.charAt(0).toUpperCase();
    // mobile topbar
    if($("headerGreeting")) $("headerGreeting").textContent = `Halo, ${name}! 🌿`;
  }
  function enterApp(name) {
    applyName(name);
    $("loginScreen").classList.add("hidden");
    $("appWrap").classList.remove("hidden");
    checkStreak(); updateProgress(); renderDailyWord();
    renderBadges(); renderChart(); renderFav();
  }
  function doLogin() {
    const raw = $("nameInput").value.trim();
    if (!raw) { $("nameInput").classList.remove("shake"); void $("nameInput").offsetWidth; $("nameInput").classList.add("shake"); return; }
    const name = capitalize(raw);
    sessionStorage.setItem("nihongoName", name);
    $("loginScreen").style.transition = "opacity 0.35s";
    $("loginScreen").style.opacity = "0";
    setTimeout(() => enterApp(name), 330);
  }
  $("loginBtn").addEventListener("click", doLogin);
  $("nameInput").addEventListener("keydown", e => { if(e.key==="Enter") doLogin(); });
  $("nameInput").addEventListener("animationend", () => $("nameInput").classList.remove("shake"));
  function doLogout() {
    sessionStorage.removeItem("nihongoName");
    $("appWrap").classList.add("hidden");
    $("loginScreen").classList.remove("hidden");
    $("loginScreen").style.opacity="1";
    $("nameInput").value=""; $("nameInput").focus();
  }
  if($("logoutBtn"))     $("logoutBtn").addEventListener("click", doLogout);
  if($("sidebarLogout")) $("sidebarLogout").addEventListener("click", doLogout);
  const savedName = sessionStorage.getItem("nihongoName");
  if (savedName) enterApp(savedName);

  /* =============================================
     NAVIGATION
     ============================================= */
  const navBtns  = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");
  function showSection(id) {
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById("section-"+id)?.classList.add("active");
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.section===id));
    window.scrollTo({top:0,behavior:"smooth"});
    if (id==="favorit") renderFav();
  }
  // Wire ALL nav buttons: sidebar, mobile bottom nav, hero buttons
  document.querySelectorAll(".sidebar-btn, .mbn-btn, [data-section]").forEach(b => {
    if(b.tagName==="BUTTON") b.addEventListener("click",()=>{ if(b.dataset.section) showSection(b.dataset.section); });
  });
  document.querySelectorAll(".info-card[data-target]").forEach(c =>
    c.addEventListener("click",()=>showSection(c.dataset.target))
  );

  /* =============================================
     STREAK
     ============================================= */
  function checkStreak() {
    const today=todayStr(), yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    let streak=lsGet("nihongo_streak",0), last=lsGet("nihongo_lastvisit","");
    if(last!==today) {
      streak = last===yesterday ? streak+1 : 1;
      lsSet("nihongo_streak",streak); lsSet("nihongo_lastvisit",today);
    }
    $("streakCount").textContent = streak;
    if($("streakCountLg"))    $("streakCountLg").textContent    = streak;
    if($("sidebarStreakNum")) $("sidebarStreakNum").textContent  = streak;
    $("streakBannerTitle").textContent = streak>1 ? `🔥 Streak ${streak} hari berturut-turut!` : "🔥 Streak dimulai hari ini!";
    $("streakBannerSub").textContent   = streak>1 ? `Kamu sudah belajar ${streak} hari berturut-turut. Jangan putus!` : "Belajar setiap hari untuk membangun streak!";
    const dotsEl=$("streakDots"); dotsEl.innerHTML="";
    const days=["M","S","R","K","J","S","M"], now=new Date();
    for(let i=6;i>=0;i--) {
      const d=new Date(now.getTime()-i*86400000), str=d.toISOString().slice(0,10);
      const dot=document.createElement("div"); dot.className="streak-dot";
      if(str===today) { dot.classList.add("today"); dot.textContent="✓"; }
      else if(i<streak) { dot.classList.add("active"); dot.textContent="🔥"; }
      else dot.textContent=days[d.getDay()];
      dotsEl.appendChild(dot);
    }
  }

  /* =============================================
     PROGRESS
     ============================================= */
  function getStats() {
    return {
      hSeen:   lsGet("nihongo_h_seen",[]).length,
      kSeen:   lsGet("nihongo_k_seen",[]).length,
      vSeen:   lsGet("nihongo_v_seen",[]).length,
      bSeen:   lsGet("nihongo_b_seen",[]).length,
      streak:  lsGet("nihongo_streak",0),
      quizDone:    lsGet("nihongo_quiz_done",0),
      perfectQuiz: lsGet("nihongo_quiz_perfect",0),
      favCount:    [...lsGet("nihongo_fav_chars",[]), ...lsGet("nihongo_fav_vocab",[])].length,
      budayaSeen:  lsGet("nihongo_b_seen",[]).length,
      dailyOpened: lsGet("nihongo_daily_opened",0),
    };
  }
  function updateProgress() {
    const s=getStats();
    $("progHiragana").style.width    = Math.round(s.hSeen/HIRAGANA.length*100)+"%";
    $("progKatakana").style.width    = Math.round(s.kSeen/KATAKANA.length*100)+"%";
    $("progVocab").style.width       = Math.round(s.vSeen/VOCABULARY.length*100)+"%";
    $("progBudaya").style.width      = Math.round(s.bSeen/BUDAYA.length*100)+"%";
    $("progHiraganaNum").textContent = `${s.hSeen}/${HIRAGANA.length}`;
    $("progKatakanaNum").textContent = `${s.kSeen}/${KATAKANA.length}`;
    $("progVocabNum").textContent    = `${s.vSeen}/${VOCABULARY.length}`;
    $("progBudayaNum").textContent   = `${s.bSeen}/${BUDAYA.length}`;
    checkBadgeUnlocks();
  }
  function markSeen(type, index) {
    const key="nihongo_"+type+"_seen", seen=lsGet(key,[]);
    if(!seen.includes(index)) { seen.push(index); lsSet(key,seen); }
    updateProgress();
  }

  /* =============================================
     DAILY WORD
     ============================================= */
  function renderDailyWord() {
    const today=todayStr(), seed=today.replace(/-/g,"");
    const idx = parseInt(seed) % VOCABULARY.length;
    const word = VOCABULARY[idx];
    $("dailyJp").textContent   = word.jp;
    $("dailyRoma").textContent = word.roma;
    $("dailyIndo").textContent = word.indo;
    const opened = lsGet("nihongo_daily_opened",0)+1;
    lsSet("nihongo_daily_opened", opened);
    $("dailySound").addEventListener("click", () => { speakJapanese(word.jp); });
  }

  /* =============================================
     BADGES
     ============================================= */
  function checkBadgeUnlocks() {
    const s=getStats();
    const unlocked=lsGet("nihongo_badges",[]);
    let newUnlock=false;
    BADGES.forEach(b => {
      if(!unlocked.includes(b.id) && b.check(s)) {
        unlocked.push(b.id); newUnlock=true;
        showToast(`🏅 Badge baru: ${b.title}!`, 3500);
      }
    });
    if(newUnlock) {
      lsSet("nihongo_badges",unlocked);
      $("badgeNewDot").classList.remove("hidden");
    }
  }
  function renderBadges() {
    const unlocked=lsGet("nihongo_badges",[]);
    const grid=$("badgesGrid"); grid.innerHTML="";
    BADGES.forEach(b => {
      const isUnlocked=unlocked.includes(b.id);
      const el=document.createElement("div");
      el.className="badge-item "+(isUnlocked?"unlocked":"locked");
      el.innerHTML=`
        <span class="badge-icon">${b.icon}</span>
        <div class="badge-name">${b.title}</div>
        <div class="badge-desc">${b.desc}</div>
        ${isUnlocked?'<div class="badge-unlocked-tag">✓ Diraih!</div>':''}
      `;
      grid.appendChild(el);
    });
  }
  function openBadgesModal() {
    renderBadges();
    $("badgesModal").classList.remove("hidden");
    $("badgesOverlay").classList.remove("hidden");
    if($("badgeNewDot"))   $("badgeNewDot").classList.add("hidden");
    if($("badgeNewDotLg")) $("badgeNewDotLg").classList.add("hidden");
  }
  if($("badgeBell"))   $("badgeBell").addEventListener("click", openBadgesModal);
  if($("badgeBellLg")) $("badgeBellLg").addEventListener("click", openBadgesModal);
  $("badgesClose").addEventListener("click",()=>{ $("badgesModal").classList.add("hidden"); $("badgesOverlay").classList.add("hidden"); });
  $("badgesOverlay").addEventListener("click",()=>{ $("badgesModal").classList.add("hidden"); $("badgesOverlay").classList.add("hidden"); });

  /* =============================================
     QUIZ CHART
     ============================================= */
  let chartInstance=null;
  function renderChart() {
    const history=lsGet("nihongo_quiz_history",[]);
    if(!history.length) { $("quizChartWrap").classList.add("hidden"); $("chartEmpty").classList.remove("hidden"); return; }
    $("quizChartWrap").classList.remove("hidden"); $("chartEmpty").classList.add("hidden");
    const labels=history.map((_,i)=>`Kuis ${i+1}`);
    const data  =history.map(h=>h.percent);
    if(chartInstance) chartInstance.destroy();
    chartInstance=new Chart($("quizChart"),{
      type:"line",
      data:{
        labels,
        datasets:[{
          label:"Skor (%)", data,
          borderColor:"#6a9c72", backgroundColor:"rgba(106,156,114,0.08)",
          borderWidth:2, pointRadius:4, pointBackgroundColor:"#6a9c72",
          tension:0.35, fill:true,
        }]
      },
      options:{
        responsive:true, plugins:{legend:{display:false}},
        scales:{
          y:{ min:0, max:100, ticks:{ color:"#7a9179", font:{size:11} }, grid:{color:"rgba(106,156,114,0.1)"} },
          x:{ ticks:{ color:"#7a9179", font:{size:11} }, grid:{display:false} }
        }
      }
    });
  }

  /* =============================================
     CHAR GRIDS
     ============================================= */
  function buildGrid(data, containerId, type, seenKey) {
    const container=document.getElementById(containerId); container.innerHTML="";
    data.forEach((item,i) => {
      const favKey="nihongo_fav_chars";
      const favId=`${seenKey}-${i}`;
      const isFav=lsGet(favKey,[]).includes(favId);
      const card=document.createElement("div");
      card.className="char-card"; card.dataset.group=item.group;
      card.innerHTML=`
        <span class="char-jp">${item.char}</span>
        <span class="char-roma">${item.roma}</span>
        <button class="char-fav-star${isFav?" active":""}" data-fav="${favId}" title="Favorit">⭐</button>
      `;
      card.querySelector(".char-fav-star").addEventListener("click",e=>{
        e.stopPropagation(); toggleCharFav(favId, e.currentTarget);
      });
      card.addEventListener("click",()=>{ markSeen(seenKey,i); openPopup(item,type,favId); });
      container.appendChild(card);
    });
  }
  function toggleCharFav(favId, btn) {
    const favs=lsGet("nihongo_fav_chars",[]);
    const idx=favs.indexOf(favId);
    if(idx>=0) favs.splice(idx,1); else favs.push(favId);
    lsSet("nihongo_fav_chars",favs);
    btn.classList.toggle("active", favs.includes(favId));
    updateProgress();
  }
  buildGrid(HIRAGANA,"hiraganaGrid","Hiragana","h");
  buildGrid(KATAKANA,"katakanaGrid","Katakana","k");

  function setupFilter(filterId,gridId,data) {
    document.getElementById(filterId).querySelectorAll(".filter-btn").forEach(btn=>{
      btn.addEventListener("click",()=>{
        document.getElementById(filterId).querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        const group=btn.dataset.group;
        document.getElementById(gridId).querySelectorAll(".char-card").forEach((card,i)=>{
          card.style.display=(group==="all"||data[i].group===group)?"":"none";
        });
      });
    });
  }
  setupFilter("hiraganaFilter","hiraganaGrid",HIRAGANA);
  setupFilter("katakanaFilter","katakanaGrid",KATAKANA);

  /* =============================================
     POPUP (CHAR)
     ============================================= */
  let currentPopupFavId="";
  function openPopup(item,type,favId) {
    currentPopupFavId=favId;
    $("popupChar").textContent    = item.char;
    $("popupRoma").textContent    = item.roma;
    $("popupType").textContent    = type;
    $("popupExample").textContent = item.example||"";
    const isFav=lsGet("nihongo_fav_chars",[]).includes(favId);
    $("popupFavBtn").classList.toggle("active",isFav);
    $("cardPopup").classList.remove("hidden");
    $("popupOverlay").classList.remove("hidden");
  }
  function closePopup() { $("cardPopup").classList.add("hidden"); $("popupOverlay").classList.add("hidden"); }
  $("popupClose").addEventListener("click",closePopup);
  $("popupOverlay").addEventListener("click",closePopup);
  $("popupFavBtn").addEventListener("click",()=>{
    toggleCharFav(currentPopupFavId, $("popupFavBtn"));
    document.querySelector(`.char-fav-star[data-fav="${currentPopupFavId}"]`)?.classList.toggle("active", lsGet("nihongo_fav_chars",[]).includes(currentPopupFavId));
  });
  $("popupSound").addEventListener("click",()=>{
    speakJapanese($("popupChar").textContent);
    $("popupSound").textContent="▶ ...";
    setTimeout(()=>$("popupSound").textContent="▶ Dengarkan",1400);
  });

  /* =============================================
     TTS
     ============================================= */
  function speakJapanese(text) {
    if(!window.speechSynthesis){ showToast("Browser tidak mendukung TTS"); return; }
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang="ja-JP"; u.rate=0.82;
    const jp=window.speechSynthesis.getVoices().find(v=>v.lang.startsWith("ja"));
    if(jp) u.voice=jp; window.speechSynthesis.speak(u);
  }
  if(window.speechSynthesis) window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();

  /* =============================================
     FLASHCARDS
     ============================================= */
  let hIdx=0,hFlipped=false;
  function updateHFC() {
    const item=HIRAGANA[hIdx];
    $("hFlashChar").textContent=$("hFlashMeaning").textContent="";
    $("hFlashChar").textContent=item.char; $("hFlashRoma").textContent=item.roma;
    $("hFlashMeaning").textContent=item.example||"";
    $("hCounter").textContent=`${hIdx+1} / ${HIRAGANA.length}`;
    $("hFlashcard").classList.remove("flipped"); hFlipped=false; markSeen("h",hIdx);
  }
  $("hFlashcard").addEventListener("click",()=>{ hFlipped=!hFlipped; $("hFlashcard").classList.toggle("flipped",hFlipped); });
  $("hFlip").addEventListener("click",()=>{ hFlipped=!hFlipped; $("hFlashcard").classList.toggle("flipped",hFlipped); });
  $("hNext").addEventListener("click",()=>{ hIdx=(hIdx+1)%HIRAGANA.length; updateHFC(); });
  $("hPrev").addEventListener("click",()=>{ hIdx=(hIdx-1+HIRAGANA.length)%HIRAGANA.length; updateHFC(); });
  updateHFC();

  let kIdx=0,kFlipped=false;
  function updateKFC() {
    const item=KATAKANA[kIdx];
    $("kFlashChar").textContent=item.char; $("kFlashRoma").textContent=item.roma;
    $("kCounter").textContent=`${kIdx+1} / ${KATAKANA.length}`;
    $("kFlashcard").classList.remove("flipped"); kFlipped=false; markSeen("k",kIdx);
  }
  $("kFlashcard").addEventListener("click",()=>{ kFlipped=!kFlipped; $("kFlashcard").classList.toggle("flipped",kFlipped); });
  $("kFlip").addEventListener("click",()=>{ kFlipped=!kFlipped; $("kFlashcard").classList.toggle("flipped",kFlipped); });
  $("kNext").addEventListener("click",()=>{ kIdx=(kIdx+1)%KATAKANA.length; updateKFC(); });
  $("kPrev").addEventListener("click",()=>{ kIdx=(kIdx-1+KATAKANA.length)%KATAKANA.length; updateKFC(); });
  updateKFC();

  /* =============================================
     KOSAKATA
     ============================================= */
  const vocabFilterEl=$("vocabFilter"), vocabGridEl=$("vocabGrid"), vocabSearchEl=$("vocabSearch");
  let activeVocabCat="all";
  VOCAB_CATEGORIES.forEach(cat=>{
    const btn=document.createElement("button");
    btn.className="filter-btn"+(cat.id==="all"?" active":""); btn.dataset.cat=cat.id;
    btn.textContent=`${cat.emoji} ${cat.label}`;
    btn.addEventListener("click",()=>{
      vocabFilterEl.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active"); activeVocabCat=cat.id; renderVocab();
    });
    vocabFilterEl.appendChild(btn);
  });

  function renderVocab() {
    const q=vocabSearchEl.value.trim().toLowerCase();
    const list=VOCABULARY.filter(v=>{
      const matchCat=activeVocabCat==="all"||v.category===activeVocabCat;
      const matchQ=!q||v.indo.toLowerCase().includes(q)||v.jp.includes(q)||v.roma.toLowerCase().includes(q);
      return matchCat&&matchQ;
    });
    vocabGridEl.innerHTML="";
    $("vocabEmpty").classList.toggle("hidden",list.length>0);
    list.forEach(item=>{
      const catLabel=VOCAB_CATEGORIES.find(c=>c.id===item.category)?.label||item.category;
      const favKey="nihongo_fav_vocab", favId=`v-${item.id}`;
      const isFav=lsGet(favKey,[]).includes(favId);
      const card=document.createElement("div"); card.className="vocab-card";
      card.innerHTML=`
        <button class="vocab-sound-btn" title="Dengarkan">▶</button>
        <button class="vocab-fav-btn${isFav?" active":""}" data-fid="${favId}" title="Favorit">⭐</button>
        <div class="vocab-card-top">
          <div class="vocab-indo">${item.indo}</div>
          <span class="vocab-category-tag">${catLabel}</span>
        </div>
        ${item.note&&(item.note.includes("な — ")||item.note.includes("い — "))?`<span class="adj-badge ${item.note.includes("な — ")?"adj-na":"adj-i"}">${item.note.includes("な — ")?"な 形容詞":"い 形容詞"}</span>`:""}\n        <div class="vocab-jp">${item.jp}</div>
        <div class="vocab-roma">${item.roma}</div>
        <div class="vocab-note">${item.note}</div>
      `;
      card.querySelector(".vocab-sound-btn").addEventListener("click",e=>{
        e.stopPropagation(); speakJapanese(item.jp); markSeen("v",item.id-1);
      });
      card.querySelector(".vocab-fav-btn").addEventListener("click",e=>{
        e.stopPropagation(); toggleVocabFav(favId, e.currentTarget);
      });
      card.addEventListener("click",()=>{ speakJapanese(item.jp); markSeen("v",item.id-1); });
      vocabGridEl.appendChild(card);
    });
  }
  function toggleVocabFav(favId,btn) {
    const favs=lsGet("nihongo_fav_vocab",[]), idx=favs.indexOf(favId);
    if(idx>=0) favs.splice(idx,1); else favs.push(favId);
    lsSet("nihongo_fav_vocab",favs);
    btn.classList.toggle("active",favs.includes(favId));
    updateProgress();
  }
  vocabSearchEl.addEventListener("input",renderVocab);
  renderVocab();

  /* =============================================
     BUDAYA
     ============================================= */
  const budayaFilterEl=$("budayaFilter");
  let activeBudayaCat="all";
  BUDAYA_CATEGORIES.forEach(cat=>{
    const btn=document.createElement("button");
    btn.className="filter-btn"+(cat.id==="all"?" active":""); btn.dataset.cat=cat.id;
    btn.textContent=`${cat.emoji} ${cat.label}`;
    btn.addEventListener("click",()=>{
      budayaFilterEl.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active"); activeBudayaCat=cat.id; renderBudaya();
    });
    budayaFilterEl.appendChild(btn);
  });

  function renderBudaya() {
    const grid=$("budayaGrid"); grid.innerHTML="";
    const seen=lsGet("nihongo_b_seen",[]);
    const list=BUDAYA.filter(b=>activeBudayaCat==="all"||b.category===activeBudayaCat);
    list.forEach(item=>{
      const isSeen=seen.includes(item.id);
      const catLabel=BUDAYA_CATEGORIES.find(c=>c.id===item.category)?.label||item.category;
      const card=document.createElement("div"); card.className="budaya-card";
      card.innerHTML=`
        <div class="budaya-card-top">
          <span class="budaya-emoji">${item.emoji}</span>
          <div>
            <div class="budaya-card-title">${item.title}</div>
          </div>
        </div>
        <span class="budaya-cat-tag">${catLabel}</span>
        ${isSeen?'<span class="budaya-seen-badge">✓ Sudah dibaca</span>':""}
        <div class="budaya-preview">${item.short||item.body||""}</div>
        <div class="budaya-read-more">Baca selengkapnya →</div>
      `;
      card.addEventListener("click",()=>{ openBudayaPopup(item); markBudayaSeen(item.id); });
      grid.appendChild(card);
    });
  }

  function markBudayaSeen(id) {
    const seen=lsGet("nihongo_b_seen",[]);
    if(!seen.includes(id)) { seen.push(id); lsSet("nihongo_b_seen",seen); updateProgress(); }
  }

  function openBudayaPopup(item) {
    $("budayaPopupEmoji").textContent = item.emoji;
    $("budayaPopupTitle").textContent = item.title;
    $("budayaPopupBody").textContent  = item.detail||item.body||"";
    const factsEl=$("budayaPopupFacts"); factsEl.innerHTML="";
    const factsData = item.facts || item.tags || [];
    factsData.forEach(f=>{ const li=document.createElement("li"); li.textContent=f; factsEl.appendChild(li); });
    $("budayaPopupTip").textContent = item.tip || "";
    $("budayaPopupTip").style.display = (item.tip) ? "" : "none";
    $("budayaPopup").classList.remove("hidden");
    $("popupOverlay").classList.remove("hidden");
  }
  $("budayaPopupClose").addEventListener("click",()=>{ $("budayaPopup").classList.add("hidden"); $("popupOverlay").classList.add("hidden"); });
  renderBudaya();

  // reuse popupOverlay for both
  $("popupOverlay").addEventListener("click",()=>{
    $("cardPopup").classList.add("hidden");
    $("budayaPopup").classList.add("hidden");
    $("popupOverlay").classList.add("hidden");
  });

  /* =============================================
     FAVORIT
     ============================================= */
  function renderFav() {
    const charFavs=lsGet("nihongo_fav_chars",[]);
    const vocabFavs=lsGet("nihongo_fav_vocab",[]);
    const charGrid=$("favCharGrid"), vocabGrid=$("favVocabGrid");
    charGrid.innerHTML=""; vocabGrid.innerHTML="";

    // Char favorites
    charFavs.forEach(favId=>{
      const [type,idxStr]=favId.split("-");
      const idx=parseInt(idxStr);
      const arr=type==="h"?HIRAGANA:KATAKANA;
      const item=arr[idx]; if(!item) return;
      const typeLabel=type==="h"?"Hiragana":"Katakana";
      const card=document.createElement("div"); card.className="char-card"; card.dataset.group=item.group;
      card.innerHTML=`<span class="char-jp">${item.char}</span><span class="char-roma">${item.roma}</span><button class="char-fav-star active" data-fav="${favId}" title="Hapus favorit">⭐</button>`;
      card.querySelector(".char-fav-star").addEventListener("click",e=>{
        e.stopPropagation(); toggleCharFav(favId,e.currentTarget); renderFav();
        document.querySelector(`.char-fav-star[data-fav="${favId}"]`)?.classList.toggle("active",false);
      });
      card.addEventListener("click",()=>openPopup(item,typeLabel,favId));
      charGrid.appendChild(card);
    });

    // Vocab favorites
    vocabFavs.forEach(favId=>{
      const id=parseInt(favId.replace("v-",""));
      const item=VOCABULARY.find(v=>v.id===id); if(!item) return;
      const catLabel=VOCAB_CATEGORIES.find(c=>c.id===item.category)?.label||item.category;
      const card=document.createElement("div"); card.className="vocab-card";
      card.innerHTML=`
        <button class="vocab-sound-btn" title="Dengarkan">▶</button>
        <button class="vocab-fav-btn active" data-fid="${favId}" title="Hapus favorit">⭐</button>
        <div class="vocab-card-top"><div class="vocab-indo">${item.indo}</div><span class="vocab-category-tag">${catLabel}</span></div>
        <div class="vocab-jp">${item.jp}</div>
        <div class="vocab-roma">${item.roma}</div>
        <div class="vocab-note">${item.note}</div>
      `;
      card.querySelector(".vocab-sound-btn").addEventListener("click",e=>{ e.stopPropagation(); speakJapanese(item.jp); });
      card.querySelector(".vocab-fav-btn").addEventListener("click",e=>{ e.stopPropagation(); toggleVocabFav(favId,e.currentTarget); renderFav(); });
      vocabGrid.appendChild(card);
    });

    const isEmpty=charFavs.length===0&&vocabFavs.length===0;
    $("favEmpty").classList.toggle("hidden",!isEmpty);
  }

  // Fav tabs
  $("favTabChar").addEventListener("click",()=>{
    $("favTabChar").classList.add("active"); $("favTabVocab").classList.remove("active");
    $("favCharGrid").style.display=""; $("favVocabGrid").style.display="none";
  });
  $("favTabVocab").addEventListener("click",()=>{
    $("favTabVocab").classList.add("active"); $("favTabChar").classList.remove("active");
    $("favVocabGrid").style.display=""; $("favCharGrid").style.display="none";
  });

  /* =============================================
     QUIZ
     ============================================= */
  let quizQuestions=[],quizIdx=0,quizScore=0,quizWrong=0;
  let quizMode="",quizTimerSec=0,quizAnswered=false,timerInterval=null;
  const CIRC=2*Math.PI*20;

  function buildChoices(correct,pool) {
    const others=pool.filter(p=>p.roma!==correct.roma).sort(()=>Math.random()-0.5).slice(0,3);
    return shuffle([correct,...others]);
  }
  function startTimer() {
    if(!quizTimerSec) return;
    let rem=quizTimerSec;
    const arc=$("timerArc"),numEl=$("timerNum");
    $("timerWrap").classList.remove("hidden");
    arc.style.strokeDashoffset="0"; arc.classList.remove("warning","danger");
    clearInterval(timerInterval);
    timerInterval=setInterval(()=>{
      rem--;numEl.textContent=rem;
      arc.style.strokeDashoffset=CIRC*(1-rem/quizTimerSec);
      if(rem/quizTimerSec<=0.3){ arc.classList.add("danger"); arc.classList.remove("warning"); }
      else if(rem/quizTimerSec<=0.5) arc.classList.add("warning");
      if(rem<=0){ clearInterval(timerInterval); if(!quizAnswered) timeOut(); }
    },1000);
  }
  function stopTimer() { clearInterval(timerInterval); }
  function timeOut() {
    quizAnswered=true; quizWrong++;
    document.querySelectorAll(".choice-btn").forEach(b=>{
      b.disabled=true;
      const q=quizQuestions[quizIdx];
      if(quizMode==="charToRoma"&&b.textContent===q.roma) b.classList.add("correct");
      if(quizMode==="romaToChar"&&b.textContent===q.char) b.classList.add("correct");
    });
    showFeedback("⏱","Waktu habis! もう一度！");
    setTimeout(()=>{ quizIdx++; quizIdx>=quizQuestions.length?showResult():showQuestion(); },1500);
  }
  function showQuestion() {
    stopTimer();
    const q=quizQuestions[quizIdx];
    $("quizFill").style.width=(quizIdx/quizQuestions.length*100)+"%";
    $("quizProgress").textContent=`Soal ${quizIdx+1}/${quizQuestions.length}`;
    $("quizScore").textContent=`✓ ${quizScore}  ✗ ${quizWrong}`;
    $("quizFeedback").classList.add("hidden"); quizAnswered=false;
    const choicesEl=$("quizChoices"); choicesEl.innerHTML="";
    const choices=buildChoices(q,quizQuestions);
    if(quizMode==="charToRoma"){
      const qEl=$("quizQuestion"); qEl.style.fontFamily="var(--font-jp)"; qEl.style.fontSize="5rem"; qEl.textContent=q.char;
      $("quizLabel").textContent="Apa romaji dari aksara ini?";
      choices.forEach(c=>{ const btn=document.createElement("button"); btn.className="choice-btn"; btn.textContent=c.roma; btn.addEventListener("click",()=>checkAnswer(btn,c.roma===q.roma,q.roma)); choicesEl.appendChild(btn); });
    } else {
      const qEl=$("quizQuestion"); qEl.style.fontFamily="var(--font-serif)"; qEl.style.fontSize="2.8rem"; qEl.textContent=q.roma;
      $("quizLabel").textContent="Pilih aksara yang benar!";
      choices.forEach(c=>{ const btn=document.createElement("button"); btn.className="choice-btn"; btn.style.fontFamily="var(--font-jp)"; btn.style.fontSize="2rem"; btn.textContent=c.char; btn.addEventListener("click",()=>checkAnswer(btn,c.char===q.char,q.char)); choicesEl.appendChild(btn); });
    }
    startTimer();
  }
  function checkAnswer(clickedBtn,isCorrect,correctAnswer) {
    if(quizAnswered) return; quizAnswered=true; stopTimer();
    document.querySelectorAll(".choice-btn").forEach(b=>{ b.disabled=true; if(b.textContent===correctAnswer) b.classList.add("correct"); });
    if(isCorrect){ clickedBtn.classList.add("correct"); quizScore++; showFeedback("✓",FEEDBACK_CORRECT[Math.floor(Math.random()*FEEDBACK_CORRECT.length)].msg); speakJapanese(quizQuestions[quizIdx].char); }
    else { clickedBtn.classList.add("wrong"); quizWrong++; showFeedback("✗",FEEDBACK_WRONG[Math.floor(Math.random()*FEEDBACK_WRONG.length)].msg); }
    setTimeout(()=>{ quizIdx++; quizIdx>=quizQuestions.length?showResult():showQuestion(); },1500);
  }
  function showFeedback(face,msg){ $("feedbackFace").textContent=face; $("feedbackMsg").textContent=msg; $("quizFeedback").classList.remove("hidden"); }
  function showResult() {
    stopTimer(); $("quizGame").classList.add("hidden"); $("quizResult").classList.remove("hidden");
    const total=quizScore+quizWrong, percent=Math.round(quizScore/total*100);
    $("resultScore").textContent=`${quizScore}/${total}`; $("resultPercent").textContent=`${percent}%`; $("quizFill").style.width="100%";
    $("resultBreakdown").innerHTML=`<span class="rb-correct"><strong>${quizScore}</strong>Benar</span><span class="rb-wrong"><strong>${quizWrong}</strong>Salah</span>`;
    let title,msg;
    if(percent===100){title="Sempurna! 🌿";msg="Penguasaan penuh. Luar biasa!";}
    else if(percent>=80){title="Sangat Baik";msg="Hampir sempurna. Terus berlatih!";}
    else if(percent>=60){title="Cukup Baik";msg="Fondasi bagus, sedikit lagi!";}
    else if(percent>=40){title="Terus Berjuang";msg="Konsistensi adalah kunci.";}
    else{title="Mulai Lagi";msg="Tinjau materi dulu ya!";}
    $("resultTitle").textContent=title; $("resultMsg").textContent=msg;
    // Save history
    const done=lsGet("nihongo_quiz_done",0)+1; lsSet("nihongo_quiz_done",done);
    if(percent===100){ const p=lsGet("nihongo_quiz_perfect",0)+1; lsSet("nihongo_quiz_perfect",p); }
    const hist=lsGet("nihongo_quiz_history",[]);
    hist.push({percent,date:todayStr()}); if(hist.length>20) hist.shift();
    lsSet("nihongo_quiz_history",hist);
    renderChart(); checkBadgeUnlocks();
  }
  $("startQuiz").addEventListener("click",()=>{
    const type=document.querySelector('[name="quizType"]:checked').value;
    quizMode=document.querySelector('[name="quizMode"]:checked').value;
    const cnt=parseInt(document.querySelector('[name="quizCount"]:checked').value);
    quizTimerSec=parseInt(document.querySelector('[name="quizTimer"]:checked').value);
    if(!quizTimerSec) $("timerWrap").classList.add("hidden");
    let pool=type==="hiragana"?[...HIRAGANA]:type==="katakana"?[...KATAKANA]:[...HIRAGANA,...KATAKANA];
    quizQuestions=shuffle(pool).slice(0,Math.min(cnt,pool.length));
    quizIdx=0;quizScore=0;quizWrong=0;
    $("quizSetup").classList.add("hidden"); $("quizResult").classList.add("hidden"); $("quizGame").classList.remove("hidden");
    $("quizFill").style.width="0%"; showQuestion();
  });
  $("retryQuiz").addEventListener("click",()=>{
    quizQuestions=shuffle(quizQuestions); quizIdx=0;quizScore=0;quizWrong=0;
    $("quizResult").classList.add("hidden"); $("quizGame").classList.remove("hidden");
    $("quizFill").style.width="0%"; showQuestion();
  });
  $("backToSetup").addEventListener("click",()=>{ stopTimer(); $("quizResult").classList.add("hidden"); $("quizSetup").classList.remove("hidden"); });

  /* =============================================
     TOAST
     ============================================= */
  function showToast(msg,duration=2800) {
    const t=$("toast"); t.textContent=msg; t.classList.remove("hidden");
    clearTimeout(showToast._t); showToast._t=setTimeout(()=>t.classList.add("hidden"),duration);
  }

  /* =============================================
     KEYBOARD
     ============================================= */
  document.addEventListener("keydown",e=>{
    const active=document.querySelector(".section.active")?.id;
    if(active==="section-hiragana"){ if(e.key==="ArrowRight") $("hNext").click(); if(e.key==="ArrowLeft") $("hPrev").click(); if(e.key===" "){ e.preventDefault(); $("hFlip").click(); } }
    if(active==="section-katakana"){ if(e.key==="ArrowRight") $("kNext").click(); if(e.key==="ArrowLeft") $("kPrev").click(); if(e.key===" "){ e.preventDefault(); $("kFlip").click(); } }
    if(e.key==="Escape"){ closePopup(); $("budayaPopup").classList.add("hidden"); $("badgesModal").classList.add("hidden"); $("badgesOverlay").classList.add("hidden"); }
  });

  setTimeout(()=>showToast("Tip: ← → Spasi untuk navigasi flashcard!"),1800);
});
