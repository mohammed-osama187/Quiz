/* =========================================================
   تحدي المعرفة - Quiz Challenge
   نظام لقواعد البيانات المحلية مع تحديث فوري مباشر عبر المستخدمين
   ========================================================= */

// 1. القواعد والبيانات الأساسية الافتراضية (90 سؤالاً متنوعاً)
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
    { q: "ما هي الدولة التي تمتلك أكبر عدد من المناطق الزمنية؟", opts: ["روسيا", "الولايات المتحدة", "فرنسا", "المملكة المتحدة"], ans: "فرنسا" },
    { q: "أي من المواد التالية تُعد أصلب مادة حيوية طبيعية في جسم الإنسان؟", opts: ["عظم الفخذ", "مينا الأسنان", "العاج", "صفيحة الجمجمة"], ans: "مينا الأسنان" },
    { q: "ما المادة المسؤولة عن إعطاء كوكب المريخ لونه الأحمر المميز؟", opts: ["كبريتيد الحديد", "أكسيد الحديد الثلاثي (الصدأ)", "نترات الصوديوم", "كربونات النحاس"], ans: "أكسيد الحديد الثلاثي (الصدأ)" },
    { q: "ما هي أطول معركة منفردة زمنياً وقعت خلال الحرب العالمية الأولى؟", opts: ["معركة السوم", "معركة غاليبولي", "معركة فيردان", "معركة المارن الأولى"], ans: "معركة فيردان" },
    { q: "في أي محيط تقع نقطة 'نيمو' (الأبعد عن أي يابسة على وجه الأرض)؟", opts: ["المحيط الهادئ", "المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الجنوبي"], ans: "المحيط الهادئ" },
    { q: "ما الحرف الإنجليزي الوحيد الذي لا يظهر إطلاقاً في الجدول الدوري؟", opts: ["Q", "J", "Z", "X"], ans: "J" },
    { q: "أي كائن حي لديه أطول فترة حمل بين جميع الثدييات البرية؟", opts: ["الفيل الآسيوي", "الفيل الأفريقي", "الكركدن", "الحوت الأزرق"], ans: "الفيل الأفريقي" },
    { q: "ما هو الاسم العلمي لظاهرة مواجهة القمر للأرض بنفس الوجه دائماً؟", opts: ["الانحراف المداري", "الرنين المغناطيسي", "القفل المدي (Tidal locking)", "التباطؤ النسبي"], ans: "القفل المدي (Tidal locking)" },
    { q: "من هو أول فيلسوف يوناني اقترح دوران الكواكب حول الشمس في القرن 3 ق.م؟", opts: ["أرسطو", "بطليموس", "أريستارخوس الساموسي", "إراتوستينس"], ans: "أريستارخوس الساموسي" },
    { q: "ما هو البحر الوحيد على الأرض الذي لا يمتلك أي سواحل شاطئية برية؟", opts: ["بحر سارجاسو", "بحر البوران", "بحر آرال", "بحر بيوفورت"], ans: "بحر سارجاسو" },
    { q: "ما هي عملة دولة بوتان الرسمية؟", opts: ["التوغروغ", "النغولتروم (Ngultrum)", "الكيات", "الريال"], ans: "النغولتروم (Ngultrum)" },
    { q: "ما هو نوع الشحنة الكهربائية للجسيم دون الذري 'النيوترينو'؟", opts: ["موجبة (+1)", "سالبة (-1)", "متعادلة (صفر)", "شحنة متغيرة"], ans: "متعادلة (صفر)" },
    { q: "كم دقيقة وثانية تقريباً يستغرق ضوء الشمس ليصل إلى الأرض؟", opts: ["8 دقائق و20 ثانية", "4 دقائق و10 ثوانٍ", "12 دقيقة و5 ثوانٍ", "لحظي"], ans: "8 دقائق و20 ثانية" },
    { q: "من العالم الذي صاغ أول جدول دوري ورتبه وفق الأوزان الذرية؟", opts: ["جون دالتون", "ديمتري مندلييف", "روبرت بويل", "هنري موزلي"], ans: "ديمتري مندلييف" },
    { q: "ما هي العاصمة الدستورية والقضائية الرسمية لدولة بوليفيا؟", opts: ["سانتا كروز", "كوتشابامبا", "سوكري", "بوتوسي"], ans: "سوكري" },
    { q: "ما هي الدولة الحبيسة المستقلة الوحيدة في العالم المحاطة كلياً بأراضي دولة جنوب أفريقيا فقط؟", opts: ["إسواتيني", "ليسوتو", "بوتسوانا", "ناميبيا"], ans: "ليسوتو" },
    { q: "ما هو المعدن النقي الوحيد في الطبيعة ذو اللون الأصفر غير الفضي بجانب عنصر النحاس؟", opts: ["الذهب", "البرونز", "البزموت", "التيتانيوم"], ans: "الذهب" },
    { q: "كم عدد أزواج الأرجل لدى كائن الحريشة (أم أربعة وأربعين) في الواقع العلمي؟", opts: ["44 زوجاً بالضبط", "عدد فردي من الأزواج دائماً", "22 زوجاً ثابتاً", "عدد زوجي من الأزواج دائماً"], ans: "عدد فردي من الأزواج دائماً" },
    { q: "ما هو الاسم التاريخي لمدينة طوكيو قبل أن تصبح عاصمة رسمية لليابان وتتغير تسميتها عام 1868؟", opts: ["كيوتو", "إيدو (Edo)", "أوساكا", "نارا"], ans: "إيدو (Edo)" },
    { q: "ما هو الغاز النبيل الذي اشتق اسمه من كلمة يونانية تعني 'الكسول' لخموله الكيميائي التام؟", opts: ["النيون", "الكريبتون", "الآرجون (Argon)", "الزينون"], ans: "الآرجون (Argon)" },
    { q: "أي دولة أو إمبراطورية تاريخية أسست فيالق المشاة النخبوية المعروفة بـ 'الإنكشارية'؟", opts: ["الدولة الأموية", "الدولة العباسية", "الدولة العثمانية", "الإمبراطورية الفارسية"], ans: "الدولة العثمانية" },
    { q: "ما هو المسطح المائي المصنف علمياً كأكبر بحيرة مغلقة (بحر داخلي) على سطح الأرض؟", opts: ["بحر قزوين", "بحيرة سوبيريور", "بحيرة بايكال", "بحيرة فيكتوريا"], ans: "بحر قزوين" },
    { q: "ما هو العضو البشري الداخلي الوحيد القادر على إعادة تجديد أنسجته وبنائها تلقائياً إذا فُقد ثلثا حجمه؟", opts: ["الطحال", "الكبد", "البنكرياس", "الرئة"], ans: "الكبد" },
    { q: "من هو الفيزيائي الحائز على نوبل وصاحب 'مبدأ عدم اليقين أو الشك' (Uncertainty Principle) في ميكانيكا الكم؟", opts: ["إرفين شرودنغر", "فيرنر هايزنبرغ", "نيلز بور", "ماكس بلانك"], ans: "فيرنر هايزنبرغ" },
    { q: "ما هي الدولة التي تمتلك أكبر عدد من الأهرامات الأثرية في العالم (تتجاوز 220 هرماً)؟", opts: ["مصر", "المكسيك", "السودان", "بيرو"], ans: "السودان" },
    { q: "ما هي العملة الرسمية المتداولة في دولة جنوب أفريقيا؟", opts: ["الشلن", "الراند (ZAR)", "البيزو", "الكواشا"], ans: "الراند (ZAR)" },
    { q: "أي كوكب في النظام الشمسي يدور حول نفسه من الشرق إلى الغرب في حركة تراجعية شاذة؟", opts: ["المريخ", "كوكب الزهرة", "المشتري", "نبتون"], ans: "كوكب الزهرة" },
    { q: "ما هي أدنى نقطة يابسة جافة غير مغمورة بمياه المحيطات على سطح الأرض؟", opts: ["شواطئ البحر الميت", "منخفض القطارة", "وادي الموت", "منخفض تورفان"], ans: "شواطئ البحر الميت" },
    { q: "ما هي المعركة البحرية الشهيرة التي حسمت سيادة بريطانيا البحرية وقُتل فيها القائد هوراشيو نيلسون عام 1805؟", opts: ["معركة واترلو", "معركة طرف الغار (Trafalgar)", "معركة يوتلاند", "معركة مِدواي"], ans: "معركة طرف الغار (Trafalgar)" },
    { q: "ما هو أثقل وأعلى الغازات النبيلة المستقرة طبيعياً من حيث الكثافة والوزن الذري؟", opts: ["الآرجون", "الزينون", "الرادون (Radon)", "الكريبتون"], ans: "الرادون (Radon)" }
  ]
};

