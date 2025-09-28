// ---------------- TRANSLATIONS ----------------
const translations = {
  en: {
    pageTitle: "Assistive Technologies GCC",
    siteTitle: "Assistive Technologies in GCC",
    searchPlaceholder: "Search tools...",
    categories: { all: "All", dyslexia: "Dyslexia", dysgraphia: "Dysgraphia", dysphasia: "Dysphasia", auditory: "Auditory Processing Disorder" },
    nav: { home: "Home", about: "About" }
  },
  ar: {
    pageTitle: "التقنيات المساعدة في الخليج",
    siteTitle: "التقنيات المساعدة في الخليج",
    searchPlaceholder: "ابحث عن الأدوات...",
    categories: { all: "الكل", dyslexia: "عسر القراءة", dysgraphia: "عسر الكتابة", dysphasia: "اضطراب الكلام", auditory: "اضطراب المعالجة السمعية" },
    nav: { home: "الرئيسية", about: "حول" }
  }
};

let currentLang = "en";

// ---------------- HARD-CODED TOOLS ----------------
const toolsData = [
  { id: 0, category: "dyslexia", title: { en: "Tool A", ar: "الأداة أ" }, desc: { en: "Helps students with Dyslexia improve reading.", ar: "تساعد الطلاب الذين يعانون من عسر القراءة على تحسين مهارات القراءة." }, img: "images/tool-a.jpg"},
  { id: 1, category: "dysgraphia", title: { en: "Tool B", ar: "الأداة ب" }, desc: { en: "Supports Dysgraphia with handwriting assistance.", ar: "تدعم عسر الكتابة من خلال المساعدة في الكتابة اليدوية." }, img: "images/tool-b.jpg" },
  { id: 2, category: "dysphasia", title: { en: "Tool C", ar: "الأداة ج" }, desc: { en: "Speech support software for Dysphasia.", ar: "برنامج دعم النطق لاضطراب الكلام." }, img: "images/tool-c.jpeg" },
  { id: 3, category: "auditory", title: { en: "Tool D", ar: "الأداة د" }, desc: { en: "Enhances listening for Auditory Processing Disorder.", ar: "يعزز الاستماع لاضطراب المعالجة السمعية." }, img: "images/tool-d.png" },
  { id: 4, category: "dyslexia", title: { en: "Tool E", ar: "الأداة هـ" }, desc: { en: "Another great app for Dyslexia learners.", ar: "تطبيق آخر رائع لمتعلمي عسر القراءة." }, img: "images/tool-e.webp" }
];

// ---------------- BUILD UI ----------------
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const t = translations[lang];
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;
  document.getElementById("searchBar").placeholder = t.searchPlaceholder;
  document.getElementById("homeBtn").innerText = t.nav.home;
document.getElementById("aboutBtn").innerText = t.nav.about;

  // Categories
  const categoriesContainer = document.getElementById("categoryButtons");
  categoriesContainer.innerHTML = "";
  Object.entries(t.categories).forEach(([key, label], index) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.dataset.key = key;
    btn.onclick = () => filterCategory(key, btn);
    if (index === 0) btn.classList.add("active");
    categoriesContainer.appendChild(btn);
  });

  // Tools grid
  const toolsList = document.getElementById("toolsList");
  toolsList.innerHTML = "";
  toolsData.forEach(tool => {
  const card = document.createElement("div");
  card.className = `tool-card ${tool.category}`;
  card.innerHTML = `
    <img src="${tool.img}" alt="${tool.title[lang]}" class="tool-img">
    <h3>${tool.title[lang]}</h3>
    <p>${tool.desc[lang]}</p>
  `;
  card.style.cursor = "pointer";
  card.onclick = () => { window.location.href = `tool.html?id=${tool.id}`; };
  toolsList.appendChild(card);
});
}

// ---------------- SEARCH ----------------
document.getElementById("searchBar").addEventListener("keyup", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".tool-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term) ? "block" : "none";
  });

  // Reset category
  document.querySelectorAll(".categories button").forEach(btn => btn.classList.remove("active"));
  const firstBtn = document.querySelector(".categories button");
  if (firstBtn) firstBtn.classList.add("active");
});

// ---------------- CATEGORY FILTER ----------------
function filterCategory(category, button) {
  document.querySelectorAll(".tool-card").forEach(card => {
    card.style.display = category === "all" || card.classList.contains(category) ? "block" : "none";
  });

  document.querySelectorAll(".categories button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// ---------------- INIT ----------------
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("languageSwitcher").addEventListener("change", e => setLanguage(e.target.value));
  setLanguage(currentLang);
});
