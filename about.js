const aboutTexts = {
  en: {
    title: "About This Project",
    text: "This website collects assistive technology tools available in GCC countries, helping individuals with learning disabilities such as Dyslexia, Dysgraphia, Dysphasia, and Auditory Processing Disorder. Users can browse tools, see details, and leave feedback."
  },
  ar: {
    title: "حول هذا المشروع",
    text: "يجمع هذا الموقع أدوات التكنولوجيا المساعدة المتاحة في دول الخليج، لمساعدة الأشخاص الذين يعانون من صعوبات التعلم مثل عسر القراءة، عسر الكتابة، اضطراب الكلام، واضطراب المعالجة السمعية. يمكن للمستخدمين تصفح الأدوات، مشاهدة التفاصيل، وترك التعليقات."
  }
};

function changeLang(lang){
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";
  document.getElementById("about-title").innerText = aboutTexts[lang].title;
  document.getElementById("about-text").innerText = aboutTexts[lang].text;
  document.getElementById("langSelect").value = lang;
}
