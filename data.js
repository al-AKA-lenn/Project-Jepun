// =============================================
//  NIHONGO YOMI — DATA v4
// =============================================

const HIRAGANA = [
  { char:"あ", roma:"a",   group:"vowel", example:"あお (ao) = biru" },
  { char:"い", roma:"i",   group:"vowel", example:"いぬ (inu) = anjing" },
  { char:"う", roma:"u",   group:"vowel", example:"うみ (umi) = laut" },
  { char:"え", roma:"e",   group:"vowel", example:"えき (eki) = stasiun" },
  { char:"お", roma:"o",   group:"vowel", example:"おかね (okane) = uang" },
  { char:"か", roma:"ka",  group:"k", example:"かわ (kawa) = sungai" },
  { char:"き", roma:"ki",  group:"k", example:"きもの (kimono) = kimono" },
  { char:"く", roma:"ku",  group:"k", example:"くに (kuni) = negara" },
  { char:"け", roma:"ke",  group:"k", example:"けむり (kemuri) = asap" },
  { char:"こ", roma:"ko",  group:"k", example:"こい (koi) = ikan koi" },
  { char:"さ", roma:"sa",  group:"s", example:"さくら (sakura) = bunga sakura" },
  { char:"し", roma:"shi", group:"s", example:"しま (shima) = pulau" },
  { char:"す", roma:"su",  group:"s", example:"すし (sushi) = sushi" },
  { char:"せ", roma:"se",  group:"s", example:"せかい (sekai) = dunia" },
  { char:"そ", roma:"so",  group:"s", example:"そら (sora) = langit" },
  { char:"た", roma:"ta",  group:"t", example:"たべる (taberu) = makan" },
  { char:"ち", roma:"chi", group:"t", example:"ちかい (chikai) = dekat" },
  { char:"つ", roma:"tsu", group:"t", example:"つき (tsuki) = bulan" },
  { char:"て", roma:"te",  group:"t", example:"てがみ (tegami) = surat" },
  { char:"と", roma:"to",  group:"t", example:"とり (tori) = burung" },
  { char:"な", roma:"na",  group:"n", example:"なに (nani) = apa" },
  { char:"に", roma:"ni",  group:"n", example:"にほん (nihon) = Jepang" },
  { char:"ぬ", roma:"nu",  group:"n", example:"ぬの (nuno) = kain" },
  { char:"ね", roma:"ne",  group:"n", example:"ねこ (neko) = kucing" },
  { char:"の", roma:"no",  group:"n", example:"のみもの (nomimono) = minuman" },
  { char:"は", roma:"ha",  group:"h", example:"はな (hana) = bunga" },
  { char:"ひ", roma:"hi",  group:"h", example:"ひと (hito) = orang" },
  { char:"ふ", roma:"fu",  group:"h", example:"ふじさん (fujisan) = Gunung Fuji" },
  { char:"へ", roma:"he",  group:"h", example:"へや (heya) = kamar" },
  { char:"ほ", roma:"ho",  group:"h", example:"ほし (hoshi) = bintang" },
  { char:"ま", roma:"ma",  group:"m", example:"まち (machi) = kota" },
  { char:"み", roma:"mi",  group:"m", example:"みず (mizu) = air" },
  { char:"む", roma:"mu",  group:"m", example:"むし (mushi) = serangga" },
  { char:"め", roma:"me",  group:"m", example:"めがね (megane) = kacamata" },
  { char:"も", roma:"mo",  group:"m", example:"もり (mori) = hutan" },
  { char:"や", roma:"ya",  group:"y", example:"やま (yama) = gunung" },
  { char:"ゆ", roma:"yu",  group:"y", example:"ゆき (yuki) = salju" },
  { char:"よ", roma:"yo",  group:"y", example:"よる (yoru) = malam" },
  { char:"ら", roma:"ra",  group:"r", example:"らーめん (ramen) = ramen" },
  { char:"り", roma:"ri",  group:"r", example:"りんご (ringo) = apel" },
  { char:"る", roma:"ru",  group:"r", example:"るす (rusu) = tidak di rumah" },
  { char:"れ", roma:"re",  group:"r", example:"れいぞうこ (reizouko) = kulkas" },
  { char:"ろ", roma:"ro",  group:"r", example:"ろうか (rouka) = koridor" },
  { char:"わ", roma:"wa",  group:"w", example:"わたし (watashi) = saya" },
  { char:"を", roma:"wo",  group:"w", example:"(partikel objek)" },
  { char:"ん", roma:"n",   group:"n", example:"ほん (hon) = buku" },
];

