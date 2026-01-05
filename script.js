// ---------------- TRANSLATIONS ----------------
const translations = {
  en: {
    pageTitle: "Teck For All",
    siteTitle: "Tech For All",
    searchPlaceholder: "Explore assistive technologies ...",
    categories: {
      all: "All",
      dyslexia: "Dyslexia",
      dysgraphia: "Dysgraphia",
      dysphasia: "Dysphasia",
      auditory: "Auditory Processing Disorder",
    },
    nav: { home: "Home", about: "About Me" },
  },
  ar: {
    pageTitle: "التقنيات للجميع",
    siteTitle: "التقنيات للجميع",
    searchPlaceholder: "استكشف التقنيات المساعدة ...",
    categories: {
      all: "الكل",
      dyslexia: "عسر القراءة",
      dysgraphia: "عسر الكتابة",
      dysphasia: "اضطراب الكلام",
      auditory: "اضطراب المعالجة السمعية",
    },
    nav: { home: "الرئيسية", about: "من أنا" },
  },
};

// ---------------- LANGUAGE ----------------
// load saved language or default to "ar"
let currentLang = localStorage.getItem("lang") || "ar";

// ---------------- HARD-CODED TOOLS ----------------
const toolsData = [
  {
    id: 0,
    category: "dyslexia",
    title: {
      en: "Adaptive Arabic Memory App",
      ar: "تطبيق الذاكرة العربية التكيفي",
    },
    desc: {
      en: "Game-based application designed to improve short-term memory skills for Arabic-speaking students with dyslexia.",
      ar: "تطبيق تعليمي قائم على الألعاب يهدف إلى تحسين الذاكرة قصيرة المدى للطلاب الناطقين بالعربية المصابين بعسر القراءة.",
    },
    img: "images/adaptive-arabic-memory-app.png",
    url: "https://kuwaitjournals.org/jer/index.php/JER/article/view/7894/248",
  },
  {
    id: 1,
    category: "dysphasia",
    title: {
      en: "AAC Tablet Application",
      ar: "تطبيق التواصل المعزز والبديل على الأجهزة اللوحية",
    },
    desc: {
      en: "Picture-based AAC system supporting communication for individuals with dysphasia and language impairments.",
      ar: "نظام تواصل معزز وبديل يعتمد على الصور لدعم الأفراد الذين يعانون من اضطرابات اللغة والكلام.",
    },
    img: "images/aac-tablet-application.png",
    url: "https://kuwaitjournals.org/jer/index.php/JER/article/view/9201/1965",
  },
  {
    id: 2,
    category: "dyslexia",
    title: {
      en: "Mobile Cloud Multimodal Interface",
      ar: "واجهة متعددة الوسائط قائمة على الحوسبة السحابية",
    },
    desc: {
      en: "Reading support tool using multimodal inputs (visual, auditory, tactile) to assist learners with dyslexia.",
      ar: "أداة دعم للقراءة تستخدم مدخلات متعددة الوسائط لمساعدة المتعلمين المصابين بعسر القراءة.",
    },
    img: "images/mobile-cloud-multimodal-interface.png",
    url: "https://www.sciencedirect.com/science/article/pii/S0747563217303266",
  },
  {
    id: 3,
    category: "dyslexia",
    title: {
      en: "YUSR Speech Recognition",
      ar: "نظام يسر للتعرف على الكلام",
    },
    desc: {
      en: "Arabic speech recognition system designed to help dyslexic learners recognize and pronounce isolated letters.",
      ar: "نظام للتعرف على الكلام باللغة العربية يهدف إلى مساعدة المصابين بعسر القراءة في نطق وتمييز الحروف.",
      },
    img: "images/yusr-speech-recognition.png",
    url: "https://www.researchgate.net/profile/Mounira-Taileb/publication/299704852_YUSR_Speech_Recognition_Software_for_Dyslexics/links/5ff4ed90299bf1408874deb1/YUSR-Speech-Recognition-Software-for-Dyslexics.pdf",
  },
  {
    id: 4,
    category: "dyslexia",
    title: {
      en: "Dyslexia Explorer",
      ar: "مستكشف عسر القراءة",
    },
    desc: {
      en: "Eye-tracking based screening system for early detection of dyslexia in Arabic-speaking learners.",
      ar: "نظام فحص يعتمد على تتبع حركة العين للكشف المبكر عن عسر القراءة لدى المتعلمين الناطقين بالعربية.",
    },
    img: "images/dyslexia-explorer.png",
    url: "https://www.researchgate.net/profile/Areej-Al-Wabil/publication/255484479_Dyslexia_Explorer_A_Screening_System_for_Learning_Difficulties_in_the_Arabic_Language_Using_Eye_Tracking/links/575a923608aec91374a5f4ba/Dyslexia-Explorer-A-Screening-System-for-Learning-Difficulties-in-the-Arabic-Language-Using-Eye-Tracking.pdf",
  },
  {
    id: 5,
    category: "dysphasia",
    title: {
      en: "Qatari AAC Development (Tawasol)",
      ar: "تطبيق تواصل القطري (تواصل)",
    },
    desc: {
      en: "Culturally adapted Arabic AAC vocabulary developed in Qatar to support individuals with speech and language disorders.",
      ar: "تطبيق تواصل معزز وبديل بمفردات عربية متوافقة ثقافيًا لدعم الأفراد ذوي اضطرابات النطق واللغة.",
    },
    img: "images/tawasol-aac.jpg",
    url: "https://mip.mada.org.qa/solution/tawasol-aac-app/",
  },
];

