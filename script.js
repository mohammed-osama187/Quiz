/* =========================================================
   تحدي المعرفة - Quiz Challenge
   نظام لقواعد البيانات المحلية مع تحديث فوري مباشر عبر المستخدمين
   ========================================================= */

// 1. القواعد والبيانات الأساسية الافتراضية
const DEFAULT_QUESTIONS = {
  easy: [
    { q: "ما هي عاصمة فرنسا؟", opts: ["روما", "مدريد", "باريس", "برلين"], ans: "باريس" },
    { q: "ما هو أسرع حيوان بري في العالم؟", opts: ["الفهد (الشيتا)", "الأسد", "الغزال", "النمر"], ans: "الفهد (الشيتا)" },
    { q: "كم عدد قارات العالم؟", opts: ["5", "6", "7", "8"], ans: "7" },
    { q: "ما هو الكوكب الأقرب إلى الشمس؟", opts: ["الزهرة", "عطارد", "المريخ", "الأرض"], ans: "عطارد" },
    { q: "ما هو الغاز الذي تتنفسه الكائنات الحية للبقاء على قيد الحياة؟", opts: ["النيتروجين", "الهيدروجين", "الأكسجين", "ثاني أكسيد الكربون"], ans: "الأكسجين" },
    { q: "أين تقع أهرامات الجيزة الشهيرة؟", opts: ["السودان", "مصر", "المكسيك", "الأردن"], ans: "مصر" },
    { q: "ما هو العضو المسؤول عن ضخ الدم في جسم الإنسان؟", opts: ["الرئتان", "الكبد", "القلب", "الكلى"], ans: "القلب" },
    { q: "ما هو أطول نهر في العالم؟", opts: ["نهر الأمازون", "نهر النيل", "نهر المسيسيبي", "نهر الدانوب"], ans: "نهر النيل" },
    { q: "كم يبلغ عدد ألوان قوس قزح؟", opts: ["5", "6", "7", "8"], ans: "7" },
    { q: "ما هو أكبر محيط في العالم من حيث المساحة؟", opts: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد الشمالي"], ans: "المحيط الهادئ" },
    { q: "ما هو الحيوان الذي يُلقب بسفينة الصحراء؟", opts: ["الحصان", "الجمل", "الفيل", "الضبع"], ans: "الجمل" },
    { q: "ما هي العملة الرسمية للولايات المتحدة الأمريكية؟", opts: ["اليورو", "الجنيه الإسترليني", "الدولار الأمريكي", "الين"], ans: "الدولار الأمريكي" },
    { q: "في أي قارة تقع دولة البرازيل؟", opts: ["أفريقيا", "أمريكا الشمالية", "أمريكا الجنوبية", "آسيا"], ans: "أمريكا الجنوبية" },
    { q: "ما هو الرمز الكيميائي للماء؟", opts: ["CO2", "H2O", "O2", "NaCl"], ans: "H2O" },
    { q: "ما هي أكبر قارة في العالم من حيث المساحة؟", opts: ["أفريقيا", "آسيا", "أوروبا", "أمريكا الشمالية"], ans: "آسيا" },
    { q: "ما هو الحيوان الأليف المعروف تاريخياً بوفائه للإنسان؟", opts: ["القط", "الكلب", "الأرنب", "السلحفاة"], ans: "الكلب" },
    { q: "كم يبلغ عدد أيام السنة الميلادية البسيطة (غير الكبيسة)؟", opts: ["360 يوماً", "364 يوماً", "365 يوماً", "366 يوماً"], ans: "365 يوماً" },
    { q: "ما هي وسيلة النقل الجماعية التي تسير على القضبان الحديدية؟", opts: ["الحافلة", "القطار", "السفينة", "الطائرة"], ans: "القطار" },
    { q: "أي كوكب في المجموعة الشمسية يشتهر بوجود حلقات ضخمة وبارزة تدور حوله؟", opts: ["المريخ", "زحل", "المشتري", "عطارد"], ans: "زحل" },
    { q: "ما هي التقنية المستخدمة بشكل أساسي لتنسيق مظهر وتصميم صفحات الويب؟", opts: ["HTML", "CSS", "Python", "C++"], ans: "CSS" },
    { q: "ما هو أكبر طائر في العالم لا يستطيع الطيران؟", opts: ["البطريق", "النعامة", "الطاووس", "الكيوي"], ans: "النعامة" },
    { q: "كم يبلغ عدد أسنان الإنسان البالغ الطبيعية الكاملة (بما فيها ضروس العقل)؟", opts: ["28 سناً", "30 سناً", "32 سناً", "36 سناً"], ans: "32 سناً" },
    { q: "ما هي العملة الرسمية لدولة اليابان؟", opts: ["اليوان", "الين", "الوون", "الدولار"], ans: "الين" },
    { q: "في أي قارة تقع دولة إيطاليا؟", opts: ["آسيا", "أوروبا", "أفريقيا", "أمريكا الجنوبية"], ans: "أوروبا" },
    { q: "ما هي الفاكهة التي ارتبطت تاريخياً بقصة اكتشاف إسحاق نيوتن لقانون الجاذبية؟", opts: ["البرتقال", "الموز", "التفاح", "العنب"], ans: "التفاح" },
    { q: "كم يبلغ عدد أضلاع الشكل الهندسي المثلث؟", opts: ["3 أضلاع", "4 أضلاع", "5 أضلاع", "6 أضلاع"], ans: "3 أضلاع" },
    { q: "ما هو المعدن الأساسي المستخدم في تصنيع هياكل التسليح والإنشاءات الكبرى؟", opts: ["النحاس", "الألمنيوم", "الحديد", "الرصاص"], ans: "الحديد" },
    { q: "أي من الحواس الخمس ترتبط بعضو العين مباشرة؟", opts: ["السمع", "البصر", "الشم", "اللمس"], ans: "البصر" },
    { q: "ما هو أضخم كائن حي يعيش على كوكب الأرض حالياً؟", opts: ["الفيل الأفريقي", "الحوت الأزرق", "القرش الأبيض", "الزرافة"], ans: "الحوت الأزرق" },
    { q: "ما هي عاصمة جمهورية مصر العربية؟", opts: ["الإسكندرية", "الجيزة", "القاهرة", "أسوان"], ans: "القاهرة" }
  ],
  medium: [
    { q: "ما هي عاصمة أستراليا الرسمية؟", opts: ["سيدني", "ملبورن", "كانبرا", "بريزبان"], ans: "كانبرا" },
    { q: "من هو مخترع المصباح الكهربائي العملي؟", opts: ["نيكولا تسلا", "توماس إديسون", "ألكسندر غراهام بيل", "بنجامين فرانكلين"], ans: "توماس إديسون" },
    { q: "كم عدد فقرات عنق الزرافة؟", opts: ["7 فقرات", "12 فقرة", "14 فقرة", "20 فقرة"], ans: "7 فقرات" },
    { q: "ما هو العنصر الأكثر وفرة في الغلاف الجوي للأرض؟", opts: ["الأكسجين", "الهيدروجين", "النيتروجين", "ثاني أكسيد الكربون"], ans: "النيتروجين" },
    { q: "في أي عام اندلعت الحرب العالمية الأولى؟", opts: ["1912", "1914", "1918", "1939"], ans: "1914" },
    { q: "ما هو أكبر عضو داخلي في جسم الإنسان؟", opts: ["الرئة", "الكبد", "الدماغ", "المعدة"], ans: "الكبد" },
    { q: "ما هي الدولة التي تمتلك أكبر عدد من الجزر في العالم؟", opts: ["إندونيسيا", "الفلبين", "اليونان", "السويد"], ans: "السويد" },
    { q: "من هو مؤلف ملحمة البؤساء؟", opts: ["فيكتور هوغو", "شارل ديكنز", "دوستويفسكي", "إرنست همنغواي"], ans: "فيكتور هوغو" },
    { q: "ما هو المعدن السائل الوحيد في درجة حرارة الغرفة؟", opts: ["الزئبق", "الجاليوم", "البروم", "السيزيوم"], ans: "الزئبق" },
    { q: "كم عدد عظام الهيكل العظمي للإنسان البالغ؟", opts: ["180", "206", "214", "300"], ans: "206" },
    { q: "ما هي الدولة العربية الوحيدة التي تطل على المتوسط والأطلسي معاً؟", opts: ["الجزائر", "تونس", "مصر", "المغرب"], ans: "المغرب" },
    { q: "ما هو الكوكب المعروف بلقب 'الكوكب الأحمر'؟", opts: ["المشتري", "المريخ", "زحل", "نبتون"], ans: "المريخ" },
    { q: "أين توجد أصغر عظمة في جسم الإنسان؟", opts: ["الأنف", "أصابع القدم", "الأذن الوسطى (الركاب)", "الحنجرة"], ans: "الأذن الوسطى (الركاب)" },
    { q: "ما هي عاصمة كندا؟", opts: ["تورونتو", "مونتريال", "أوتاوا", "فانكوفر"], ans: "أوتاوا" },
    { q: "ما هو الغاز الشائع استخدامه في ملء بالونات الاحتفالات؟", opts: ["الهيدروجين", "الهيليوم", "الميثان", "الآرجون"], ans: "الهيليوم" },
    { q: "من هو المخترع الذي سُجلت باسمه أول براءة اختراع عملية لجهاز الهاتف؟", opts: ["توماس إديسون", "ألكسندر غراهام بيل", "نيكولا تسلا", "مايكل فاراداي"], ans: "ألكسندر غراهام بيل" },
    { q: "ما هي العاصمة الرسمية والسياسية لدولة البرازيل؟", opts: ["ريو دي جانيرو", "ساو باولو", "برازيليا", "سلفادور"], ans: "برازيليا" },
    { q: "كم يبلغ عدد صمامات القلب لدى الإنسان السليم؟", opts: ["صمامان", "3 صمامات", "4 صمامات", "5 صمامات"], ans: "4 صمامات" },
    { q: "ما هو أسرع كائن حي على وجه الأرض عند الانقضاض الجوي؟", opts: ["العقاب الذهبي", "صقر الشاهين", "طائر السمامة", "الفهد الصياد"], ans: "صقر الشاهين" },
    { q: "ما هي أكبر دولة عربية من حيث المساحة الجغرافية الإجمالية؟", opts: ["المملكة العربية السعودية", "جمهورية مصر العربية", "الجزائر", "السودان"], ans: "الجزائر" },
    { q: "ما هي الصبغة النباتية المسؤولة عن إعطاء الأوراق لونها الأخضر وتسهيل البناء الضوئي؟", opts: ["الميلانين", "الكلوروفيل (اليخضور)", "الكاروتين", "الهيموجلوبين"], ans: "الكلوروفيل (اليخضور)" },
    { q: "في أي محيط تقع منطقة 'مثلث برمودا' الشهيرة؟", opts: ["المحيط الهادئ", "المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي"], ans: "المحيط الأطلسي" },
    { q: "ما هو الغاز ذو الحجم الأكبر والمسبب الأساسي لظاهرة الانحباس الحراري عالمياً؟", opts: ["الميثان", "ثاني أكسيد الكربون", "الأكسجين", "الأوزون"], ans: "ثاني أكسيد الكربون" },
    { q: "من هو الأديب اللاتيني الحائز على نوبل وصاحب رواية 'مئة عام من العزلة'؟", opts: ["غابرييل غارسيا ماركيز", "باولو كويلو", "ماريو فارغاس يوسا", "إيزابيل الليندي"], ans: "غابرييل غارسيا ماركيز" },
    { q: "ما هي أعلى قمة جبلية ترتفع فوق مستوى سطح البحر على كوكب الأرض؟", opts: ["جبل كي 2 (K2)", "جبل إيفرست", "جبل كليمنجارو", "جبل أكونكاجوا"], ans: "جبل إيفرست" },
    { q: "ما هو الرمز الكيميائي لعنصر الصوديوم في الجدول الدوري؟", opts: ["So", "Sd", "Na", "Sm"], ans: "Na" },
    { q: "كم عدد لاعبي الفريق الواحد داخل أرض الملعب في مباراة كرة السلة الرسمية؟", opts: ["5 لاعبين", "6 لاعبين", "7 لاعبين", "11 لاعباً"], ans: "5 لاعبين" },
    { q: "ما هي الدولة التي تمتلك أطول شريط ساحلي في العالم؟", opts: ["روسيا", "أستراليا", "كندا", "إندونيسيا"], ans: "كندا" },
    { q: "ما هو الهرمون المسؤول عن خفض وتنظيم سكر الجلوكوز في الدم ويفرزه البنكرياس؟", opts: ["الأدرينالين", "الثيروكسين", "الإنسولين", "الكورتيزول"], ans: "الإنسولين" },
    { q: "في أي مدينة أوروبية أُقيمت أول دورة ألعاب أولمبية في العصر الحديث عام 1896؟", opts: ["باريس", "أثينا", "لندن", "روما"], ans: "أثينا" }
  ],
  hard: [
    { q: "كم عدد اللجان الرئيسية المكونة لاتحاد الطلاب؟", opts: ["5 لجان", "7 لجان", "9 لجان", "11 لجنة"], ans: "7 لجان" },
    { q: "أي لجنة بالاتحاد هي المسؤولة عن تنظيم المسابقات العلمية والمعارض التكنولوجية؟", opts: ["اللجنة الثقافية", "لجنة الجوالة", "اللجنة العلمية", "لجنة الأسر"], ans: "اللجنة العلمية" },
    { q: "ما هو أعلى منصب قيادي من الطلاب داخل اتحاد طلاب الكلية؟", opts: ["أمين اللجنة العلمية", "رئيس الاتحاد", "رائد الاتحاد", "أمين الصندوق"], ans: "رئيس الاتحاد" },
    { q: "في أي عام تأسست كلية الهندسة الإلكترونية بمنوف؟", opts: ["1965", "1970", "1975", "1980"], ans: "1975" },
    { q: "كم عدد المكتبات بالكلية؟", opts: ["مكتبتان", "مكتبة واحدة", "3 مكتبات", "4 مكتبات"], ans: "مكتبتان" }
  ]
};

const POINTS = { easy: 1, medium: 3, hard: 5 };
const LABELS = { easy: "سهل", medium: "متوسط", hard: "صعب" };
const DEFAULT_SETTINGS = { timeLimit: 60, easyCount: 5, mediumCount: 5, hardCount: 5 };

/* =========================================================
   2. مدير قاعدة البيانات المحلية والتزامن المباشر عبر المستخدمين
   ========================================================= */
class DatabaseManager {
  constructor() {
    this.useServer = false;
    this.broadcastChannel = null;
    this.eventSource = null;
    this.listeners = [];

    this.db = {
      questions: this.getLocalQuestions(),
      settings: this.getLocalSettings()
    };

    this.initBroadcastChannel();
    this.initServerSync();
  }

  initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('quiz_db_channel');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'DB_UPDATE') {
          this.db = event.data.db;
          this.saveToLocalStorage(this.db);
          this.notifyListeners();
        }
      };
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'custom_questions_bank') {
        this.db.questions = this.getLocalQuestions();
        this.notifyListeners();
      }
      if (e.key === 'quiz_settings') {
        this.db.settings = this.getLocalSettings();
        this.notifyListeners();
      }
    });
  }

  async initServerSync() {
    try {
      const res = await fetch('/api/db', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        this.useServer = true;
        this.db = data;
        this.updateStatusBadge(true);
        this.notifyListeners();

        this.eventSource = new EventSource('/api/stream');
        this.eventSource.onmessage = (event) => {
          try {
            const updatedDb = JSON.parse(event.data);
            this.db = updatedDb;
            this.notifyListeners();
          } catch (e) {
            console.error("SSE parse error:", e);
          }
        };
        return;
      }
    } catch (e) {
      // Server not running, fallback to client-side localStorage + BroadcastChannel
    }

    this.useServer = false;
    this.updateStatusBadge(false);
  }

  updateStatusBadge(isOnline) {
    const badge = document.getElementById('db-status-badge');
    if (badge) {
      if (isOnline) {
        badge.className = "db-status-badge online";
        badge.innerHTML = "🟢 قاعدة JSON مباشرة (Server Sync)";
      } else {
        badge.className = "db-status-badge offline";
        badge.innerHTML = "💾 قاعدة JSON محلية (Cross-Tab Sync)";
      }
    }
  }

  onUpdate(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.db));
  }

  getLocalQuestions() {
    const saved = localStorage.getItem("custom_questions_bank");
    if (!saved) return DEFAULT_QUESTIONS;
    try { return JSON.parse(saved); } catch (e) { return DEFAULT_QUESTIONS; }
  }

  getLocalSettings() {
    const saved = localStorage.getItem("quiz_settings");
    if (!saved) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      return {
        timeLimit: Math.max(10, Number(parsed.timeLimit) || 60),
        easyCount: Math.max(0, Number(parsed.easyCount) ?? 5),
        mediumCount: Math.max(0, Number(parsed.mediumCount) ?? 5),
        hardCount: Math.max(0, Number(parsed.hardCount) ?? 5)
      };
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }

  saveToLocalStorage(db) {
    if (db.questions) localStorage.setItem("custom_questions_bank", JSON.stringify(db.questions));
    if (db.settings) localStorage.setItem("quiz_settings", JSON.stringify(db.settings));
  }

  broadcastLocalChange() {
    this.saveToLocalStorage(this.db);
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'DB_UPDATE', db: this.db });
    }
    this.notifyListeners();
  }

  async addQuestion(diff, qText, opts, correctAns) {
    if (this.useServer) {
      try {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diff, q: qText, opts, ans: correctAns })
        });
        if (res.ok) {
          const result = await res.json();
          this.db = result.db;
          this.notifyListeners();
          return;
        }
      } catch (e) { console.error(e); }
    }

    if (!this.db.questions[diff]) this.db.questions[diff] = [];
    this.db.questions[diff].push({ q: qText, opts: opts, ans: correctAns });
    this.broadcastLocalChange();
  }

  async updateSettings(newSettings) {
    if (this.useServer) {
      try {
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings)
        });
        if (res.ok) {
          const result = await res.json();
          this.db = result.db;
          this.notifyListeners();
          return;
        }
      } catch (e) { console.error(e); }
    }

    this.db.settings = { ...this.db.settings, ...newSettings };
    this.broadcastLocalChange();
  }
}