const DEFAULT_LEADERBOARD = [
  { id: "1", name: "أحمد كمال", score: 24 },
  { id: "2", name: "سارة محمد", score: 20 },
  { id: "3", name: "محمود حسن", score: 17 },
  { id: "4", name: "نور الدين", score: 14 }
];

const POINTS = { easy: 1, medium: 3, hard: 5 };
const LABELS = { easy: "سهل", medium: "متوسط", hard: "صعب" };

/* =========================================================
   2. مدير قاعدة البيانات المحلية والتزامن المباشر عبر المستخدمين
   ========================================================= */
class DatabaseManager {
  constructor() {
    this.useServer = false;
    this.broadcastChannel = null;
    this.eventSource = null;
    this.listeners = [];

    // Local in-memory cache
    this.db = {
      leaderboard: this.getLocalLeaderboard(),
      questions: this.getLocalQuestions()
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
      if (e.key === 'quiz_leaderboard' || e.key === 'custom_questions_bank') {
        this.db.leaderboard = this.getLocalLeaderboard();
        this.db.questions = this.getLocalQuestions();
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

  getLocalLeaderboard() {
    const saved = localStorage.getItem("quiz_leaderboard");
    if (!saved) return DEFAULT_LEADERBOARD;
    try { return JSON.parse(saved); } catch (e) { return DEFAULT_LEADERBOARD; }
  }

  getLocalQuestions() {
    const saved = localStorage.getItem("custom_questions_bank");
    if (!saved) return DEFAULT_QUESTIONS;
    try { return JSON.parse(saved); } catch (e) { return DEFAULT_QUESTIONS; }
  }

  saveToLocalStorage(db) {
    localStorage.setItem("quiz_leaderboard", JSON.stringify(db.leaderboard));
    localStorage.setItem("custom_questions_bank", JSON.stringify(db.questions));
  }

  broadcastLocalChange() {
    this.saveToLocalStorage(this.db);
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'DB_UPDATE', db: this.db });
    }
    this.notifyListeners();
  }

