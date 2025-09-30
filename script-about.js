const translations = {
  en: {
    pageTitle: "About Me | Tech for All",
    siteTitle: "Tech for All",
    home: "Home",
    aboutbtn: "About",
    about: {
      heading: "Hussain Mahkareem",
      intro: `I am Hussain Mahkareem, a Software Engineering graduate from Rochester Institute of Technology (RIT), New York (2018). 
              I have over seven years of experience in IT and application support within the banking sector in Kuwait, 
              where I worked extensively with enterprise systems and user experience improvements. 
              Currently, I am pursuing a Master’s degree in Computer Information Systems at Kuwait University. 
              This project represents my graduation thesis and reflects my passion for supporting individuals with special needs 
              through technology and UX design.`,
      projectTitle: "About this Website",
      projectDesc: `This website, Tech for All, is designed as a centralized bilingual platform (Arabic–English) 
                    to gather and present assistive technologies available in Kuwait and across the GCC. 
                    It focuses on tools supporting students with learning disabilities such as Dyslexia, Dysgraphia, Dysphasia, 
                    and Auditory Processing Disorder. The platform helps educators, parents, and students discover and share tools, 
                    experiences, and feedback, making assistive technologies more accessible and effective in improving learning outcomes.`,
    },
  },
  ar: {
    pageTitle: "من أنا | التكنولوجيا للجميع",
    siteTitle: "التكنولوجيا للجميع",
    home: "الرئيسية",
    aboutbtn: "من أنا",
    about: {
      heading: "حسين ماه كريم",
      intro: `أنا حسين ماه كريم، خريج هندسة البرمجيات من معهد روتشستر للتكنولوجيا (RIT) – نيويورك عام 2018. 
              أعمل منذ أكثر من سبع سنوات في مجال تكنولوجيا المعلومات ودعم التطبيقات في القطاع المصرفي في الكويت، 
              حيث اكتسبت خبرة واسعة في الأنظمة المؤسسية وتحسين تجربة المستخدم. 
              حاليًا أتابع دراساتي العليا كطالب ماجستير في نظم المعلومات الحاسوبية بجامعة الكويت، 
              وهذا المشروع يمثل مشروع تخرجي ويعكس شغفي بدعم ذوي الاحتياجات الخاصة من خلال التكنولوجيا وتصميم تجربة المستخدم.`,
      projectTitle: "عن هذا الموقع",
      projectDesc: `تم إنشاء موقع "التكنولوجيا للجميع" كمنصة ثنائية اللغة (العربية – الإنجليزية) 
                    تجمع وتعرض جميع التقنيات المساعدة المتاحة في الكويت ودول مجلس التعاون الخليجي. 
                    يركز الموقع على الأدوات التي تدعم الطلاب من ذوي صعوبات التعلم مثل عسر القراءة، عسر الكتابة، اضطراب الكلام، 
                    واضطراب المعالجة السمعية. يهدف الموقع إلى مساعدة المعلمين وأولياء الأمور والطلاب في اكتشاف الأدوات المناسبة، 
                    وتبادل الخبرات والتجارب، مما يجعل التقنيات المساعدة أكثر سهولة وفعالية في تحسين العملية التعليمية.`,
    },
  },
};

let currentLang = localStorage.getItem("lang") || "ar";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const t = translations[lang];
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;

  // Update nav buttons
  document.getElementById("homeBtn").innerText = t.home;
  document.getElementById("aboutBtn").innerText = t.aboutbtn;

  const container = document.querySelector(".about-card");
  container.innerHTML = `
    <img src="images/me.jpg" alt="${t.about.heading}" class="about-photo">
    <h2>${t.about.heading}</h2>
    <p>${t.about.intro}</p>
    <h3>${t.about.projectTitle}</h3>
    <p>${t.about.projectDesc}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("languageSwitcher");
  langSwitcher.value = currentLang;
  langSwitcher.addEventListener("change", (e) => setLanguage(e.target.value));

  setLanguage(currentLang);
});