const KATAKANA = [
  { char:"ア", roma:"a",   group:"vowel", example:"アイス (aisu) = es krim" },
  { char:"イ", roma:"i",   group:"vowel", example:"イチゴ (ichigo) = stroberi" },
  { char:"ウ", roma:"u",   group:"vowel", example:"ウィルス (wirusu) = virus" },
  { char:"エ", roma:"e",   group:"vowel", example:"エレベーター (erebeetaa) = lift" },
  { char:"オ", roma:"o",   group:"vowel", example:"オレンジ (orenji) = jeruk" },
  { char:"カ", roma:"ka",  group:"k", example:"カメラ (kamera) = kamera" },
  { char:"キ", roma:"ki",  group:"k", example:"キー (kii) = kunci" },
  { char:"ク", roma:"ku",  group:"k", example:"クラス (kurasu) = kelas" },
  { char:"ケ", roma:"ke",  group:"k", example:"ケーキ (keeki) = kue" },
  { char:"コ", roma:"ko",  group:"k", example:"コーヒー (koohii) = kopi" },
  { char:"サ", roma:"sa",  group:"s", example:"サッカー (sakkaa) = sepak bola" },
  { char:"シ", roma:"shi", group:"s", example:"シャツ (shatsu) = kemeja" },
  { char:"ス", roma:"su",  group:"s", example:"スポーツ (supootsu) = olahraga" },
  { char:"セ", roma:"se",  group:"s", example:"セーター (seetaa) = sweater" },
  { char:"ソ", roma:"so",  group:"s", example:"ソファ (sofa) = sofa" },
  { char:"タ", roma:"ta",  group:"t", example:"タクシー (takushii) = taksi" },
  { char:"チ", roma:"chi", group:"t", example:"チーズ (chiizu) = keju" },
  { char:"ツ", roma:"tsu", group:"t", example:"ツアー (tsuaa) = tur" },
  { char:"テ", roma:"te",  group:"t", example:"テレビ (terebi) = televisi" },
  { char:"ト", roma:"to",  group:"t", example:"トイレ (toire) = toilet" },
  { char:"ナ", roma:"na",  group:"n", example:"ナイフ (naifu) = pisau" },
  { char:"ニ", roma:"ni",  group:"n", example:"ニュース (nyuusu) = berita" },
  { char:"ヌ", roma:"nu",  group:"n", example:"ヌードル (nuudoru) = mie" },
  { char:"ネ", roma:"ne",  group:"n", example:"ネクタイ (nekutai) = dasi" },
  { char:"ノ", roma:"no",  group:"n", example:"ノート (nooto) = buku catatan" },
  { char:"ハ", roma:"ha",  group:"h", example:"ハンバーガー (hanbaagaa) = burger" },
  { char:"ヒ", roma:"hi",  group:"h", example:"ヒーター (hiitaa) = pemanas" },
  { char:"フ", roma:"fu",  group:"h", example:"フルーツ (furuutsu) = buah-buahan" },
  { char:"ヘ", roma:"he",  group:"h", example:"ヘルメット (herumetto) = helm" },
  { char:"ホ", roma:"ho",  group:"h", example:"ホテル (hoteru) = hotel" },
  { char:"マ", roma:"ma",  group:"m", example:"マンゴー (mangoo) = mangga" },
  { char:"ミ", roma:"mi",  group:"m", example:"ミルク (miruku) = susu" },
  { char:"ム", roma:"mu",  group:"m", example:"ムービー (muubii) = film" },
  { char:"メ", roma:"me",  group:"m", example:"メール (meeru) = email" },
  { char:"モ", roma:"mo",  group:"m", example:"モデル (moderu) = model" },
  { char:"ヤ", roma:"ya",  group:"y", example:"ヤシ (yashi) = pohon kelapa" },
  { char:"ユ", roma:"yu",  group:"y", example:"ユニフォーム (yunifoomu) = seragam" },
  { char:"ヨ", roma:"yo",  group:"y", example:"ヨーグルト (yooguruto) = yogurt" },
  { char:"ラ", roma:"ra",  group:"r", example:"ラジオ (rajio) = radio" },
  { char:"リ", roma:"ri",  group:"r", example:"リンゴ (ringo) = apel" },
  { char:"ル", roma:"ru",  group:"r", example:"ルール (ruuru) = aturan" },
  { char:"レ", roma:"re",  group:"r", example:"レストラン (resutoran) = restoran" },
  { char:"ロ", roma:"ro",  group:"r", example:"ロボット (robotto) = robot" },
  { char:"ワ", roma:"wa",  group:"w", example:"ワイン (wain) = anggur/wine" },
  { char:"ヲ", roma:"wo",  group:"w", example:"(partikel objek formal)" },
  { char:"ン", roma:"n",   group:"n", example:"パン (pan) = roti" },
];

