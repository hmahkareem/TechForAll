// Import Firebase modules (modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy3M2abj-mcJLjOg4fcsJZzZrh_QgpDiE",
  authDomain: "assistivetoolsgcc.firebaseapp.com",
  projectId: "assistivetoolsgcc",
  storageBucket: "assistivetoolsgcc.firebasestorage.app",
  messagingSenderId: "124516142353",
  appId: "1:124516142353:web:b68cae144a913bdd4350b0",
  measurementId: "G-S2JSHME8EL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tools data (bilingual)
const toolsData = [
  {
    id: 0,
    category: "dyslexia",
    title: { en: "Tool A", ar: "الأداة أ" },
    desc: {
      en: "Helps students with Dyslexia improve reading.",
      ar: "تساعد الطلاب الذين يعانون من عسر القراءة على تحسين مهارات القراءة.",
    },
    img: "images/tool-a.jpg",
  },
  {
    id: 1,
    category: "dysgraphia",
    title: { en: "Tool B", ar: "الأداة ب" },
    desc: {
      en: "Supports Dysgraphia with handwriting assistance.",
      ar: "تدعم عسر الكتابة من خلال المساعدة في الكتابة اليدوية.",
    },
    img: "images/tool-b.jpg",
  },
  {
    id: 2,
    category: "dysphasia",
    title: { en: "Tool C", ar: "الأداة ج" },
    desc: {
      en: "Speech support software for Dysphasia.",
      ar: "برنامج دعم النطق لاضطراب الكلام.",
    },
    img: "images/tool-c.jpeg",
  },
  {
    id: 3,
    category: "auditory",
    title: { en: "Tool D", ar: "الأداة د" },
    desc: {
      en: "Enhances listening for Auditory Processing Disorder.",
      ar: "يعزز الاستماع لاضطراب المعالجة السمعية.",
    },
    img: "images/tool-d.png",
  },
  {
    id: 4,
    category: "dyslexia",
    title: { en: "Tool E", ar: "الأداة هـ" },
    desc: {
      en: "Another great app for Dyslexia learners.",
      ar: "تطبيق آخر رائع لمتعلمي عسر القراءة.",
    },
    img: "images/tool-e.webp",
  },
];

const translations = {
  en: {
    addComment: "Add Your Comment",
    name: "Name",
    email: "Email",
    phone: "Phone",
    comment: "Write your comment here...",
    share: "Share the tool",
    print: "Print the tool",
    submit: "Submit your comment",
    prevComments: "Previous Comments",
    noComments: "No comments yet.",
    fillAll: "Please fill in all fields.",
    success: "Your feedback has been received. Thank you!",
    siteTitle: "Tech For All",
    home: "Home",
    aboutbtn: "About",
    saving: "Saving your comment ...",
    missing:"Missing"
  },
  ar: {
    addComment: "أضف تعليقك",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    comment: "اكتب تعليقك هنا...",
    share: "مشاركة الأداة",
    print: "طباعة الأداة",
    submit: "إرسال التعليق",
    prevComments: "التعليقات السابقة",
    noComments: "لا توجد تعليقات بعد.",
    fillAll: "يرجى ملء جميع الحقول.",
    success: "تم استلام تعليقك. شكرًا لك!",
    siteTitle: "التقنيات للجميع",
    home: "الرئيسية",
    aboutbtn: "من أنا",
    saving: "جارٍ حفظ تعليقك ...",
    missing:"المفقود"
  },
};

// ✅ Load language from localStorage or fallback to Arabic
let currentLang = localStorage.getItem("lang") || "ar";

// Language switcher
document.getElementById("languageSwitcher").addEventListener("change", (e) => {
  const newLang = e.target.value;
  localStorage.setItem("lang", newLang); // ✅ Save language
  setLanguage(newLang);
});

// Get tool ID from URL
function getToolId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id")) || 0;
}