  async saveScore(name, score) {
    if (this.useServer) {
      try {
        const res = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, score })
        });
        if (res.ok) {
          const result = await res.json();
          this.db = result.db;
          this.notifyListeners();
          return;
        }
      } catch (e) { console.error(e); }
    }

    const newEntry = {
      id: String(Date.now() + '_' + Math.floor(Math.random() * 1000)),
      name: name.trim(),
      score: Number(score)
    };
    this.db.leaderboard.push(newEntry);
    this.broadcastLocalChange();
  }

  async deletePlayer(id) {
    if (this.useServer) {
      try {
        const res = await fetch(`/api/score/${id}`, { method: 'DELETE' });
        if (res.ok) {
          const result = await res.json();
          this.db = result.db;
          this.notifyListeners();
          return;
        }
      } catch (e) { console.error(e); }
    }

    this.db.leaderboard = this.db.leaderboard.filter(item => String(item.id) !== String(id));
    this.broadcastLocalChange();
  }

  async clearAllLeaderboard() {
    if (this.useServer) {
      try {
        const res = await fetch('/api/leaderboard', { method: 'DELETE' });
        if (res.ok) {
          const result = await res.json();
          this.db = result.db;
          this.notifyListeners();
          return;
        }
      } catch (e) { console.error(e); }
    }

    this.db.leaderboard = [];
    this.broadcastLocalChange();
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
const dashboardWrapper = document.getElementById("dashboard-wrapper");

nameInput.addEventListener("input", () => {
  startBtn.disabled = nameInput.value.trim().length === 0;
});

dbManager.onUpdate(() => {
  renderLeaderboardUI();
  if (isAdminLoggedIn) {
    renderAdminLeaderboardUI();
  }
});

function renderLeaderboardUI() {
  const list = [...dbManager.db.leaderboard].sort((a, b) => b.score - a.score);
  const container = document.getElementById("leaderboard-list");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#64748b; padding:12px; font-size:0.85rem;">لا يوجد متسابقين حالياً</div>`;
    return;
  }

  list.slice(0, 7).forEach((item, idx) => {
    container.innerHTML += `
      <div class="leaderboard-item rank-${idx + 1}">
        <div style="display:flex; align-items:center;">
          <span class="rank-badge">${idx + 1}</span>
          <span style="font-weight:700;">${escapeHtml(item.name)}</span>
        </div>
        <div style="display:flex; align-items:center;">
          <span style="color:#38bdf8; font-weight:800; font-size:0.85rem;">${item.score} نقطة</span>
          <button class="del-btn" onclick="deletePlayer('${item.id}')">🗑️</button>
        </div>
      </div>
    `;
  });
}

function escapeHtml(text) {
  const d = document.createElement("div");
  d.innerText = text || "";
  return d.innerHTML;
}

window.deletePlayer = function (id) {
  dbManager.deletePlayer(id);
};