// =============================================
//  KOSAKATA
// =============================================
const VOCABULARY = [
  { id:1,  category:"sapaan",   indo:"Halo / Selamat pagi",       jp:"おはよう",               roma:"Ohayou",                  note:"Dipakai pagi hari (informal)",              sentences:[{jp:"おはようございます！",roma:"Ohayou gozaimasu!",indo:"Selamat pagi! (formal)"},{jp:"おはよう、げんき？",roma:"Ohayou, genki?",indo:"Selamat pagi, apa kabar?"}] },
  { id:2,  category:"sapaan",   indo:"Selamat siang/sore",        jp:"こんにちは",              roma:"Konnichiwa",              note:"Dipakai siang–sore hari",                   sentences:[{jp:"こんにちは、はじめまして。",roma:"Konnichiwa, hajimemashite.",indo:"Selamat siang, senang berkenalan."},{jp:"こんにちは！げんきですか？",roma:"Konnichiwa! Genki desu ka?",indo:"Halo! Apa kabar?"}] },
  { id:3,  category:"sapaan",   indo:"Selamat malam",             jp:"こんばんは",              roma:"Konbanwa",                note:"Dipakai saat malam",                        sentences:[{jp:"こんばんは、いいてんきですね。",roma:"Konbanwa, ii tenki desu ne.",indo:"Selamat malam, cuacanya bagus ya."},{jp:"こんばんは！",roma:"Konbanwa!",indo:"Selamat malam!"}] },
  { id:4,  category:"sapaan",   indo:"Terima kasih",              jp:"ありがとう",              roma:"Arigatou",                note:"Informal; formal: ありがとうございます",      sentences:[{jp:"ありがとうございます！",roma:"Arigatou gozaimasu!",indo:"Terima kasih banyak! (formal)"},{jp:"いつもありがとう。",roma:"Itsumo arigatou.",indo:"Terima kasih selalu."}] },
  { id:5,  category:"sapaan",   indo:"Maaf / Permisi",            jp:"すみません",              roma:"Sumimasen",               note:"Bisa untuk minta maaf atau minta perhatian",sentences:[{jp:"すみません、どこですか？",roma:"Sumimasen, doko desu ka?",indo:"Permisi, di mana?"},{jp:"すみません、おそくなりました。",roma:"Sumimasen, osoku narimashita.",indo:"Maaf, saya terlambat."}] },
  { id:6,  category:"sapaan",   indo:"Sama-sama",                 jp:"どういたしまして",        roma:"Dou itashimashite",       note:"Respon terima kasih",                       sentences:[{jp:"どういたしまして！",roma:"Dou itashimashite!",indo:"Sama-sama!"}] },
  { id:7,  category:"sapaan",   indo:"Iya / Ya",                  jp:"はい",                   roma:"Hai",                     note:"Persetujuan formal",                        sentences:[{jp:"はい、わかりました。",roma:"Hai, wakarimashita.",indo:"Iya, saya mengerti."},{jp:"はい、そうです。",roma:"Hai, sou desu.",indo:"Iya, benar."}] },
  { id:8,  category:"sapaan",   indo:"Tidak / Bukan",             jp:"いいえ",                  roma:"Iie",                     note:"Penolakan formal",                          sentences:[{jp:"いいえ、ちがいます。",roma:"Iie, chigaimasu.",indo:"Tidak, itu salah."},{jp:"いいえ、けっこうです。",roma:"Iie, kekkou desu.",indo:"Tidak, terima kasih."}] },
  { id:9,  category:"angka",    indo:"Satu",                      jp:"いち",                   roma:"Ichi",                    note:"",                                          sentences:[{jp:"いちまいください。",roma:"Ichi mai kudasai.",indo:"Tolong satu lembar."},{jp:"いちじです。",roma:"Ichi-ji desu.",indo:"Sekarang jam satu."}] },
  { id:10, category:"angka",    indo:"Dua",                       jp:"に",                     roma:"Ni",                      note:"",                                          sentences:[{jp:"にほんごをにねんべんきょうしました。",roma:"Nihongo wo ni-nen benkyou shimashita.",indo:"Saya belajar Jepang 2 tahun."}] },
  { id:11, category:"angka",    indo:"Tiga",                      jp:"さん",                   roma:"San",                     note:"",                                          sentences:[{jp:"さんじゅうえんです。",roma:"Sanjuu-en desu.",indo:"Harganya 30 yen."}] },
  { id:12, category:"angka",    indo:"Empat",                     jp:"し / よん",              roma:"Shi / Yon",               note:"Shi jarang dipakai (mirip 'mati')",          sentences:[{jp:"よんまいください。",roma:"Yon mai kudasai.",indo:"Tolong empat lembar."}] },
  { id:13, category:"angka",    indo:"Lima",                      jp:"ご",                     roma:"Go",                      note:"",                                          sentences:[{jp:"ごじにあいましょう。",roma:"Go-ji ni aimashou.",indo:"Ayo bertemu jam 5."}] },
  { id:14, category:"angka",    indo:"Sepuluh",                   jp:"じゅう",                  roma:"Juu",                     note:"",                                          sentences:[{jp:"じゅっぷんまってください。",roma:"Juppun matte kudasai.",indo:"Tolong tunggu 10 menit."}] },
  { id:15, category:"warna",    indo:"Merah",                     jp:"あか",                   roma:"Aka",                     note:"",                                          sentences:[{jp:"あかいはなですね。",roma:"Akai hana desu ne.",indo:"Bunga merah yang indah ya."},{jp:"あかがすきです。",roma:"Aka ga suki desu.",indo:"Saya suka warna merah."}] },
  { id:16, category:"warna",    indo:"Biru",                      jp:"あお",                   roma:"Ao",                      note:"Juga bisa berarti hijau (lampu)",            sentences:[{jp:"そらはあおいですね。",roma:"Sora wa aoi desu ne.",indo:"Langitnya biru ya."}] },
  { id:17, category:"warna",    indo:"Putih",                     jp:"しろ",                   roma:"Shiro",                   note:"",                                          sentences:[{jp:"しろいゆきがふっています。",roma:"Shiroi yuki ga futte imasu.",indo:"Salju putih sedang turun."}] },
  { id:18, category:"warna",    indo:"Hitam",                     jp:"くろ",                   roma:"Kuro",                    note:"",                                          sentences:[{jp:"くろいねこがいます。",roma:"Kuroi neko ga imasu.",indo:"Ada kucing hitam."}] },
  { id:19, category:"warna",    indo:"Kuning",                    jp:"きいろ",                 roma:"Kiiro",                   note:"",                                          sentences:[{jp:"きいろいはながさきました。",roma:"Kiiroi hana ga sakimashita.",indo:"Bunga kuning mekar."}] },
  { id:20, category:"warna",    indo:"Hijau",                     jp:"みどり",                 roma:"Midori",                  note:"",                                          sentences:[{jp:"みどりのきがきれいです。",roma:"Midori no ki ga kirei desu.",indo:"Pohon hijau itu indah."}] },
  { id:21, category:"warna",    indo:"Merah muda",                jp:"ピンク",                  roma:"Pinku",                   note:"Kata serapan dari 'pink'",                  sentences:[{jp:"さくらはピンクです。",roma:"Sakura wa pinku desu.",indo:"Bunga sakura berwarna pink."}] },
  { id:22, category:"warna",    indo:"Ungu",                      jp:"むらさき",               roma:"Murasaki",                note:"",                                          sentences:[{jp:"むらさきのふくがすきです。",roma:"Murasaki no fuku ga suki desu.",indo:"Saya suka baju ungu."}] },
  { id:23, category:"keluarga", indo:"Ibu (memanggil)",           jp:"おかあさん",              roma:"Okaasan",                 note:"Memanggil ibu atau menyebut ibu orang lain", sentences:[{jp:"おかあさん、おなかがすいた！",roma:"Okaasan, onaka ga suita!",indo:"Ibu, aku lapar!"},{jp:"おかあさんはげんきですか？",roma:"Okaasan wa genki desu ka?",indo:"Apakah ibumu sehat?"}] },
  { id:24, category:"keluarga", indo:"Ayah (memanggil)",          jp:"おとうさん",              roma:"Otousan",                 note:"Memanggil ayah atau menyebut ayah orang lain",sentences:[{jp:"おとうさん、ただいま！",roma:"Otousan, tadaima!",indo:"Ayah, aku pulang!"},{jp:"おとうさんのしごとはなんですか？",roma:"Otousan no shigoto wa nan desu ka?",indo:"Apa pekerjaan ayahmu?"}] },
  { id:25, category:"keluarga", indo:"Kakak laki-laki",           jp:"おにいさん",              roma:"Oniisan",                 note:"",                                          sentences:[{jp:"おにいさんはだいがくせいです。",roma:"Oniisan wa daigakusei desu.",indo:"Kakak laki-lakiku mahasiswa."}] },
  { id:26, category:"keluarga", indo:"Kakak perempuan",           jp:"おねえさん",              roma:"Oneesan",                 note:"",                                          sentences:[{jp:"おねえさんはやさしいです。",roma:"Oneesan wa yasashii desu.",indo:"Kakak perempuanku baik hati."}] },
  { id:27, category:"keluarga", indo:"Adik",                      jp:"おとうと / いもうと",     roma:"Otouto / Imouto",         note:"Otouto = adik laki, Imouto = adik perempuan",sentences:[{jp:"いもうとはかわいいです。",roma:"Imouto wa kawaii desu.",indo:"Adik perempuanku lucu."}] },
  { id:28, category:"makanan",  indo:"Nasi / Makanan",            jp:"ごはん",                 roma:"Gohan",                   note:"Juga berarti 'makan' secara umum",           sentences:[{jp:"ごはんをたべましょう！",roma:"Gohan wo tabemashou!",indo:"Ayo makan!"},{jp:"ごはんはおいしいですか？",roma:"Gohan wa oishii desu ka?",indo:"Apakah nasinya enak?"}] },
  { id:29, category:"makanan",  indo:"Air",                       jp:"みず",                   roma:"Mizu",                    note:"",                                          sentences:[{jp:"みずをください。",roma:"Mizu wo kudasai.",indo:"Tolong berikan air."},{jp:"みずがのみたいです。",roma:"Mizu ga nomitai desu.",indo:"Saya ingin minum air."}] },
  { id:30, category:"makanan",  indo:"Teh",                       jp:"おちゃ",                 roma:"Ocha",                    note:"Biasanya teh hijau",                        sentences:[{jp:"おちゃをいっぱいどうぞ。",roma:"Ocha wo ippai douzo.",indo:"Silakan minum teh."},{jp:"まいにちおちゃをのみます。",roma:"Mainichi ocha wo nomimasu.",indo:"Saya minum teh setiap hari."}] },
  { id:31, category:"makanan",  indo:"Kopi",                      jp:"コーヒー",               roma:"Koohii",                  note:"Kata serapan",                              sentences:[{jp:"コーヒーをにはいのみました。",roma:"Koohii wo ni-hai nomimashita.",indo:"Saya minum dua cangkir kopi."},{jp:"あまいコーヒーがすきです。",roma:"Amai koohii ga suki desu.",indo:"Saya suka kopi manis."}] },
  { id:32, category:"makanan",  indo:"Enak / Lezat",              jp:"おいしい",               roma:"Oishii",                  note:"Ungkapan saat makanan enak",                sentences:[{jp:"このすしはおいしいですね！",roma:"Kono sushi wa oishii desu ne!",indo:"Sushi ini enak ya!"},{jp:"おいしそうですね。",roma:"Oishisou desu ne.",indo:"Kelihatannya enak ya."}] },
  { id:33, category:"makanan",  indo:"Roti",                      jp:"パン",                   roma:"Pan",                     note:"Dari kata Portugis 'pão'",                  sentences:[{jp:"あさごはんにパンをたべます。",roma:"Asagohan ni pan wo tabemasu.",indo:"Saya makan roti untuk sarapan."}] },
  { id:34, category:"makanan",  indo:"Telur",                     jp:"たまご",                 roma:"Tamago",                  note:"",                                          sentences:[{jp:"たまごをにこかいます。",roma:"Tamago wo ni-ko kaimasu.",indo:"Saya beli dua butir telur."}] },
  { id:35, category:"waktu",    indo:"Hari ini",                  jp:"きょう",                 roma:"Kyou",                    note:"",                                          sentences:[{jp:"きょうはなんようびですか？",roma:"Kyou wa nanyoubi desu ka?",indo:"Hari ini hari apa?"},{jp:"きょうはいいてんきですね。",roma:"Kyou wa ii tenki desu ne.",indo:"Cuaca hari ini bagus ya."}] },
  { id:36, category:"waktu",    indo:"Besok",                     jp:"あした",                 roma:"Ashita",                  note:"",                                          sentences:[{jp:"あしたもまたきます。",roma:"Ashita mo mata kimasu.",indo:"Besok saya akan datang lagi."},{jp:"あしたのてんきはどうですか？",roma:"Ashita no tenki wa dou desu ka?",indo:"Bagaimana cuaca besok?"}] },
  { id:37, category:"waktu",    indo:"Kemarin",                   jp:"きのう",                 roma:"Kinou",                   note:"",                                          sentences:[{jp:"きのうえいがをみました。",roma:"Kinou eiga wo mimashita.",indo:"Kemarin saya nonton film."}] },
  { id:38, category:"waktu",    indo:"Sekarang",                  jp:"いま",                   roma:"Ima",                     note:"",                                          sentences:[{jp:"いまなんじですか？",roma:"Ima nanji desu ka?",indo:"Sekarang jam berapa?"},{jp:"いまいそがしいです。",roma:"Ima isogashii desu.",indo:"Sekarang saya sibuk."}] },
  { id:39, category:"waktu",    indo:"Pagi",                      jp:"あさ",                   roma:"Asa",                     note:"",                                          sentences:[{jp:"まいあさはやくおきます。",roma:"Mai asa hayaku okimasu.",indo:"Setiap pagi saya bangun awal."}] },
  { id:40, category:"waktu",    indo:"Malam",                     jp:"よる",                   roma:"Yoru",                    note:"",                                          sentences:[{jp:"よるはほしがきれいです。",roma:"Yoru wa hoshi ga kirei desu.",indo:"Malam hari bintangnya indah."}] },
  { id:41, category:"waktu",    indo:"Senin",                     jp:"げつようび",              roma:"Getsuyoubi",              note:"月 (getsu) = bulan",                        sentences:[{jp:"げつようびにがっこうがあります。",roma:"Getsuyoubi ni gakkou ga arimasu.",indo:"Hari Senin ada sekolah."}] },
  { id:42, category:"waktu",    indo:"Jumat",                     jp:"きんようび",              roma:"Kin'youbi",               note:"金 (kin) = emas",                           sentences:[{jp:"きんようびはすきです！",roma:"Kin'youbi wa suki desu!",indo:"Saya suka hari Jumat!"}] },
  { id:43, category:"sifat",    indo:"Besar",                     jp:"おおきい",               roma:"Ookii",                   note:"Kata sifat い — おおきい langsung + kata benda. Contoh: おおきいいぬ (anjing besar)",                                          sentences:[{jp:"このかばんはおおきいですね。",roma:"Kono kaban wa ookii desu ne.",indo:"Tas ini besar ya."},{jp:"おおきいいぬがいます。",roma:"Ookii inu ga imasu.",indo:"Ada anjing besar."}] },
  { id:44, category:"sifat",    indo:"Kecil",                     jp:"ちいさい",               roma:"Chiisai",                 note:"Kata sifat い — ちいさい langsung + kata benda. Contoh: ちいさいねこ (kucing kecil)",                                          sentences:[{jp:"ちいさいねこがかわいいです。",roma:"Chiisai neko ga kawaii desu.",indo:"Kucing kecil itu lucu."},{jp:"このへやはちいさいですね。",roma:"Kono heya wa chiisai desu ne.",indo:"Kamar ini kecil ya."}] },
  { id:45, category:"sifat",    indo:"Cantik / Indah",            jp:"きれい（な）",            roma:"Kirei (na)",              note:"Kata sifat な — きれいな+kata benda. Contoh: きれいなはな (bunga indah). Juga berarti 'bersih'", sentences:[{jp:"さくらはきれいですね。",roma:"Sakura wa kirei desu ne.",indo:"Bunga sakura indah ya."},{jp:"きれいなへやですね。",roma:"Kirei na heya desu ne.",indo:"Kamar yang bersih ya."},{jp:"このへやはきれいです。",roma:"Kono heya wa kirei desu.",indo:"Kamar ini bersih."}] },
  { id:46, category:"sifat",    indo:"Lucu / Imut",               jp:"かわいい",               roma:"Kawaii",                  note:"Kata sifat い — かわいい langsung + kata benda. Contoh: かわいいねこ (kucing lucu). Terkenal dari budaya pop Jepang",            sentences:[{jp:"このねこはかわいいですね！",roma:"Kono neko wa kawaii desu ne!",indo:"Kucing ini lucu ya!"},{jp:"かわいいふくですね。",roma:"Kawaii fuku desu ne.",indo:"Bajunya imut ya."}] },
  { id:47, category:"sifat",    indo:"Enak / Lezat (sifat)",      jp:"おいしい",               roma:"Oishii",                  note:"Kata sifat い — おいしい langsung + kata benda. Contoh: おいしいりょうり (masakan yang enak)",                                sentences:[{jp:"このケーキはおいしいです。",roma:"Kono keeki wa oishii desu.",indo:"Kue ini enak."}] },
  { id:48, category:"sifat",    indo:"Cepat",                     jp:"はやい",                 roma:"Hayai",                   note:"Kata sifat い",                             sentences:[{jp:"このでんしゃははやいですね。",roma:"Kono densha wa hayai desu ne.",indo:"Kereta ini cepat ya."}] },
  { id:491, category:"sifat",  indo:"Suka / Disukai",            jp:"すき（な）",              roma:"Suki (na)",               note:"Kata sifat な — すきな+kata benda. Contoh: すきなたべもの = makanan favorit. Bukan すきです saat jadi modifier!", sentences:[{jp:"すきなたべものはなんですか？",roma:"Suki na tabemono wa nan desu ka?",indo:"Makanan favorit kamu apa?"},{jp:"にほんごがすきです。",roma:"Nihongo ga suki desu.",indo:"Saya suka bahasa Jepang."},{jp:"すきなひとがいます。",roma:"Suki na hito ga imasu.",indo:"Ada orang yang aku suka."}] },
  { id:492, category:"sifat",  indo:"Tidak suka / Benci",        jp:"きらい（な）",            roma:"Kirai (na)",              note:"Kata sifat な — きらいな+kata benda. Contoh: きらいなたべもの = makanan tidak disukai. Lawannya すき", sentences:[{jp:"きらいなたべものはなんですか？",roma:"Kirai na tabemono wa nan desu ka?",indo:"Makanan yang tidak kamu suka apa?"},{jp:"へびがきらいです。",roma:"Hebi ga kirai desu.",indo:"Saya tidak suka ular."},{jp:"きらいなかもくはなんですか？",roma:"Kirai na kamoku wa nan desu ka?",indo:"Mata pelajaran yang tidak kamu suka apa?"}] },
  { id:493, category:"sifat",  indo:"Pintar / Jago",             jp:"じょうず（な）",          roma:"Jouzu (na)",              note:"Kata sifat な — じょうずな+kata benda. Contoh: じょうずなひと = orang yang jago. Lawannya へた", sentences:[{jp:"にほんごがじょうずですね！",roma:"Nihongo ga jouzu desu ne!",indo:"Bahasa Jepangmu bagus ya!"},{jp:"かれはりょうりがじょうずです。",roma:"Kare wa ryouri ga jouzu desu.",indo:"Dia pandai memasak."}] },
  { id:494, category:"sifat",  indo:"Sehat / Bersemangat",       jp:"げんき（な）",            roma:"Genki (na)",              note:"Kata sifat な — sering ditanya おげんきですか (apa kabar?). Jawab: げんきです!", sentences:[{jp:"おげんきですか？",roma:"Ogenki desu ka?",indo:"Apa kabar?"},{jp:"げんきなこどもですね。",roma:"Genki na kodomo desu ne.",indo:"Anak yang bersemangat ya."},{jp:"はい、げんきです！",roma:"Hai, genki desu!",indo:"Ya, saya baik!"}] },
  { id:495, category:"sifat",  indo:"Tenang / Sunyi",            jp:"しずか（な）",            roma:"Shizuka (na)",            note:"Kata sifat な — しずかな+kata benda. Contoh: しずかなへや = kamar yang tenang", sentences:[{jp:"しずかにしてください。",roma:"Shizuka ni shite kudasai.",indo:"Tolong tenang."},{jp:"しずかなところがすきです。",roma:"Shizuka na tokoro ga suki desu.",indo:"Saya suka tempat yang tenang."}] },
  { id:49, category:"frasa",    indo:"Nama saya ...",             jp:"わたしのなまえは...です", roma:"Watashi no namae wa ... desu", note:"Ganti '...' dengan namamu",            sentences:[{jp:"わたしのなまえはレンです。",roma:"Watashi no namae wa Ren desu.",indo:"Nama saya Ren."}] },
  { id:50, category:"frasa",    indo:"Saya tidak mengerti",       jp:"わかりません",            roma:"Wakarimasen",             note:"",                                          sentences:[{jp:"すみません、わかりません。",roma:"Sumimasen, wakarimasen.",indo:"Maaf, saya tidak mengerti."},{jp:"にほんごがわかりません。",roma:"Nihongo ga wakarimasen.",indo:"Saya tidak mengerti bahasa Jepang."}] },
  { id:51, category:"frasa",    indo:"Di mana ...?",              jp:"...はどこですか",         roma:"... wa doko desu ka",     note:"Ganti '...' dengan tempat",                 sentences:[{jp:"トイレはどこですか？",roma:"Toire wa doko desu ka?",indo:"Di mana toiletnya?"},{jp:"えきはどこですか？",roma:"Eki wa doko desu ka?",indo:"Di mana stasiunnya?"}] },
  { id:52, category:"frasa",    indo:"Berapa harganya?",          jp:"いくらですか",            roma:"Ikura desu ka",           note:"",                                          sentences:[{jp:"このりんごはいくらですか？",roma:"Kono ringo wa ikura desu ka?",indo:"Berapa harga apel ini?"},{jp:"ぜんぶでいくらですか？",roma:"Zenbu de ikura desu ka?",indo:"Semuanya berapa?"}] },
  { id:53, category:"frasa",    indo:"Selamat makan",             jp:"いただきます",            roma:"Itadakimasu",             note:"Diucapkan sebelum makan",                   sentences:[{jp:"いただきます！",roma:"Itadakimasu!",indo:"(Selamat makan! / Terima kasih atas makanannya)"},{jp:"みんなでいただきます。",roma:"Minna de itadakimasu.",indo:"Mari kita makan bersama."}] },
  { id:54, category:"frasa",    indo:"Sudah kenyang / Terima kasih atas makanan", jp:"ごちそうさまでした", roma:"Gochisousama deshita", note:"Diucapkan setelah makan", sentences:[{jp:"ごちそうさまでした！おいしかったです。",roma:"Gochisousama deshita! Oishikatta desu.",indo:"Terima kasih atas makanannya! Enak sekali."}] },
  { id:55, category:"frasa",    indo:"Ayo semangat!",             jp:"がんばって！",            roma:"Ganbatte!",               note:"Ungkapan semangat paling populer",          sentences:[{jp:"がんばって！おうえんしています！",roma:"Ganbatte! Ouen shite imasu!",indo:"Semangat! Aku dukung kamu!"},{jp:"いっしょにがんばろう！",roma:"Issho ni ganbarou!",indo:"Ayo berjuang bersama!"}] },
  { id:56, category:"wisata",   indo:"Tiket satu (orang dewasa)", jp:"おとなひとり",            roma:"Otona hitori",            note:"Berguna saat beli tiket",                   sentences:[{jp:"おとなひとりください。",roma:"Otona hitori kudasai.",indo:"Tolong satu tiket dewasa."},{jp:"おとなふたりこどもひとりです。",roma:"Otona futari kodomo hitori desu.",indo:"Dua dewasa satu anak."}] },
  { id:57, category:"wisata",   indo:"Tolong pesan ini",          jp:"これをください",          roma:"Kore wo kudasai",         note:"Tunjuk menu saat memesan",                  sentences:[{jp:"これとあれをください。",roma:"Kore to are wo kudasai.",indo:"Tolong yang ini dan itu."},{jp:"おすすめはこれですか？",roma:"Osusume wa kore desu ka?",indo:"Yang direkomendasikan ini?"}] },
  { id:58, category:"wisata",   indo:"Tolong panggilkan taksi",   jp:"タクシーをよんでください", roma:"Takushii wo yonde kudasai", note:"Di hotel atau restoran",                  sentences:[{jp:"タクシーをよんでもらえますか？",roma:"Takushii wo yonde moraemasu ka?",indo:"Bisakah kamu panggilkan taksi?"}] },
  { id:59, category:"wisata",   indo:"Saya alergi ...",           jp:"...アレルギーがあります",  roma:"... arerugii ga arimasu", note:"Penting untuk keamanan makanan",            sentences:[{jp:"えびアレルギーがあります。",roma:"Ebi arerugii ga arimasu.",indo:"Saya alergi udang."},{jp:"グルテンアレルギーがあります。",roma:"Guruten arerugii ga arimasu.",indo:"Saya alergi gluten."}] },
  { id:60, category:"wisata",   indo:"Tolong foto saya",          jp:"しゃしんをとってください", roma:"Shashin wo totte kudasai", note:"Minta tolong difoto",                      sentences:[{jp:"すみません、しゃしんをとってもらえますか？",roma:"Sumimasen, shashin wo totte moraemasu ka?",indo:"Permisi, bisakah kamu fotoin saya?"},{jp:"いっしょにしゃしんをとりましょう！",roma:"Issho ni shashin wo torimashou!",indo:"Ayo foto bersama!"}] },
  { id:61, category:"wisata",   indo:"Stasiun / Kereta",          jp:"えき / でんしゃ",         roma:"Eki / Densha",            note:"Transportasi utama di Jepang",              sentences:[{jp:"えきはどこですか？",roma:"Eki wa doko desu ka?",indo:"Di mana stasiun kereta?"},{jp:"でんしゃはなんじですか？",roma:"Densha wa nanji desu ka?",indo:"Keretanya jam berapa?"}] },
  { id:62, category:"wisata",   indo:"Kamar mandi / Toilet",      jp:"トイレ / おてあらい",     roma:"Toire / Otearai",         note:"Otearai lebih sopan",                      sentences:[{jp:"おてあらいはどこですか？",roma:"Otearai wa doko desu ka?",indo:"Di mana kamar mandinya?"},{jp:"トイレをかしてください。",roma:"Toire wo kashite kudasai.",indo:"Boleh saya ke toilet?"}] },
];

