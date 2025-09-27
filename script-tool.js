// =======================
// Firebase Setup
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyCy3M2abj-mcJLjOg4fcsJZzZrh_QgpDiE",
  authDomain: "assistivetoolsgcc.firebaseapp.com",
  projectId: "assistivetoolsgcc",
  storageBucket: "assistivetoolsgcc.firebasestorage.app",
  messagingSenderId: "124516142353",
  appId: "1:124516142353:web:b68cae144a913bdd4350b0",
  measurementId: "G-S2JSHME8EL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =======================
// Language Handling
// =======================
let currentLang = 'en';

function setLanguage(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
  loadTool();
}

// =======================
// Tool Data (Example)
// =======================
const toolsData = [
  { title: { en: "Tool A", ar: "الأداة أ" }, description: { en: "Description A", ar: "الوصف أ" } },
  { title: { en: "Tool B", ar: "الأداة ب" }, description: { en: "Description B", ar: "الوصف ب" } },
];

// Get tool ID from URL
const urlParams = new URLSearchParams(window.location.search);
const toolId = urlParams.get('id') || 0;

// Load Tool Info
function loadTool(){
  const tool = toolsData[toolId];
  document.getElementById('tool-title').innerText = tool.title[currentLang];
  document.getElementById('tool-description').innerText = tool.description[currentLang];
}

// =======================
// Share & Print
// =======================
function shareTool(){
  alert("Share functionality can be implemented here.");
}

function printTool(){
  window.print();
}

// =======================
// Comments
// =======================
const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentsContainer");

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = commentForm.name.value.trim();
  const email = commentForm.email.value.trim();
  const phone = commentForm.phone.value.trim();
  const comment = commentForm.comment.value.trim();

  if(!name || !email || !phone || !comment){
    alert("Please fill in all fields.");
    return;
  }

  try {
    await db.collection("comments").add({
      toolId: toolId,
      name,
      email,
      phone,
      comment,
      date: new Date()
    });

    alert("Comment submitted successfully!");
    commentForm.reset();
    loadComments();
  } catch (error) {
    console.error("Error adding comment: ", error);
    alert("Failed to submit comment.");
  }
});

async function loadComments(){
  commentsContainer.innerHTML = "";
  const snapshot = await db.collection("comments")
    .where("toolId", "==", parseInt(toolId))
    .orderBy("date","desc")
    .get();

  if(snapshot.empty){
    commentsContainer.innerHTML = currentLang === 'ar' ? "<p>لا توجد تعليقات بعد.</p>" : "<p>No comments yet.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.classList.add("comment");
    div.style.borderBottom = "1px solid #ccc";
    div.style.padding = "10px 0";
    div.innerHTML = `
      <p><strong>${data.name}</strong> (${data.email}, ${data.phone})</p>
      <p>${data.comment}</p>
    `;
    commentsContainer.appendChild(div);
  });
}

// Initial load
loadTool();
loadComments();
