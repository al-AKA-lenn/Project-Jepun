// =============================================
//  NIHONGO YOMI — DATA
//  Hiragana & Katakana Character Data
// =============================================

const HIRAGANA = [
  // Vowels
  { char: "あ", roma: "a",  group: "vowel", example: "あお (ao) = biru" },
  { char: "い", roma: "i",  group: "vowel", example: "いぬ (inu) = anjing" },
  { char: "う", roma: "u",  group: "vowel", example: "うみ (umi) = laut" },
  { char: "え", roma: "e",  group: "vowel", example: "えき (eki) = stasiun" },
  { char: "お", roma: "o",  group: "vowel", example: "おかね (okane) = uang" },
  // K row
  { char: "か", roma: "ka", group: "k", example: "かわ (kawa) = sungai" },
  { char: "き", roma: "ki", group: "k", example: "きもの (kimono) = kimono" },
  { char: "く", roma: "ku", group: "k", example: "くに (kuni) = negara" },
  { char: "け", roma: "ke", group: "k", example: "けむり (kemuri) = asap" },
  { char: "こ", roma: "ko", group: "k", example: "こい (koi) = ikan koi" },
  // S row
  { char: "さ", roma: "sa", group: "s", example: "さくら (sakura) = bunga sakura" },
  { char: "し", roma: "shi",group: "s", example: "しま (shima) = pulau" },
  { char: "す", roma: "su", group: "s", example: "すし (sushi) = sushi" },
  { char: "せ", roma: "se", group: "s", example: "せかい (sekai) = dunia" },
  { char: "そ", roma: "so", group: "s", example: "そら (sora) = langit" },
  // T row
  { char: "た", roma: "ta", group: "t", example: "たべる (taberu) = makan" },
  { char: "ち", roma: "chi",group: "t", example: "ちかい (chikai) = dekat" },
  { char: "つ", roma: "tsu",group: "t", example: "つき (tsuki) = bulan" },
  { char: "て", roma: "te", group: "t", example: "てがみ (tegami) = surat" },
  { char: "と", roma: "to", group: "t", example: "とり (tori) = burung" },
  // N row
  { char: "な", roma: "na", group: "n", example: "なに (nani) = apa" },
  { char: "に", roma: "ni", group: "n", example: "にほん (nihon) = Jepang" },
  { char: "ぬ", roma: "nu", group: "n", example: "ぬの (nuno) = kain" },
  { char: "ね", roma: "ne", group: "n", example: "ねこ (neko) = kucing" },
  { char: "の", roma: "no", group: "n", example: "のみもの (nomimono) = minuman" },
  // H row
  { char: "は", roma: "ha", group: "h", example: "はな (hana) = bunga" },
  { char: "ひ", roma: "hi", group: "h", example: "ひと (hito) = orang" },
  { char: "ふ", roma: "fu", group: "h", example: "ふじさん (fujisan) = Gunung Fuji" },
  { char: "へ", roma: "he", group: "h", example: "へや (heya) = kamar" },
  { char: "ほ", roma: "ho", group: "h", example: "ほし (hoshi) = bintang" },
  // M row
  { char: "ま", roma: "ma", group: "m", example: "まち (machi) = kota" },
  { char: "み", roma: "mi", group: "m", example: "みず (mizu) = air" },
  { char: "む", roma: "mu", group: "m", example: "むし (mushi) = serangga" },
  { char: "め", roma: "me", group: "m", example: "めがね (megane) = kacamata" },
  { char: "も", roma: "mo", group: "m", example: "もり (mori) = hutan" },
  // Y row
  { char: "や", roma: "ya", group: "y", example: "やま (yama) = gunung" },
  { char: "ゆ", roma: "yu", group: "y", example: "ゆき (yuki) = salju" },
  { char: "よ", roma: "yo", group: "y", example: "よる (yoru) = malam" },
  // R row
  { char: "ら", roma: "ra", group: "r", example: "らーめん (ramen) = ramen" },
  { char: "り", roma: "ri", group: "r", example: "りんご (ringo) = apel" },
  { char: "る", roma: "ru", group: "r", example: "るす (rusu) = tidak di rumah" },
  { char: "れ", roma: "re", group: "r", example: "れいぞうこ (reizouko) = kulkas" },
  { char: "ろ", roma: "ro", group: "r", example: "ろうか (rouka) = koridor" },
  // W row
  { char: "わ", roma: "wa", group: "w", example: "わたし (watashi) = saya" },
  { char: "を", roma: "wo", group: "w", example: "(partikel objek)" },
  // N standalone
  { char: "ん", roma: "n",  group: "n", example: "ほん (hon) = buku" },
];