const VOCAB_CATEGORIES = [
  { id:"all",      label:"Semua",         emoji:"📚" },
  { id:"sapaan",   label:"Sapaan",        emoji:"👋" },
  { id:"angka",    label:"Angka",         emoji:"🔢" },
  { id:"warna",    label:"Warna",         emoji:"🎨" },
  { id:"keluarga", label:"Keluarga",      emoji:"👨‍👩‍👧" },
  { id:"makanan",  label:"Makanan",       emoji:"🍱" },
  { id:"waktu",    label:"Hari & Waktu",  emoji:"🗓" },
  { id:"sifat",    label:"Kata Sifat",    emoji:"✨" },
  { id:"frasa",    label:"Frasa Penting", emoji:"💬" },
  { id:"wisata",   label:"Frasa Wisata",  emoji:"✈️" },
];

// =============================================
//  DAILY WORD — pool (diambil acak per hari)
// =============================================
const DAILY_WORD_POOL = [
  { jp:"さくら", roma:"Sakura", indo:"Bunga sakura", note:"Simbol musim semi di Jepang" },
  { jp:"ありがとう", roma:"Arigatou", indo:"Terima kasih", note:"Ungkapan paling sering dipakai" },
  { jp:"たのしい", roma:"Tanoshii", indo:"Menyenangkan / Seru", note:"Ungkapan kesenangan" },
  { jp:"すてき", roma:"Suteki", indo:"Indah / Keren", note:"Ungkapan kekaguman" },
  { jp:"ゆめ", roma:"Yume", indo:"Mimpi", note:"Bisa mimpi tidur atau cita-cita" },
  { jp:"こころ", roma:"Kokoro", indo:"Hati / Perasaan", note:"Makna dalam dalam budaya Jepang" },
  { jp:"なつかしい", roma:"Natsukashii", indo:"Nostalgia / Kerinduan", note:"Tidak ada padanan persis dalam Indonesia" },
  { jp:"もったいない", roma:"Mottainai", indo:"Sayang dibuang / Terbuang sia-sia", note:"Konsep menghargai sumber daya" },
  { jp:"きずな", roma:"Kizuna", indo:"Ikatan / Hubungan batin", note:"Kata yang bermakna dalam" },
  { jp:"わびさび", roma:"Wabi-sabi", indo:"Keindahan dalam ketidaksempurnaan", note:"Estetika khas Jepang" },
  { jp:"まあまあ", roma:"Maa maa", indo:"Biasa saja / Lumayan", note:"Ungkapan ambiguitas yang khas" },
  { jp:"いただきます", roma:"Itadakimasu", indo:"Selamat makan", note:"Diucapkan sebelum makan, bentuk rasa syukur" },
  { jp:"がんばって", roma:"Ganbatte", indo:"Semangat!", note:"Dorongan semangat paling populer" },
  { jp:"はじめまして", roma:"Hajimemashite", indo:"Senang berkenalan", note:"Dipakai saat pertama bertemu" },
  { jp:"おつかれさま", roma:"Otsukaresama", indo:"Kerja keras ya / Terima kasih sudah bekerja keras", note:"Ungkapan menghargai usaha orang lain" },
];