// Initialize page
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const id = getToolId();
  const tool = toolsData.find((t) => t.id === id);
  const t = translations[lang];

  // ✅ Reflect current language in dropdown
  document.getElementById("languageSwitcher").value = lang;

  // ✅ Update site and nav texts
  document.getElementById("site-title").innerText = t.siteTitle;
  document.getElementById("homeBtn").innerText = t.home;
  document.getElementById("aboutBtn").innerText = t.aboutbtn;
  document.querySelector("#loadingOverlay span").innerText = t.saving;

  // ✅ Dynamic page title with tool name
  document.title = `${tool.title[lang]}`;

  // Render tool details
  const container = document.getElementById("toolDetails");
  container.innerHTML = `
    <img src="${tool.img}" alt="${tool.title[lang]}" class="tool-img-detail">
    <h2>${tool.title[lang]}</h2>
    <p>${tool.desc[lang]}</p>

    <h3>${t.addComment}</h3>

    <form id="commentForm">
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
        <label for="userName" class="sr-only">${t.name}</label>
        <input type="text" id="userName" placeholder="${t.name}" style="flex:1; padding:8px;">
        <label for="userEmail" class="sr-only">${t.email}</label>
        <input type="email" id="userEmail" placeholder="${t.email}" style="flex:1; padding:8px;">
        <label for="userPhone" class="sr-only">${t.phone}</label>
        <input type="tel" id="userPhone" placeholder="${t.phone}" style="flex:1; padding:8px;">
      </div>

      <label for="commentInput" class="sr-only">${t.comment}</label>
      <textarea id="commentInput" placeholder="${t.comment}" style="width:100%; padding:8px;"></textarea>

      <div style="margin-top:10px; display:flex; justify-content:space-between; flex-wrap:wrap;">
        <div style="display: flex">
          <button id="shareBtn" aria-label="${t.share}"><i class="fas fa-share-alt"></i></button>
          <button id="printBtn" aria-label="${t.print}"><i class="fas fa-print"></i></button>
        </div>
        <div>
          <button id="submitBtn">${t.submit}</button>
        </div>
      </div>
    </form>

    <h3 style="margin-top:25px;">${t.prevComments}</h3>
    <div id="commentsList"></div>
    <div id="feedbackMsg" aria-live="polite" style="margin-top:10px;color:green;"></div>
  `;

  // Add button listeners
  document.getElementById("shareBtn").addEventListener("click", shareTool);
  document.getElementById("printBtn").addEventListener("click", printTool);
  document
    .getElementById("submitBtn")
    .addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default form submission
      submitFeedback(tool);
    });

  loadComments(tool);
}

// Load comments from Firestore
async function loadComments(tool) {
  const commentsContainer = document.getElementById("commentsList");
  commentsContainer.innerHTML = "";

  try {
    const commentsCol = collection(db, "tools", tool.id.toString(), "comments");
    const q = query(commentsCol, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      commentsContainer.innerHTML = `<p>${translations[currentLang].noComments}</p>`;
      return;
    }
    snapshot.forEach((doc) => {
      const c = doc.data();
      const div = document.createElement("div");
      div.style.borderBottom = "1px solid #ccc";
      div.style.padding = "8px 0";
      div.innerHTML = `<strong>${c.name}</strong> (${c.date})<br>Email: ${c.email} | Phone: ${c.phone}<br>${c.text}`;
      commentsContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading comments:", err);
  }
}

async function submitFeedback(tool) {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const commentText = document.getElementById("commentInput").value.trim();
  const msg = document.getElementById("feedbackMsg");
  
  let errors = [];
  if (!name) errors.push(translations[currentLang].name);
  if (!email) errors.push(translations[currentLang].email);
  if (!phone) errors.push(translations[currentLang].phone);
  if (!commentText) errors.push(translations[currentLang].comment);
  
  if (errors.length > 0) {
    msg.style.color = "red";
    msg.innerText = `${translations[currentLang].fillAll} ${translations[currentLang].missing}: ${errors.join(', ')}.`;
    return;
  }

  // Show loader
  document.getElementById("loadingOverlay").style.display = "flex";

  try {
    // Add comment to Firestore
    await addDoc(collection(db, "tools", tool.id.toString(), "comments"), {
      name,
      email,
      phone,
      text: commentText,
      date: new Date().toLocaleString(),
    });

    // Clear inputs
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("commentInput").value = "";

    msg.style.color = "green";
    msg.innerText = translations[currentLang].success;

    // Reload comments
    loadComments(tool);
  } catch (err) {
    console.error("Error submitting comment:", err);
    msg.style.color = "red";
    msg.innerText = "Error submitting comment.";
  } finally {
    document.getElementById("loadingOverlay").style.display = "none";
  }
}

// Share URL
function shareTool() {
  const shareData = {
    title: document.getElementById("site-title").innerText,
    text: "Check out this assistive tool!",
    url: window.location.href,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      .then(() => console.log("Shared successfully"))
      .catch((err) => console.error("Error sharing:", err));
  } else {
    // Fallback: copy URL
    navigator.clipboard
      .writeText(window.location.href)
      .then(() =>
        alert(currentLang === "ar" ? "تم نسخ رابط الأداة!" : "Tool URL copied!")
      )
      .catch((err) => console.error("Could not copy URL:", err));
  }
}

function printTool() {
  // Add a class to the body to control print visibility with CSS
  document.body.classList.add('print-only-tool-content');
  
  // Call the browser's print dialog
  window.print();
  
  // Remove the class after the print dialog is closed
  document.body.classList.remove('print-only-tool-content');
}

// Initialize page with saved language
setLanguage(currentLang);