// --------------- FIREBASE SETUP ---------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy3M2abj-mcJLjOg4fcsJZzZrh_QgpDiE",
  authDomain: "assistivetoolsgcc.firebaseapp.com",
  projectId: "assistivetoolsgcc",
  storageBucket: "assistivetoolsgcc.firebasestorage.app",
  messagingSenderId: "124516142353",
  appId: "1:124516142353:web:b68cae144a913bdd4350b0",
  measurementId: "G-S2JSHME8EL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------- TRANSLATIONS ---------------
const translations = {
  en: {
    pageTitle: "Assistive Technologies GCC",
    siteTitle: "Assistive Technologies in GCC",
    searchPlaceholder: "Search tools...",
    categories: { all: "All", dyslexia: "Dyslexia", dysgraphia: "Dysgraphia", dysphasia: "Dysphasia", auditory: "Auditory Processing Disorder" }
  },
  ar: {
    pageTitle: "التقنيات المساعدة في الخليج",
    siteTitle: "التقنيات المساعدة في الخليج",
    searchPlaceholder: "ابحث عن الأدوات...",
    categories: { all: "الكل", dyslexia: "عسر القراءة", dysgraphia: "عسر الكتابة", dysphasia: "اضطراب الكلام", auditory: "اضطراب المعالجة السمعية" }
  }
};

let currentLang = "en";
let toolsData = [];

// --------------- FETCH TOOLS FROM FIRESTORE ---------------
async function fetchTools() {
  const querySnapshot = await getDocs(collection(db, "tools"));
  toolsData = [];
  querySnapshot.forEach(doc => {
    toolsData.push({ id: doc.id, ...doc.data() });
  });
}

// --------------- BUILD UI ---------------
async function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  // Wait for tools from Firestore
  await fetchTools();

  const t = translations[lang];
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;
  document.getElementById("searchBar").placeholder = t.searchPlaceholder;

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
  toolsData.forEach((tool) => {
    const card = document.createElement("div");
    card.className = `tool-card ${tool.category}`;
    card.innerHTML = `<h3>${tool.title[lang]}</h3><p>${tool.desc[lang]}</p>`;
    card.style.cursor = "pointer";
    card.onclick = () => { window.location.href = `tool.html?id=${tool.id}`; };
    toolsList.appendChild(card);
  });
}

// --------------- SEARCH FILTER ---------------
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

// --------------- CATEGORY FILTER ---------------
function filterCategory(category, button) {
  document.querySelectorAll(".tool-card").forEach(card => {
    if (category === "all") card.style.display = "block";
    else card.style.display = card.classList.contains(category) ? "block" : "none";
  });

  document.querySelectorAll(".categories button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
}

// --------------- INITIALIZE ---------------
setLanguage(currentLang);