// 3. تهيئة التطبيق
const dbManager = new DatabaseManager();

let currentPlayer = "";
let quizQuestions = [];
let currentQIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let remainingTime = 60;
let timerInterval = null;
let isBlocked = false;
let isAdminLoggedIn = false;

// 4. عناصر DOM
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const nameInput = document.getElementById("player-name-input");
const startBtn = document.getElementById("start-btn");

nameInput.addEventListener("input", () => {
  startBtn.disabled = nameInput.value.trim().length === 0;
});

// 5. إعداد وتوليد الأسئلة حسب التوزيع المحدد في الإعدادات
function pickRandom(arr, count) {
  if (!arr || arr.length === 0) return [];
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function prepareQuestions() {
  const bank = dbManager.db.questions || DEFAULT_QUESTIONS;
  const settings = dbManager.db.settings || DEFAULT_SETTINGS;

  const eCount = Number(settings.easyCount) ?? 5;
  const mCount = Number(settings.mediumCount) ?? 5;
  const hCount = Number(settings.hardCount) ?? 5;

  const eBank = bank.easy || DEFAULT_QUESTIONS.easy;
  const mBank = bank.medium || DEFAULT_QUESTIONS.medium;
  const hBank = bank.hard || DEFAULT_QUESTIONS.hard;

  const e = pickRandom(eBank, Math.min(eCount, eBank.length)).map(q => ({ ...q, diff: "easy" }));
  const m = pickRandom(mBank, Math.min(mCount, mBank.length)).map(q => ({ ...q, diff: "medium" }));
  const h = pickRandom(hBank, Math.min(hCount, hBank.length)).map(q => ({ ...q, diff: "hard" }));

  return [...e, ...m, ...h].sort(() => 0.5 - Math.random());
}

// تحديث واجهة المستخدم فور تغيير الإعدادات
function applySettingsToUI() {
  const settings = dbManager.db.settings || DEFAULT_SETTINGS;
  const easyCount = Number(settings.easyCount) ?? 5;
  const mediumCount = Number(settings.mediumCount) ?? 5;
  const hardCount = Number(settings.hardCount) ?? 5;
  const totalQuestions = easyCount + mediumCount + hardCount;
  const timeLimit = Number(settings.timeLimit) || 60;
  const maxScore = (easyCount * POINTS.easy) + (mediumCount * POINTS.medium) + (hardCount * POINTS.hard);

  const totalQSpan = document.getElementById("start-total-q");
  const timeLimitSpan = document.getElementById("start-time-limit");
  if (totalQSpan) totalQSpan.textContent = totalQuestions;
  if (timeLimitSpan) timeLimitSpan.textContent = timeLimit;

  const timerDisplay = document.getElementById("timer-display");
  const totalQNum = document.getElementById("total-q-num");
  const maxPossibleScore = document.getElementById("max-possible-score");
  if (timerDisplay && !quizScreen.classList.contains("active")) timerDisplay.textContent = timeLimit;
  if (totalQNum) totalQNum.textContent = totalQuestions;
  if (maxPossibleScore) maxPossibleScore.textContent = maxScore;

  const setTimeLimitInput = document.getElementById("set-time-limit");
  const setEasyCountInput = document.getElementById("set-easy-count");
  const setMediumCountInput = document.getElementById("set-medium-count");
  const setHardCountInput = document.getElementById("set-hard-count");
  if (setTimeLimitInput && document.activeElement !== setTimeLimitInput) setTimeLimitInput.value = timeLimit;
  if (setEasyCountInput && document.activeElement !== setEasyCountInput) setEasyCountInput.value = easyCount;
  if (setMediumCountInput && document.activeElement !== setMediumCountInput) setMediumCountInput.value = mediumCount;
  if (setHardCountInput && document.activeElement !== setHardCountInput) setHardCountInput.value = hardCount;

  updateAdminSettingsSummary();
}

function updateAdminSettingsSummary() {
  const timeLimitVal = parseInt(document.getElementById("set-time-limit")?.value) || 0;
  const easyVal = parseInt(document.getElementById("set-easy-count")?.value) || 0;
  const mediumVal = parseInt(document.getElementById("set-medium-count")?.value) || 0;
  const hardVal = parseInt(document.getElementById("set-hard-count")?.value) || 0;

  const total = easyVal + mediumVal + hardVal;
  const maxScore = (easyVal * POINTS.easy) + (mediumVal * POINTS.medium) + (hardVal * POINTS.hard);

  const summaryBox = document.getElementById("settings-summary");
  if (summaryBox) {
    summaryBox.innerHTML = `
      <span>إجمالي الأسئلة: <strong>${total} سؤال</strong></span>
      <span>أقصى نقاط: <strong>${maxScore} نقطة</strong></span>
    `;
  }
}

dbManager.onUpdate(() => {
  applySettingsToUI();
});
applySettingsToUI();

// 6. تشغيل اللعبة
startBtn.addEventListener("click", () => {
  const settings = dbManager.db.settings || DEFAULT_SETTINGS;
  currentPlayer = nameInput.value.trim();
  document.getElementById("hud-player-name").textContent = currentPlayer;
  score = 0; correctCount = 0; wrongCount = 0; currentQIndex = 0;
  remainingTime = Number(settings.timeLimit) || 60;

  document.getElementById("hud-score").textContent = "0";

  quizQuestions = prepareQuestions();

  if (quizQuestions.length === 0) {
    alert("لا توجد أسئلة متوفرة حالياً حسب التوزيع المحدد!");
    return;
  }

  document.getElementById("total-q-num").textContent = quizQuestions.length;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  renderQuestion();

  clearInterval(timerInterval);
  document.getElementById("timer-display").textContent = remainingTime;
  document.getElementById("timer-box").classList.remove("pulse-danger");

  timerInterval = setInterval(() => {
    remainingTime--;
    document.getElementById("timer-display").textContent = remainingTime;
    if (remainingTime <= 10) document.getElementById("timer-box").classList.add("pulse-danger");
    if (remainingTime <= 0) finishGame();
  }, 1000);
});

function renderQuestion() {
  isBlocked = false;
  const q = quizQuestions[currentQIndex];
  const pts = POINTS[q.diff];

  document.getElementById("current-q-num").textContent = currentQIndex + 1;
  document.getElementById("progress-bar").style.width = `${((currentQIndex + 1) / Math.max(1, quizQuestions.length)) * 100}%`;

  const badge = document.getElementById("q-diff-badge");
  badge.className = `diff-badge diff-${q.diff}`;
  badge.textContent = LABELS[q.diff];
  document.getElementById("q-points-badge").textContent = `+${pts} ${pts === 1 ? 'نقطة' : 'نقاط'}`;
  document.getElementById("question-text").textContent = q.q;

  const optsContainer = document.getElementById("options-container");
  optsContainer.innerHTML = "";
  const shuffledOpts = [...q.opts].sort(() => 0.5 - Math.random());
  const letters = ["أ", "ب", "ج", "د"];

  shuffledOpts.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span style="opacity:0.6; min-width:20px;">${letters[idx]} -</span> <span>${opt}</span>`;
    btn.onclick = () => selectOption(opt, q.ans, q.diff, btn);
    optsContainer.appendChild(btn);
  });
}

function selectOption(selected, correct, diff, btnElement) {
  if (isBlocked) return;
  isBlocked = true;

  const isCorrect = selected === correct;
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.querySelector("span:last-child").textContent === correct) b.classList.add("correct");
  });

  if (isCorrect) {
    score += POINTS[diff];
    correctCount++;
    document.getElementById("hud-score").textContent = score;
  } else {
    btnElement.classList.add("incorrect");
    wrongCount++;
  }

  setTimeout(() => {
    currentQIndex++;
    if (currentQIndex < quizQuestions.length && remainingTime > 0) {
      renderQuestion();
    } else {
      finishGame();
    }
  }, 750);
}

function finishGame() {
  clearInterval(timerInterval);
  const settings = dbManager.db.settings || DEFAULT_SETTINGS;
  const timeLimit = Number(settings.timeLimit) || 60;
  const timeSpent = Math.max(0, timeLimit - remainingTime);

  const easyCount = Number(settings.easyCount) ?? 5;
  const mediumCount = Number(settings.mediumCount) ?? 5;
  const hardCount = Number(settings.hardCount) ?? 5;
  const maxScore = (easyCount * POINTS.easy) + (mediumCount * POINTS.medium) + (hardCount * POINTS.hard);

  document.getElementById("final-score-val").textContent = score;
  document.getElementById("max-possible-score").textContent = maxScore;
  document.getElementById("stat-correct").textContent = correctCount;
  document.getElementById("stat-wrong").textContent = wrongCount;
  document.getElementById("stat-time").textContent = `${timeSpent}s`;

  if (typeof confetti === "function" && score >= Math.round(maxScore * 0.4)) {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  }

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
}

document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  nameInput.value = "";
  startBtn.disabled = true;
});

// 7. نظام التحكم بالأدمن (Admin Panel)
const adminModal = document.getElementById("admin-modal");
const openAdminBtn = document.getElementById("open-admin-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminPassInput = document.getElementById("admin-pass-input");
const adminErrorMsg = document.getElementById("admin-error-msg");
const adminLoginView = document.getElementById("admin-login-view");
const adminPanelView = document.getElementById("admin-panel-view");
const adminLogoutBtn = document.getElementById("admin-logout-btn");
const toastAdmin = document.getElementById("toast-admin");

// Admin Tabs Elements
const tabBtnSettings = document.getElementById("tab-btn-settings");
const tabBtnAddQ = document.getElementById("tab-btn-add-q");
const tabSettingsView = document.getElementById("tab-settings-view");
const tabAddQView = document.getElementById("tab-add-q-view");

if (tabBtnSettings && tabBtnAddQ) {
  tabBtnSettings.addEventListener("click", () => {
    tabBtnSettings.classList.add("active");
    tabBtnAddQ.classList.remove("active");
    tabSettingsView.style.display = "block";
    tabAddQView.style.display = "none";
  });

  tabBtnAddQ.addEventListener("click", () => {
    tabBtnAddQ.classList.add("active");
    tabBtnSettings.classList.remove("active");
    tabSettingsView.style.display = "none";
    tabAddQView.style.display = "block";
  });
}

// Re-calculate summary on setting input change
["set-time-limit", "set-easy-count", "set-medium-count", "set-hard-count"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", updateAdminSettingsSummary);
});

// Save Admin Settings
document.getElementById("save-settings-btn").addEventListener("click", () => {
  const timeLimit = parseInt(document.getElementById("set-time-limit").value);
  const easyCount = parseInt(document.getElementById("set-easy-count").value);
  const mediumCount = parseInt(document.getElementById("set-medium-count").value);
  const hardCount = parseInt(document.getElementById("set-hard-count").value);

  if (isNaN(timeLimit) || timeLimit < 10) {
    alert("يرجى إدخال وقت صحيح للجولة (10 ثوانٍ على الأقل)!");
    return;
  }

  if (isNaN(easyCount) || easyCount < 0 || isNaN(mediumCount) || mediumCount < 0 || isNaN(hardCount) || hardCount < 0) {
    alert("يرجى إدخال أعداد صحيحة للأسئلة!");
    return;
  }

  if (easyCount + mediumCount + hardCount === 0) {
    alert("يجب اختيار سؤال واحد على الأقل للمسابقة!");
    return;
  }

  dbManager.updateSettings({ timeLimit, easyCount, mediumCount, hardCount });
  showToast("تم حفظ إعدادات المسابقة بنجاح! ⚙️✨");
});

openAdminBtn.addEventListener("click", () => {
  adminModal.classList.add("open");
  if (isAdminLoggedIn) {
    showAdminPanel();
  } else {
    showAdminLogin();
  }
});

closeModalBtn.addEventListener("click", () => {
  adminModal.classList.remove("open");
});

adminLoginBtn.addEventListener("click", () => {
  const pin = adminPassInput.value.trim();
  if (pin === "1234") {
    isAdminLoggedIn = true;
    adminErrorMsg.style.display = "none";
    adminPassInput.value = "";
    openAdminBtn.innerHTML = `<span>⚙️ الأدمن</span>`;
    showAdminPanel();
  } else {
    adminErrorMsg.style.display = "block";
  }
});

adminLogoutBtn.addEventListener("click", () => {
  isAdminLoggedIn = false;
  openAdminBtn.innerHTML = `<span>🔒 الأدمن</span>`;
  adminModal.classList.remove("open");
});

function showAdminLogin() {
  adminLoginView.style.display = "block";
  adminPanelView.style.display = "none";
}

function showAdminPanel() {
  adminLoginView.style.display = "none";
  adminPanelView.style.display = "block";
  applySettingsToUI();
}

document.getElementById("save-new-q-btn").addEventListener("click", () => {
  const diff = document.getElementById("new-q-diff").value;
  const qText = document.getElementById("new-q-text").value.trim();
  const o1 = document.getElementById("new-opt-1").value.trim();
  const o2 = document.getElementById("new-opt-2").value.trim();
  const o3 = document.getElementById("new-opt-3").value.trim();
  const o4 = document.getElementById("new-opt-4").value.trim();
  const correctIdx = document.getElementById("new-q-correct").value;

  if (!qText || !o1 || !o2 || !o3 || !o4) {
    alert("يرجى ملء جميع الحقول والخيارات الأربعة!");
    return;
  }

  const opts = [o1, o2, o3, o4];
  const correctAns = opts[parseInt(correctIdx) - 1];

  dbManager.addQuestion(diff, qText, opts, correctAns);

  document.getElementById("new-q-text").value = "";
  document.getElementById("new-opt-1").value = "";
  document.getElementById("new-opt-2").value = "";
  document.getElementById("new-opt-3").value = "";
  document.getElementById("new-opt-4").value = "";

  showToast(`تمت إضافة السؤال بنجاح إلى قسم (${LABELS[diff]})! 🎉`);
});

function showToast(msg) {
  toastAdmin.textContent = msg;
  toastAdmin.style.display = "block";
  setTimeout(() => { toastAdmin.style.display = "none"; }, 3000);
}
