export interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  hasAudio?: boolean;
  source?: string;
  benefits?: string;
  tags?: string[];
  isFavorite?: boolean;
}

export const duasData: Dua[] = [
  // Daily Duas
  {
    id: 1,
    title: "Dua When Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-lathee ahyana ba'da ma amatana wa ilayhin-nushoor",
    translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    category: "Daily",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Protection and gratitude for a new day",
    tags: ["morning", "gratitude", "daily"]
  },
  {
    id: 2,
    title: "Dua Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amootu wa ahya",
    translation: "In Your name O Allah, I live and die.",
    category: "Daily",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Protection during sleep",
    tags: ["night", "sleep", "protection"]
  },
  {
    id: 3,
    title: "Dua Before Meals",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barakatillah",
    translation: "In the name of Allah and with the blessings of Allah.",
    category: "Daily",
    hasAudio: true,
    source: "Abu Dawud",
    benefits: "Blessing in food and sustenance",
    tags: ["food", "blessing", "daily"]
  },
  {
    id: 4,
    title: "Dua After Meals",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-lathee at'amanee hatha wa razaqaneehi min ghayri hawlin minnee wa la quwwah",
    translation: "All praise is due to Allah who has given me this food and provided it for me without any strength or power on my part.",
    category: "Daily",
    hasAudio: true,
    source: "Tirmidhi",
    benefits: "Gratitude and forgiveness of sins",
    tags: ["food", "gratitude", "daily"]
  },
  {
    id: 5,
    title: "Dua When Entering Home",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
    translation: "In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we depend.",
    category: "Daily",
    hasAudio: true,
    source: "Abu Dawud",
    benefits: "Protection of home and family",
    tags: ["home", "protection", "daily"]
  },
  {
    id: 6,
    title: "Dua When Leaving Home",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
    translation: "In the name of Allah, I trust in Allah, and there is no might nor power except with Allah.",
    category: "Daily",
    hasAudio: true,
    source: "Tirmidhi",
    benefits: "Protection during travel and activities",
    tags: ["travel", "protection", "daily"]
  },

  // Travel Duas
  {
    id: 7,
    title: "Dua for Travel",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhanal-lathee sakhkhara lana hatha wa ma kunna lahu muqrineen wa inna ila rabbina lamunqaliboon",
    translation: "Glory unto Him who has subjected this to us, and we could never have it by our efforts, and to our Lord we shall indeed return.",
    category: "Travel",
    hasAudio: true,
    source: "Quran 43:13-14",
    benefits: "Safe journey and protection",
    tags: ["travel", "journey", "protection"]
  },
  {
    id: 8,
    title: "Dua When Returning from Travel",
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    transliteration: "Ayiboona ta'iboona 'abidoona li rabbina hamidoon",
    translation: "We return, repent, worship and praise our Lord.",
    category: "Travel",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Gratitude for safe return",
    tags: ["travel", "return", "gratitude"]
  },

  // Prayer Duas
  {
    id: 9,
    title: "Dua After Adhan",
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
    transliteration: "Allahumma rabba hathihid-da'watit-tammati was-salatil-qa'imati, ati Muhammadanil-waseelata wal-fadeelata, wab'ath-hu maqaman mahmoodanil-lathee wa'adtah",
    translation: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the praised position which You have promised him.",
    category: "Prayer",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Intercession of Prophet Muhammad (PBUH)",
    tags: ["adhan", "prayer", "prophet"]
  },
  {
    id: 10,
    title: "Dua Between Adhan and Iqamah",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'innee 'ala thikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
    category: "Prayer",
    hasAudio: true,
    source: "Abu Dawud",
    benefits: "Better worship and remembrance",
    tags: ["prayer", "worship", "remembrance"]
  },

  // Protection Duas
  {
    id: 11,
    title: "Ayat al-Kursi",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa huwal-hayyul-qayyoom, la ta'khuthuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man thal-lathee yashfa'u 'indahu illa bi-ithnih, ya'lamu ma bayna aydeehim wa ma khalfahum, wa la yuheetoona bi shay'in min 'ilmihi illa bima sha', wasi'a kursiyyuhus-samawati wal-ard, wa la ya'ooduhu hifthuhuma, wa huwal-'aliyyul-'atheem",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    category: "Protection",
    hasAudio: true,
    source: "Quran 2:255",
    benefits: "Ultimate protection from all harm",
    tags: ["protection", "quran", "powerful"]
  },
  {
    id: 12,
    title: "Dua for Protection from Evil Eye",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'oothu bi kalimatillahit-tammati min sharri ma khalaq",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    category: "Protection",
    hasAudio: true,
    source: "Muslim",
    benefits: "Protection from evil eye and harm",
    tags: ["protection", "evil eye", "refuge"]
  },

  // Health & Healing
  {
    id: 13,
    title: "Dua for Healing",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ وَاشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا",
    transliteration: "Allahumma rabban-nasi, athhib al-ba'sa washfi, antash-shafee la shifa'a illa shifa'uka, shifa'an la yughadiru saqama",
    translation: "O Allah, Lord of mankind, remove the hardship and heal, You are the Healer, there is no healing except Your healing, a healing that leaves no illness.",
    category: "Health",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Complete healing from illness",
    tags: ["health", "healing", "illness"]
  },
  {
    id: 14,
    title: "Dua When Visiting the Sick",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa, tahoorun in sha Allah",
    translation: "No harm, it is purification, Allah willing.",
    category: "Health",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Comfort and healing for the sick",
    tags: ["health", "visiting", "comfort"]
  },

  // Forgiveness & Repentance
  {
    id: 15,
    title: "Sayyid al-Istighfar (Master of Seeking Forgiveness)",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta rabbee la ilaha illa ant, khalaqtanee wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mastata't, a'oothu bika min sharri ma sana't, aboo'u laka bi ni'matika 'alayya wa aboo'u bi thanbee, faghfir lee fa innahu la yaghfiruth-thunooba illa ant",
    translation: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I keep Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for indeed none forgives sins but You.",
    category: "Forgiveness",
    hasAudio: true,
    source: "Bukhari",
    benefits: "Complete forgiveness of sins",
    tags: ["forgiveness", "repentance", "powerful"]
  },
  {
    id: 16,
    title: "Simple Istighfar",
    arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha al-'atheema al-lathee la ilaha illa huwal-hayyul-qayyoomu wa atoobu ilayh",
    translation: "I seek forgiveness from Allah the Mighty, whom there is no god but He, the Living, the Eternal, and I repent to Him.",
    category: "Forgiveness",
    hasAudio: true,
    source: "Tirmidhi",
    benefits: "Forgiveness and acceptance of repentance",
    tags: ["forgiveness", "repentance", "simple"]
  },

  // Gratitude & Praise
  {
    id: 17,
    title: "Dua for Gratitude",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'innee 'ala thikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
    category: "Gratitude",
    hasAudio: true,
    source: "Abu Dawud",
    benefits: "Increased gratitude and better worship",
    tags: ["gratitude", "worship", "remembrance"]
  },
  {
    id: 18,
    title: "Tasbih (Glorification)",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhanallahi walhamdu lillahi wa la ilaha illallahu wallahu akbar",
    translation: "Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest.",
    category: "Gratitude",
    hasAudio: true,
    source: "Muslim",
    benefits: "Immense reward and purification",
    tags: ["praise", "glorification", "dhikr"]
  },

  // Seeking Knowledge
  {
    id: 19,
    title: "Dua for Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidnee 'ilma",
    translation: "My Lord, increase me in knowledge.",
    category: "Knowledge",
    hasAudio: true,
    source: "Quran 20:114",
    benefits: "Increase in beneficial knowledge",
    tags: ["knowledge", "learning", "wisdom"]
  },
  {
    id: 20,
    title: "Dua Before Studying",
    arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا",
    transliteration: "Allahumman-fa'nee bima 'allamtanee wa 'allimnee ma yanfa'unee wa zidnee 'ilma",
    translation: "O Allah, benefit me with what You have taught me, and teach me what will benefit me, and increase me in knowledge.",
    category: "Knowledge",
    hasAudio: true,
    source: "Tirmidhi",
    benefits: "Beneficial knowledge and understanding",
    tags: ["knowledge", "study", "learning"]
  }
];

export const duaCategories = [
  "All",
  "Daily",
  "Travel", 
  "Prayer",
  "Protection",
  "Health",
  "Forgiveness",
  "Gratitude",
  "Knowledge"
];