// 5. إعداد وتوليد الأسئلة
function pickRandom(arr, count) {
  if (!arr || arr.length === 0) return [];
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function prepareQuestions() {
  const bank = dbManager.db.questions || DEFAULT_QUESTIONS;
  const eBank = bank.easy || DEFAULT_QUESTIONS.easy;
  const mBank = bank.medium || DEFAULT_QUESTIONS.medium;
  const hBank = bank.hard || DEFAULT_QUESTIONS.hard;

  const e = pickRandom(eBank, Math.min(4, eBank.length)).map(q => ({ ...q, diff: "easy" }));
  const m = pickRandom(mBank, Math.min(3, mBank.length)).map(q => ({ ...q, diff: "medium" }));
  const h = pickRandom(hBank, Math.min(3, hBank.length)).map(q => ({ ...q, diff: "hard" }));

  return [...e, ...m, ...h].sort(() => 0.5 - Math.random());
}

// 6. تشغيل اللعبة
startBtn.addEventListener("click", () => {
  currentPlayer = nameInput.value.trim();
  document.getElementById("hud-player-name").textContent = currentPlayer;
  score = 0; correctCount = 0; wrongCount = 0; currentQIndex = 0; remainingTime = 60;
  document.getElementById("hud-score").textContent = "0";

  quizQuestions = prepareQuestions();
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
  dbManager.saveScore(currentPlayer, score);

  document.getElementById("final-score-val").textContent = score;
  document.getElementById("stat-correct").textContent = correctCount;
  document.getElementById("stat-wrong").textContent = wrongCount;
  document.getElementById("stat-time").textContent = `${60 - remainingTime}s`;

  if (typeof confetti === "function" && score >= 14) {
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
  renderLeaderboardUI();
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
    dashboardWrapper.classList.add("admin-active");
    document.getElementById("admin-status-indicator").innerHTML = `<span style="color:#34d399; font-weight:700;">🟢 مفعل</span>`;
    openAdminBtn.innerHTML = `<span>⚙️ الأدمن</span>`;
    showAdminPanel();
    renderLeaderboardUI();
  } else {
    adminErrorMsg.style.display = "block";
  }
});

adminLogoutBtn.addEventListener("click", () => {
  isAdminLoggedIn = false;
  dashboardWrapper.classList.remove("admin-active");
  document.getElementById("admin-status-indicator").textContent = "أعلى النقاط";
  openAdminBtn.innerHTML = `<span>🔒 الأدمن</span>`;
  renderLeaderboardUI();
  adminModal.classList.remove("open");
});

function showAdminLogin() {
  adminLoginView.style.display = "block";
  adminPanelView.style.display = "none";
}

function showAdminPanel() {
  adminLoginView.style.display = "none";
  adminPanelView.style.display = "block";
  renderAdminLeaderboardUI();
}

const tabQuestionsBtn = document.getElementById("tab-questions-btn");
const tabLeaderboardBtn = document.getElementById("tab-leaderboard-btn");
const tabAddQ = document.getElementById("tab-add-q");
const tabManageLead = document.getElementById("tab-manage-lead");

tabQuestionsBtn.addEventListener("click", () => {
  tabQuestionsBtn.classList.add("active");
  tabLeaderboardBtn.classList.remove("active");
  tabAddQ.style.display = "block";
  tabManageLead.style.display = "none";
});

tabLeaderboardBtn.addEventListener("click", () => {
  tabLeaderboardBtn.classList.add("active");
  tabQuestionsBtn.classList.remove("active");
  tabAddQ.style.display = "none";
  tabManageLead.style.display = "block";
  renderAdminLeaderboardUI();
});

function renderAdminLeaderboardUI() {
  const list = [...dbManager.db.leaderboard].sort((a, b) => b.score - a.score);
  const container = document.getElementById("admin-leaderboard-list");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#64748b; padding:12px; font-size:0.85rem;">لا يوجد متسابقين</div>`;
    return;
  }

  list.forEach((item, idx) => {
    container.innerHTML += `
      <div class="leaderboard-item">
        <div>
          <span style="color:#94a3b8; margin-left:4px;">#${idx + 1}</span>
          <span style="font-weight:700;">${escapeHtml(item.name)}</span>
          <span style="color:#38bdf8; margin-right:6px; font-weight:800;">(${item.score})</span>
        </div>
        <button class="del-btn" style="display:inline-flex;" onclick="deletePlayer('${item.id}')">🗑️</button>
      </div>
    `;
  });
}

document.getElementById("clear-all-lead-btn").addEventListener("click", () => {
  if (confirm("هل أنت متأكد من مسح جميع المتصدرين؟")) {
    dbManager.clearAllLeaderboard();
    showToast("تم مسح لوحة المتصدرين بالكامل!");
  }
});

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

window.addEventListener("DOMContentLoaded", () => {
  renderLeaderboardUI();
});