// =============================================
//  BUDAYA
// =============================================
const BUDAYA = [
  {
    id:1, category:"etiket",
    title:"Membungkuk (お辞儀)",
    emoji:"🙇",
    short:"Membungkuk adalah bentuk salam, terima kasih, dan permintaan maaf di Jepang.",
    detail:"Di Jepang, membungkuk (ojigi) menggantikan jabat tangan. Semakin dalam sudut bungkukan, semakin besar rasa hormat. Bungkuk 15° untuk sapaan biasa, 30° untuk menunjukkan rasa hormat, dan 45° atau lebih untuk permintaan maaf yang sungguh-sungguh. Ketika dua orang saling membungkuk, kadang terjadi 'pertarungan bungkuk' yang lucu karena keduanya terus mencoba membungkuk lebih dalam!",
    tags:["Etiket","Sosial"]
  },
  {
    id:2, category:"etiket",
    title:"Melepas Sepatu",
    emoji:"👟",
    short:"Di Jepang, melepas sepatu sebelum masuk rumah adalah keharusan.",
    detail:"Rumah, beberapa restoran tradisional, dan kuil Jepang memiliki 'genkan' (区間) — area peralihan di pintu masuk. Kamu harus melepas sepatu di sini dan menggantinya dengan sandal dalam ruangan. Ujung sepatu harus menghadap ke pintu (arah keluar) sebagai bentuk kerapian. Di beberapa tempat, ada sandal khusus untuk toilet yang berbeda dari sandal ruangan biasa!",
    tags:["Etiket","Rumah"]
  },
  {
    id:3, category:"makanan",
    title:"Etiket Makan",
    emoji:"🍜",
    short:"Ada banyak aturan tidak tertulis saat makan di Jepang yang menarik untuk dipelajari.",
    detail:"Selalu ucapkan 'Itadakimasu' sebelum makan dan 'Gochisousama deshita' setelah makan. Boleh bersuara saat menyeruput mi atau sup — ini tanda makanan enak! Jangan menancapkan sumpit tegak di nasi (mirip ritual pemakaman). Jangan meneruskan makanan dari sumpit ke sumpit. Bayar makanan di kasir, bukan ditaruh di atas meja.",
    tags:["Makanan","Etiket"]
  },
  {
    id:4, category:"makanan",
    title:"Budaya Vending Machine",
    emoji:"🤖",
    short:"Jepang punya lebih dari 5 juta vending machine — satu per 23 orang!",
    detail:"Vending machine di Jepang menjual hampir segalanya: minuman panas dan dingin, nasi panas, telur, bunga, bahkan payung. Mereka beroperasi 24 jam dan ada di mana-mana — dari kota besar hingga gunung terpencil. Minuman panas bisa dibeli bahkan di musim dingin. Beberapa mesin juga menjual barang aneh seperti kepiting hidup atau cacing sutra!",
    tags:["Unik","Makanan"]
  },
  {
    id:5, category:"festival",
    title:"Hanami (花見)",
    emoji:"🌸",
    short:"Festival menikmati mekarnya bunga sakura, biasanya di bulan Maret–April.",
    detail:"Hanami berarti 'melihat bunga'. Setiap tahun, warga Jepang berkumpul di taman untuk piknik di bawah pohon sakura. Tradisi ini sudah ada sejak lebih dari 1.000 tahun lalu! Orang-orang memesan tempat di taman dari subuh hari. Mereka makan, minum, bernyanyi, dan bersantai sambil menikmati keindahan kelopak sakura yang berguguran — disebut 'hanafubuki' (badai bunga).",
    tags:["Festival","Musim Semi"]
  },
  {
    id:6, category:"festival",
    title:"Obon (お盆)",
    emoji:"🏮",
    short:"Festival menghormati arwah leluhur yang diperingati setiap pertengahan Agustus.",
    detail:"Obon adalah waktu ketika arwah leluhur dipercaya kembali mengunjungi dunia. Keluarga-keluarga pulang kampung, membersihkan makam, dan menyalakan lentera untuk memandu arwah. Tari Bon Odori dilakukan di berbagai daerah. Festival ini mirip dengan tradisi menghormati leluhur di banyak budaya Asia, termasuk Indonesia. Pada hari terakhir, lentera diapungkan di sungai sebagai perpisahan.",
    tags:["Festival","Tradisi"]
  },
  {
    id:7, category:"seni",
    title:"Origami (折り紙)",
    emoji:"🦢",
    short:"Seni melipat kertas menjadi berbagai bentuk — dari yang sederhana hingga sangat kompleks.",
    detail:"Origami berasal dari kata 'ori' (melipat) dan 'kami' (kertas). Dipercaya bahwa melipat 1.000 bangau kertas (senbazuru) akan mengabulkan satu permintaan. Kisah Sadako Sasaki, gadis korban bom Hiroshima yang melipat bangau, membuat tradisi ini dikenal dunia. Origami modern bahkan digunakan dalam desain ilmiah — dari panel surya satelit hingga perangkat medis!",
    tags:["Seni","Tradisi"]
  },
  {
    id:8, category:"seni",
    title:"Anime & Manga",
    emoji:"🎌",
    short:"Anime dan manga adalah industri senilai miliaran dolar yang telah menyebar ke seluruh dunia.",
    detail:"Manga adalah komik Jepang yang dibaca dari kanan ke kiri. Anime adalah adaptasi animasinya. Industri ini dimulai serius pada era Osamu Tezuka (1950-an) yang menciptakan Astro Boy. Kini anime ditonton di 190+ negara. Studio Ghibli (Hayao Miyazaki) terkenal dengan film seperti Spirited Away yang memenangkan Oscar. Di Jepang, manga mencakup 40% semua materi yang diterbitkan!",
    tags:["Seni","Pop Culture"]
  },
  {
    id:9, category:"alam",
    title:"Musim Gugur (紅葉 / Kouyou)",
    emoji:"🍂",
    short:"Musim gugur di Jepang terkenal dengan daun momiji yang berubah merah, oranye, dan kuning.",
    detail:"Seperti hanami di musim semi, 'momijigari' (berburu daun merah) adalah tradisi musim gugur. Daun maple Jepang (momiji) berubah warna menjadi merah menyala sekitar Oktober–November. Tempat terbaik melihatnya antara lain Kyoto, Nikko, dan Hokkaido. Fenomena ini dipantau serius — ada 'prakiraan daun merah' di TV dan media sosial, mirip prakiraan cuaca!",
    tags:["Alam","Tradisi"]
  },
  {
    id:10, category:"unik",
    title:"Budaya Ketepatan Waktu",
    emoji:"⏱",
    short:"Jepang adalah salah satu negara dengan ketepatan waktu tertinggi di dunia.",
    detail:"Kereta Shinkansen (kereta peluru) Jepang memiliki rata-rata keterlambatan hanya 54 detik per tahun! Ketika ada keterlambatan bahkan 1 menit, ada pengumuman resmi dan permintaan maaf resmi. Dalam budaya kerja Jepang, datang tepat waktu dianggap terlambat — kamu harus datang lebih awal. Ada istilah 'Japanese time' yang berarti tepat waktu ekstrem, kebalikan dari 'jam karet'.",
    tags:["Unik","Budaya Kerja"]
  },
  {
    id:11, category:"unik",
    title:"Omotenashi (おもてなし)",
    emoji:"🫶",
    short:"Konsep pelayanan tulus tanpa mengharapkan imbalan — jiwa keramahan Jepang.",
    detail:"Omotenashi bukan sekadar pelayanan biasa. Ini adalah filosofi melayani dengan sepenuh hati, mengantisipasi kebutuhan tamu bahkan sebelum tamu memintanya. Contohnya: teh gratis di banyak restoran, toilet yang memutar musik untuk privasi, atau staf toko yang membungkus barang dengan sangat rapi. Filosofi ini membuat Jepang terkenal sebagai negara dengan layanan terbaik di dunia.",
    tags:["Filosofi","Unik"]
  },
  {
    id:12, category:"etiket",
    title:"Antri dengan Tertib",
    emoji:"🚶",
    short:"Budaya antri di Jepang sangat teratur — bahkan di situasi darurat sekalipun.",
    detail:"Di Jepang, antrian sangat dihormati. Di stasiun kereta bawah tanah, ada tanda di lantai yang menunjukkan di mana harus berdiri menunggu kereta. Orang-orang berbaris rapi dan membiarkan penumpang keluar dulu sebelum masuk. Bahkan pasca gempa bumi 2011, warga Jepang antri dengan tertib untuk bahan makanan dan bensin. Tidak ada yang menyerobot antrian — ini dianggap sangat tidak sopan.",
    tags:["Etiket","Sosial"]
  },
];