const KATAKANA = [
  // Vowels
  { char: "ア", roma: "a",   group: "vowel", example: "アイス (aisu) = es krim" },
  { char: "イ", roma: "i",   group: "vowel", example: "イチゴ (ichigo) = stroberi" },
  { char: "ウ", roma: "u",   group: "vowel", example: "ウィルス (wirusu) = virus" },
  { char: "エ", roma: "e",   group: "vowel", example: "エレベーター (erebeetaa) = lift" },
  { char: "オ", roma: "o",   group: "vowel", example: "オレンジ (orenji) = jeruk" },
  // K row
  { char: "カ", roma: "ka",  group: "k", example: "カメラ (kamera) = kamera" },
  { char: "キ", roma: "ki",  group: "k", example: "キー (kii) = kunci" },
  { char: "ク", roma: "ku",  group: "k", example: "クラス (kurasu) = kelas" },
  { char: "ケ", roma: "ke",  group: "k", example: "ケーキ (keeki) = kue" },
  { char: "コ", roma: "ko",  group: "k", example: "コーヒー (koohii) = kopi" },
  // S row
  { char: "サ", roma: "sa",  group: "s", example: "サッカー (sakkaa) = sepak bola" },
  { char: "シ", roma: "shi", group: "s", example: "シャツ (shatsu) = kemeja" },
  { char: "ス", roma: "su",  group: "s", example: "スポーツ (supootsu) = olahraga" },
  { char: "セ", roma: "se",  group: "s", example: "セーター (seetaa) = sweater" },
  { char: "ソ", roma: "so",  group: "s", example: "ソファ (sofa) = sofa" },
  // T row
  { char: "タ", roma: "ta",  group: "t", example: "タクシー (takushii) = taksi" },
  { char: "チ", roma: "chi", group: "t", example: "チーズ (chiizu) = keju" },
  { char: "ツ", roma: "tsu", group: "t", example: "ツアー (tsuaa) = tur" },
  { char: "テ", roma: "te",  group: "t", example: "テレビ (terebi) = televisi" },
  { char: "ト", roma: "to",  group: "t", example: "トイレ (toire) = toilet" },
  // N row
  { char: "ナ", roma: "na",  group: "n", example: "ナイフ (naifu) = pisau" },
  { char: "ニ", roma: "ni",  group: "n", example: "ニュース (nyuusu) = berita" },
  { char: "ヌ", roma: "nu",  group: "n", example: "ヌードル (nuudoru) = mie" },
  { char: "ネ", roma: "ne",  group: "n", example: "ネクタイ (nekutai) = dasi" },
  { char: "ノ", roma: "no",  group: "n", example: "ノート (nooto) = buku catatan" },
  // H row
  { char: "ハ", roma: "ha",  group: "h", example: "ハンバーガー (hanbaagaa) = burger" },
  { char: "ヒ", roma: "hi",  group: "h", example: "ヒーター (hiitaa) = pemanas" },
  { char: "フ", roma: "fu",  group: "h", example: "フルーツ (furuutsu) = buah-buahan" },
  { char: "ヘ", roma: "he",  group: "h", example: "ヘルメット (herumetto) = helm" },
  { char: "ホ", roma: "ho",  group: "h", example: "ホテル (hoteru) = hotel" },
  // M row
  { char: "マ", roma: "ma",  group: "m", example: "マンゴー (mangoo) = mangga" },
  { char: "ミ", roma: "mi",  group: "m", example: "ミルク (miruku) = susu" },
  { char: "ム", roma: "mu",  group: "m", example: "ムービー (muubii) = film" },
  { char: "メ", roma: "me",  group: "m", example: "メール (meeru) = email" },
  { char: "モ", roma: "mo",  group: "m", example: "モデル (moderu) = model" },
  // Y row
  { char: "ヤ", roma: "ya",  group: "y", example: "ヤシ (yashi) = pohon kelapa" },
  { char: "ユ", roma: "yu",  group: "y", example: "ユニフォーム (yunifoomu) = seragam" },
  { char: "ヨ", roma: "yo",  group: "y", example: "ヨーグルト (yooguruto) = yogurt" },
  // R row
  { char: "ラ", roma: "ra",  group: "r", example: "ラジオ (rajio) = radio" },
  { char: "リ", roma: "ri",  group: "r", example: "リンゴ (ringo) = apel" },
  { char: "ル", roma: "ru",  group: "r", example: "ルール (ruuru) = aturan" },
  { char: "レ", roma: "re",  group: "r", example: "レストラン (resutoran) = restoran" },
  { char: "ロ", roma: "ro",  group: "r", example: "ロボット (robotto) = robot" },
  // W row
  { char: "ワ", roma: "wa",  group: "w", example: "ワイン (wain) = anggur/wine" },
  { char: "ヲ", roma: "wo",  group: "w", example: "(partikel objek formal)" },
  // N standalone
  { char: "ン", roma: "n",   group: "n", example: "アイスクリーム → クリーム" },
];

// Orihime's encouraging messages
const ORIHIME_MESSAGES = [
  "がんばって！\nKamu pasti bisa! 🌸",
  "すごい！\nLuar biasa! ⭐",
  "一緒に頑張ろう！\nAyo semangat bareng! 💪",
  "大丈夫！\nTenang, kamu hebat! 🌟",
  "もう少し！\nDikit lagi! よし！ 🎯",
  "頑張れ！\nJangan menyerah ya! 🍊",
  "上手！\nPintar sekali! 🎉",
];

const FEEDBACK_CORRECT = [
  { face: "🌸", msg: "Benar! がんばれ！" },
  { face: "⭐", msg: "Yesss! すごい！" },
  { face: "🎉", msg: "Tepat sekali! えらい！" },
  { face: "💯", msg: "Keren banget! 正解！" },
  { face: "✨", msg: "Mantap! Orihime bangga!" },
];

const FEEDBACK_WRONG = [
  { face: "😅", msg: "Hampir benar! 大丈夫！" },
  { face: "💪", msg: "Next kali pasti bisa!" },
  { face: "🍊", msg: "Jangan nyerah ya! ファイト！" },
  { face: "😊", msg: "Yuk coba lagi! がんばれ！" },
];
