// =======================
// Firebase Setup
// =======================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// TRANSLATIONS AND TOOL DATA
const translations = {
  en: {
    pageTitle: "Assistive Technologies GCC",
    siteTitle: "Assistive Technologies in GCC",
    searchPlaceholder: "Search tools...",
    categories: {
      all: "All",
      dyslexia: "Dyslexia",
      dysgraphia: "Dysgraphia",
      dysphasia: "Dysphasia",
      auditory: "Auditory Processing Disorder"
    },
    tools: [
      { category: "dyslexia", title: "Tool A", desc: "Helps students with Dyslexia improve reading." },
      { category: "dysgraphia", title: "Tool B", desc: "Supports Dysgraphia with handwriting assistance." },
      { category: "dysphasia", title: "Tool C", desc: "Speech support software for Dysphasia." },
      { category: "auditory", title: "Tool D", desc: "Enhances listening for Auditory Processing Disorder." },
      { category: "dyslexia", title: "Tool E", desc: "Another great app for Dyslexia learners." }
    ]
  },
  ar: {
    pageTitle: "التقنيات المساعدة في الخليج",
    siteTitle: "التقنيات المساعدة في الخليج",
    searchPlaceholder: "ابحث عن الأدوات...",
    categories: {
      all: "الكل",
      dyslexia: "عسر القراءة",
      dysgraphia: "عسر الكتابة",
      dysphasia: "اضطراب الكلام",
      auditory: "اضطراب المعالجة السمعية"
    },
    tools: [
      { category: "dyslexia", title: "الأداة أ", desc: "تساعد الطلاب الذين يعانون من عسر القراءة على تحسين مهارات القراءة." },
      { category: "dysgraphia", title: "الأداة ب", desc: "تدعم عسر الكتابة من خلال المساعدة في الكتابة اليدوية." },
      { category: "dysphasia", title: "الأداة ج", desc: "برنامج دعم النطق لاضطراب الكلام." },
      { category: "auditory", title: "الأداة د", desc: "يعزز الاستماع لاضطراب المعالجة السمعية." },
      { category: "dyslexia", title: "الأداة هـ", desc: "تطبيق آخر رائع لمتعلمي عسر القراءة." }
    ]
  }
};

let currentLang = "en";

// SET LANGUAGE AND BUILD UI
function setLanguage(lang) {
  currentLang = lang;

  // Set <html> lang attribute for CSS
  document.documentElement.lang = lang;

  // Set page direction
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const t = translations[lang];

  // Direction
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  // Titles
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;
  document.getElementById("searchBar").placeholder = t.searchPlaceholder;

  // Categories
  const categoriesContainer = document.getElementById("categoryButtons");
  categoriesContainer.innerHTML = "";
  Object.entries(t.categories).forEach(([key, label], index) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.setAttribute("data-key", key);
    btn.onclick = () => filterCategory(key, btn);
    if(index === 0) btn.classList.add("active"); // default "All"
    categoriesContainer.appendChild(btn);
  });

  // Tools grid
  const toolsList = document.getElementById("toolsList");
  toolsList.innerHTML = "";
  t.tools.forEach((tool, index) => {
    const card = document.createElement("div");
    card.className = `tool-card ${tool.category}`;
    card.innerHTML = `
      <h3>${tool.title}</h3>
      <p>${tool.desc}</p>
    `;
    // Make card clickable: go to tool.html?id=index
    card.style.cursor = "pointer";
    card.onclick = () => {
      window.location.href = `tool.html?id=${index}`;
    };
    toolsList.appendChild(card);
  });
}

// SEARCH FILTER
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", function(e){
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".tool-card");
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(term) ? "block" : "none";
  });

  // Reset active category
  const buttons = document.querySelectorAll(".categories button");
  buttons.forEach(btn => btn.classList.remove("active"));
  if(buttons[0]) buttons[0].classList.add("active");
});

// CATEGORY FILTER
function filterCategory(category, button){
  const cards = document.querySelectorAll(".tool-card");
  cards.forEach(card => {
    if(category === "all"){
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(category) ? "block" : "none";
    }
  });

  // Highlight button
  const buttons = document.querySelectorAll(".categories button");
  buttons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// INITIALIZE
setLanguage(currentLang);