const BUDAYA_CATEGORIES = [
  { id:"all",      label:"Semua",    emoji:"🗾" },
  { id:"etiket",   label:"Etiket",   emoji:"🙇" },
  { id:"makanan",  label:"Makanan",  emoji:"🍜" },
  { id:"festival", label:"Festival", emoji:"🎋" },
  { id:"seni",     label:"Seni",     emoji:"🎨" },
  { id:"alam",     label:"Alam",     emoji:"🌸" },
  { id:"unik",     label:"Unik",     emoji:"✨" },
];

// =============================================
//  ACHIEVEMENTS / BADGES
// =============================================
const ACHIEVEMENTS = [
  { id:"first_login",     title:"Langkah Pertama",    desc:"Login pertama kali",                   emoji:"🌱", check: s => true },
  { id:"h_10",            title:"Hiragana Pemula",    desc:"Lihat 10 karakter hiragana",           emoji:"🔤", check: s => (s.h_seen||[]).length >= 10 },
  { id:"h_all",           title:"Hiragana Master",    desc:"Lihat semua 46 hiragana",              emoji:"🏆", check: s => (s.h_seen||[]).length >= 46 },
  { id:"k_10",            title:"Katakana Pemula",    desc:"Lihat 10 karakter katakana",           emoji:"📝", check: s => (s.k_seen||[]).length >= 10 },
  { id:"k_all",           title:"Katakana Master",    desc:"Lihat semua 46 katakana",              emoji:"🥇", check: s => (s.k_seen||[]).length >= 46 },
  { id:"v_20",            title:"Kosakata Dasar",     desc:"Pelajari 20 kosakata",                 emoji:"📖", check: s => (s.v_seen||[]).length >= 20 },
  { id:"v_all",           title:"Kosakata Lengkap",   desc:"Pelajari semua kosakata",              emoji:"📚", check: s => (s.v_seen||[]).length >= VOCABULARY.length },
  { id:"streak_3",        title:"Konsisten",          desc:"Streak 3 hari berturut-turut",         emoji:"🔥", check: s => (s.streak||0) >= 3 },
  { id:"streak_7",        title:"Seminggu Penuh",     desc:"Streak 7 hari berturut-turut",         emoji:"🌟", check: s => (s.streak||0) >= 7 },
  { id:"quiz_perfect",    title:"Sempurna!",          desc:"Skor 100% dalam satu kuis",            emoji:"💯", check: s => (s.quiz_perfect||false) },
  { id:"quiz_5",          title:"Rajin Berlatih",     desc:"Selesaikan 5 kuis",                    emoji:"🎯", check: s => (s.quiz_count||0) >= 5 },
  { id:"daily_done",      title:"Tantangan Harian",   desc:"Selesaikan daily challenge",           emoji:"⭐", check: s => (s.daily_done||false) },
  { id:"fav_5",           title:"Kurator",            desc:"Tandai 5 kartu sebagai favorit",       emoji:"❤️", check: s => (s.favorites||[]).length >= 5 },
  { id:"budaya_all",      title:"Pecinta Budaya",     desc:"Baca semua artikel budaya",             emoji:"🗾", check: s => (s.budaya_seen||[]).length >= BUDAYA.length },
];

