const translations = {
  en: {
    pageTitle: "About | Assistive Technologies GCC",
    siteTitle: "Assistive Technologies in GCC",
    about: {
      heading: "Hussain Mahkareem",
      intro: `I am a Software Engineering graduate from Rochester Institute of Technology (RIT) 
              with extensive experience in IT and application support within the banking sector.  
              I am passionate about AI research and dedicated to bringing advanced technology 
              solutions to Kuwait and the wider GCC region.`,
      projectTitle: "About this Website",
      projectDesc: `This project is part of my master’s work and aims to gather all available 
                    assistive technologies in the GCC region that support individuals with learning 
                    difficulties such as Dyslexia, Dysgraphia, Dysphasia, and Auditory Processing Disorder. 
                    The goal is to make these tools more accessible to schools, educators, and families, 
                    and help students achieve their full potential.`
    }
  },
  ar: {
    pageTitle: "حول | التقنيات المساعدة في الخليج",
    siteTitle: "التقنيات المساعدة في الخليج",
    about: {
      heading: "حسين ماه كريم",
      intro: `أنا خريج هندسة البرمجيات من معهد روتشستر للتكنولوجيا (RIT) 
              ولدي خبرة واسعة في مجال تكنولوجيا المعلومات ودعم التطبيقات في القطاع المصرفي.  
              شغفي هو البحث في مجال الذكاء الاصطناعي والعمل على جلب الحلول التقنية المتقدمة 
              إلى الكويت ومنطقة الخليج.`,
      projectTitle: "عن هذا الموقع",
      projectDesc: `هذا المشروع جزء من عملي في الماجستير ويهدف إلى جمع جميع التقنيات 
                    المساعدة المتاحة في منطقة الخليج لدعم الأفراد الذين يعانون من صعوبات التعلم 
                    مثل عسر القراءة، عسر الكتابة، اضطراب الكلام، واضطراب المعالجة السمعية.  
                    الهدف هو جعل هذه الأدوات أكثر سهولة للوصول للمدارس والمعلمين والأسر، 
                    ومساعدة الطلاب على تحقيق كامل إمكاناتهم.`
    }
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  const t = translations[lang];
  document.title = t.pageTitle;
  document.getElementById("site-title").innerText = t.siteTitle;

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
  langSwitcher.addEventListener("change", e => setLanguage(e.target.value));

  setLanguage(currentLang);
});