// ---------------- STATE ----------------
let activeCategory = "all";
let searchTerm = "";

// ---------------- RENDER HELPERS ----------------
function renderTools() {
  const toolsList = document.getElementById("toolsList");
  toolsList.innerHTML = "";

  const lang = currentLang;
  const t = translations[lang];

  toolsData.forEach((tool) => {
    // filter by active category
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;

    // search includes: title (en/ar), category key, category label (en/ar for current lang)
    const titleEn = tool.title.en.toLowerCase();
    const titleAr = tool.title.ar.toLowerCase();
    const categoryKey = (tool.category || "").toLowerCase();
    const categoryLabel = (t.categories[tool.category] || tool.category).toLowerCase();
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !term ||
      titleEn.includes(term) ||
      titleAr.includes(term) ||
      categoryKey.includes(term) ||
      categoryLabel.includes(term);

    if (!matchesCategory || !matchesSearch) return;

    const card = document.createElement("div");
    card.className = `tool-card ${tool.category}`;

    // store searchable data (optional but handy)
    card.dataset.categoryKey = tool.category;
    card.dataset.categoryLabel = t.categories[tool.category] || tool.category;

    card.innerHTML = `
      <img src="${tool.img}" alt="${tool.title[lang]}" class="tool-img">
      <h3>${tool.title[lang]}</h3>
    `;

    card.style.cursor = "pointer";
    card.onclick = () => {
      window.location.href = `tool.html?id=${tool.id}`;
    };

    toolsList.appendChild(card);
  });
}

function renderCategories() {
  const t = translations[currentLang];
  const categoriesContainer = document.getElementById("categoryButtons");
  categoriesContainer.innerHTML = "";

  Object.entries(t.categories).forEach(([key, label], index) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.dataset.key = key;

    if (key === activeCategory || (index === 0 && activeCategory === "all")) {
      btn.classList.add("active");
    }

    btn.onclick = () => filterCategory(key, btn);
    categoriesContainer.appendChild(btn);
  });
}

// ---------------- LANGUAGE ----------------
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang); // save choice
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const t = translations[lang];
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;
  document.getElementById("searchBar").placeholder = t.searchPlaceholder;
  document.getElementById("homeBtn").innerText = t.nav.home;
  document.getElementById("aboutBtn").innerText = t.nav.about;

  // ✅ Re-render categories + tools (keeps search/category working)
  renderCategories();
  renderTools();

  // set dropdown to match current language
  const langSwitcher = document.getElementById("languageSwitcher");
  if (langSwitcher) langSwitcher.value = lang;
}

// ---------------- SEARCH ----------------
document.getElementById("searchBar").addEventListener("keyup", (e) => {
  searchTerm = e.target.value || "";
  // ✅ DO NOT reset category; combine filters naturally
  renderTools();
});

// ---------------- CATEGORY FILTER ----------------
function filterCategory(category, button) {
  activeCategory = category;

  document
    .querySelectorAll(".categories button")
    .forEach((btn) => btn.classList.remove("active"));
  if (button) button.classList.add("active");

  renderTools();
}

// ---------------- INIT ----------------
window.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("languageSwitcher");
  if (langSwitcher) {
    langSwitcher.value = currentLang;
    langSwitcher.addEventListener("change", (e) => setLanguage(e.target.value));
  }

  // initial render
  setLanguage(currentLang);
});