const FEEDBACK_CORRECT = [
  { msg:"Tepat sekali! よくできました！" },
  { msg:"Benar! すごい！" },
  { msg:"Mantap! 正解！" },
  { msg:"Yesss! えらい！" },
  { msg:"Sempurna! がんばったね！" },
];
const FEEDBACK_WRONG = [
  { msg:"Hampir! 大丈夫、次は！" },
  { msg:"Jangan nyerah! がんばれ！" },
  { msg:"Next kali pasti bisa! ファイト！" },
  { msg:"Coba lagi ya! もう一度！" },
];

// =============================================
//  BADGES
// =============================================
const BADGES = [
  { id:"first_login",  icon:"🌱", title:"Langkah Pertama",  desc:"Login untuk pertama kali",               check:(s)=>true },
  { id:"streak_3",     icon:"🔥", title:"Api Kecil",        desc:"Streak 3 hari berturut-turut",           check:(s)=>s.streak>=3 },
  { id:"streak_7",     icon:"🔥", title:"Seminggu Penuh",   desc:"Streak 7 hari berturut-turut",           check:(s)=>s.streak>=7 },
  { id:"h_10",         icon:"あ", title:"Baru Mulai",       desc:"Lihat 10 karakter Hiragana",             check:(s)=>s.hSeen>=10 },
  { id:"h_46",         icon:"あ", title:"Hiragana Master",  desc:"Lihat semua 46 karakter Hiragana",       check:(s)=>s.hSeen>=46 },
  { id:"k_46",         icon:"ア", title:"Katakana Master",  desc:"Lihat semua 46 karakter Katakana",       check:(s)=>s.kSeen>=46 },
  { id:"vocab_20",     icon:"📖", title:"Kolektor Kata",    desc:"Buka 20 kosakata",                       check:(s)=>s.vSeen>=20 },
  { id:"vocab_80",     icon:"📖", title:"Kamus Hidup",      desc:"Buka semua 80 kosakata",                 check:(s)=>s.vSeen>=80 },
  { id:"quiz_first",   icon:"🎯", title:"Peserta Pertama",  desc:"Selesaikan kuis pertama",                check:(s)=>s.quizDone>=1 },
  { id:"quiz_perfect", icon:"💯", title:"Sempurna!",        desc:"Raih skor 100% dalam satu kuis",         check:(s)=>s.perfectQuiz>=1 },
  { id:"quiz_5",       icon:"🏅", title:"Rajin Kuis",       desc:"Selesaikan 5 kuis",                      check:(s)=>s.quizDone>=5 },
  { id:"fav_5",        icon:"⭐", title:"Kolektor Favorit", desc:"Tambahkan 5 kartu favorit",              check:(s)=>s.favCount>=5 },
  { id:"budaya_all",   icon:"🌸", title:"Pecinta Budaya",   desc:"Buka semua halaman budaya",              check:(s)=>s.budayaSeen>=12 },
  { id:"daily_3",      icon:"🎲", title:"Rutin Belajar",    desc:"Buka kata harian 3 kali",                check:(s)=>s.dailyOpened>=3 },
];
