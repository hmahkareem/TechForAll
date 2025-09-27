// Tools data (shared comments, bilingual titles/descriptions)
const toolsData = [
  { 
    title: { en: "Tool A", ar: "الأداة أ" },
    desc: { en: "Helps students with Dyslexia improve reading.", ar: "تساعد الطلاب الذين يعانون من عسر القراءة على تحسين مهارات القراءة." },
    category: "dyslexia",
    comments: []
  },
  { 
    title: { en: "Tool B", ar: "الأداة ب" },
    desc: { en: "Supports Dysgraphia with handwriting assistance.", ar: "تدعم عسر الكتابة من خلال المساعدة في الكتابة اليدوية." },
    category: "dysgraphia",
    comments: []
  },
  { 
    title: { en: "Tool C", ar: "الأداة ج" },
    desc: { en: "Speech support software for Dysphasia.", ar: "برنامج دعم النطق لاضطراب الكلام." },
    category: "dysphasia",
    comments: []
  },
  { 
    title: { en: "Tool D", ar: "الأداة د" },
    desc: { en: "Enhances listening for Auditory Processing Disorder.", ar: "يعزز الاستماع لاضطراب المعالجة السمعية." },
    category: "auditory",
    comments: []
  },
  { 
    title: { en: "Tool E", ar: "الأداة هـ" },
    desc: { en: "Another great app for Dyslexia learners.", ar: "تطبيق آخر رائع لمتعلمي عسر القراءة." },
    category: "dyslexia",
    comments: []
  }
];

const translations = {
  en: {
    addComment: "Add Your Comment",
    name: "Name",
    email: "Email",
    phone: "Phone",
    comment: "Write your comment here...",
    share: "Share",
    print: "Print",
    submit: "Submit",
    prevComments: "Previous Comments",
    noComments: "No comments yet.",
    fillAll: "Please fill in all fields.",
    success: "Your feedback has been received. Thank you!"
  },
  ar: {
    addComment: "أضف تعليقك",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    comment: "اكتب تعليقك هنا...",
    share: "مشاركة",
    print: "طباعة",
    submit: "إرسال",
    prevComments: "التعليقات السابقة",
    noComments: "لا توجد تعليقات بعد.",
    fillAll: "يرجى ملء جميع الحقول.",
    success: "تم استلام تعليقك. شكرًا لك!"
  }
};

let currentLang = "en";

// Get tool ID from URL
function getToolId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || 0;
}

// Initialize page
function setLanguage(lang){
  currentLang = lang;

  // Set <html> lang attribute for CSS
  document.documentElement.lang = lang;

  // Set page direction
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";


  const id = getToolId();
  const tool = toolsData[id];
  const t = translations[lang];

  document.getElementById("site-title").innerText = tool.title[lang];

  const container = document.getElementById("toolDetails");

  container.innerHTML = `
    <h2>${tool.title[lang]}</h2>
    <p>${tool.desc[lang]}</p>

    <h3>${t.addComment}</h3>

    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:8px;">
      <input type="text" id="userName" placeholder="${t.name}" style="flex:1; padding:8px;">
      <input type="email" id="userEmail" placeholder="${t.email}" style="flex:1; padding:8px;">
      <input type="tel" id="userPhone" placeholder="${t.phone}" style="flex:1; padding:8px;">
    </div>

    <textarea id="feedback" placeholder="${t.comment}" style="width:100%; padding:8px;"></textarea>

    <div style="margin-top:10px; display:flex; justify-content:space-between; flex-wrap:wrap;">
  <div>
    <button onclick="shareTool()">${t.share}</button>
    <button onclick="printTool()">${t.print}</button>
  </div>
  <div>
    <button onclick="submitFeedback()">${t.submit}</button>
  </div>
</div>

    <h3 style="margin-top:25px;">${t.prevComments}</h3>
    <div id="commentsList"></div>

    <div id="feedbackMsg" style="margin-top:10px;color:green;"></div>
  `;

  renderComments(tool);
}

// Render comments
function renderComments(tool){
  const commentsContainer = document.getElementById("commentsList");
  commentsContainer.innerHTML = "";

  if(tool.comments.length === 0){
    commentsContainer.innerHTML = `<p>${translations[currentLang].noComments}</p>`;
    return;
  }

  tool.comments.forEach(c=>{
    const div = document.createElement("div");
    div.style.borderBottom = "1px solid #ccc";
    div.style.padding = "8px 0";
    div.innerHTML = `<strong>${c.name}</strong> (${c.date})<br>Email: ${c.email} | Phone: ${c.phone}<br>${c.text}`;
    commentsContainer.appendChild(div);
  });
}

// Share URL
function shareTool(){
  navigator.clipboard.writeText(window.location.href).then(()=>{
    alert(currentLang === "ar" ? "تم نسخ رابط الأداة!" : "Tool URL copied!");
  });
}

// Print
function printTool(){ window.print(); }

// Submit feedback
function submitFeedback(){
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const feedback = document.getElementById("feedback").value.trim();
  const msg = document.getElementById("feedbackMsg");
  const id = getToolId();
  const tool = toolsData[id];

  if(!name || !email || !phone || !feedback){
    msg.style.color = "red";
    msg.innerText = translations[currentLang].fillAll;
    return;
  }

  const date = new Date().toLocaleString();
  tool.comments.push({ name, email, phone, text: feedback, date });

  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userPhone").value = "";
  document.getElementById("feedback").value = "";

  msg.style.color = "green";
  msg.innerText = translations[currentLang].success;

  renderComments(tool);
}

// Initialize page
setLanguage(currentLang);
