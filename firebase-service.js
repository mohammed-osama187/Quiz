/* =========================================================
   تحدي المعرفة - خدمة Firebase (Modular SDK v10 CDN)
   الخطوة 4: ربط Firebase بالموقع للوحة المتصدرين والتحديث الحي
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// 1. ضع إعدادات Firebase الخاصة بمشروعك هنا (من Firebase Console):
export const firebaseConfig = {
  apiKey: "AIzaSyAta_KP_rcdeaJtqsxuNebk4F4Bim2G2RU",
  authDomain: "competition-dashboard-36620.firebaseapp.com",
  projectId: "competition-dashboard-36620",
  storageBucket: "competition-dashboard-36620.firebasestorage.app",
  messagingSenderId: "461275601559",
  appId: "1:461275601559:web:a805eb7673b7fb3ccba7d2",
  measurementId: "G-KXPN4GG12S"
};

// التحقق من صحة مفاتيح Firebase
export function isFirebaseConfigured() {
  return (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes("xxxxxxxx") &&
    firebaseConfig.projectId !== "your-project"
  );
}

let app = null;
let db = null;

try {
  if (isFirebaseConfigured()) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("🔥 تم ربط Firebase Firestore بنجاح!");
  } else {
    console.warn("⚠️ مفاتيح Firebase لم تُربط بعد. يتم استخدام التخزين المحلي مؤقتاً.");
  }
} catch (err) {
  console.error("خطأ في تهيئة Firebase:", err);
}

// 2. تسجيل نتيجة مشارك جديد في قاعدة البيانات Firestore
export async function submitScore(playerName, playerScore) {
  const scoreNum = Number(playerScore) || 0;
  const nameStr = (playerName || "مشارك").trim();

  if (db && isFirebaseConfigured()) {
    try {
      await addDoc(collection(db, "scores"), {
        name: nameStr,
        score: scoreNum,
        timestamp: serverTimestamp()
      });
      console.log("✅ تم حفظ النتيجة في Firebase Firestore بنجاح!");
      return true;
    } catch (e) {
      console.error("❌ خطأ في حفظ النتيجة عبر Firebase: ", e);
      saveLocalFallbackScore(nameStr, scoreNum);
      return false;
    }
  } else {
    // التخزين المحلي في حال عدم ضبط مفاتيح Firebase بعد
    saveLocalFallbackScore(nameStr, scoreNum);
    return true;
  }
}

// 3. حذف نتيجة لاعب من قاعدة البيانات Firestore / التخزين المحلي
export async function deleteScore(scoreId) {
  if (!scoreId) return false;

  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "scores", scoreId));
      console.log(`✅ تم حذف النتيجة (${scoreId}) من Firebase Firestore بنجاح!`);
      return true;
    } catch (e) {
      console.error("❌ خطأ في حذف النتيجة من Firebase: ", e);
      deleteLocalFallbackScore(scoreId);
      return false;
    }
  } else {
    deleteLocalFallbackScore(scoreId);
    return true;
  }
}

// 4. الاستماع للتغيرات في لوحة المتصدرين لحظة بلحظة (Live Leaderboard)
export function listenToLeaderboard(callback, maxItems = 50) {
  // 1. أول ما الصفحة تفتح، جرب اعرض القديم المحفوظ فورا (عشان ميعرضش فراغ أو يظهر متأخر)
  const cachedScores = getLocalFallbackScores();
  if (cachedScores && cachedScores.length > 0 && typeof callback === "function") {
    callback(cachedScores, false);
  }

  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, "scores"),
        orderBy("score", "desc"),
        limit(maxItems)
      );

      return onSnapshot(
        q,
        (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            list.push({
              id: doc.id,
              name: data.name || "مشارك",
              score: Number(data.score) || 0,
              timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            });
          });
          // حفظها في LocalStorage للتسريع في الفتح القادم
          try {
            localStorage.setItem("quiz_local_leaderboard", JSON.stringify(list));
          } catch (e) {}

          callback(list, true); // true = live from Firebase
        },
        (error) => {
          console.error("خطأ في الاستماع لبيانات Firebase:", error);
          callback(getLocalFallbackScores(), false);
        }
      );
    } catch (err) {
      console.error("خطأ في تنفيذ query:", err);
      callback(getLocalFallbackScores(), false);
      return () => {};
    }
  } else {
    // استرجاع النتائج المحلية وإرسال إشعار بالتحديث
    const notifyLocal = () => callback(getLocalFallbackScores(), false);
    notifyLocal();
    window.addEventListener("localScoresChanged", notifyLocal);
    return () => window.removeEventListener("localScoresChanged", notifyLocal);
  }
}

// دوال التخزين الاحتياطي المحلي (Fallback Local Storage)
function getLocalFallbackScores() {
  try {
    const raw = localStorage.getItem("quiz_local_leaderboard");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalFallbackScore(name, score) {
  try {
    const list = getLocalFallbackScores();
    list.push({
      id: "local_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      name: name,
      score: Number(score) || 0,
      timestamp: new Date().toISOString()
    });
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem("quiz_local_leaderboard", JSON.stringify(list.slice(0, 100)));
    window.dispatchEvent(new Event("localScoresChanged"));
  } catch (e) {
    console.error("Local save error:", e);
  }
}

function deleteLocalFallbackScore(scoreId) {
  try {
    let list = getLocalFallbackScores();
    list = list.filter(item => item.id !== scoreId);
    localStorage.setItem("quiz_local_leaderboard", JSON.stringify(list));
    window.dispatchEvent(new Event("localScoresChanged"));
  } catch (e) {
    console.error("Local delete error:", e);
  }
}

// 5. دالة تحديث الإعدادات في قاعدة البيانات (تستخدمها من لوحة التحكم الخاص بك)
export async function updateSettings(newQuestionsCount, newTime) {
  let settingsPayload = {};
  if (typeof newQuestionsCount === "object" && newQuestionsCount !== null) {
    settingsPayload = { ...newQuestionsCount };
  } else {
    settingsPayload = {
      questionsCount: Number(newQuestionsCount) || 15,
      timeLimit: Number(newTime) || 60
    };
  }

  if (db && isFirebaseConfigured()) {
    try {
      await setDoc(doc(db, "settings", "gameConfig"), settingsPayload, { merge: true });
      console.log("✅ تم تحديث الإعدادات بنجاح في Firebase!");
      saveLocalFallbackSettings(settingsPayload);
      return true;
    } catch (e) {
      console.error("❌ خطأ في تحديث الإعدادات: ", e);
      saveLocalFallbackSettings(settingsPayload);
      return false;
    }
  } else {
    saveLocalFallbackSettings(settingsPayload);
    return true;
  }
}

// 6. دالة مراقبة الإعدادات لايف (تشتغل تلقائياً عند أي شخص فاتح الموقع)
export function listenToSettings(callback) {
  // 1. أول ما الصفحة تفتح، جرب اعرض القديم المحفوظ فوراً (عشان ميعرضش قيم غلط أو فاضية في الأول)
  const cachedSettings = getLocalFallbackSettings();
  if (cachedSettings && typeof callback === "function") {
    callback(cachedSettings, false);
  }

  // 2. اسحب البيانات الحقيقية لايف من فايربيس
  if (db && isFirebaseConfigured()) {
    try {
      return onSnapshot(doc(db, "settings", "gameConfig"), (docSnapshot) => {
        if (docSnapshot.exists()) {
          const settings = docSnapshot.data();
          
          // احفظها في الـ LocalStorage عشان تظهر فوراً المرة الجاية
          saveLocalFallbackSettings(settings);

          // طبق الإعدادات الحقيقية في الواجهة
          if (typeof callback === "function") callback(settings, true);
          console.log("تم تحديث الإعدادات بنجاح من Firebase", settings);
        } else {
          const fallback = getLocalFallbackSettings();
          if (typeof callback === "function") callback(fallback, false);
        }
      }, (error) => {
        console.error("خطأ في جلب الإعدادات من Firebase:", error);
        const fallback = getLocalFallbackSettings();
        if (typeof callback === "function") callback(fallback, false);
      });
    } catch (e) {
      console.error("❌ خطأ في تشغيل مراقب الإعدادات:", e);
      const fallback = getLocalFallbackSettings();
      if (typeof callback === "function") callback(fallback, false);
      return () => {};
    }
  } else {
    const notifyLocal = () => {
      const fallback = getLocalFallbackSettings();
      if (typeof callback === "function") callback(fallback, false);
    };
    notifyLocal();
    window.addEventListener("localSettingsChanged", notifyLocal);
    return () => window.removeEventListener("localSettingsChanged", notifyLocal);
  }
}

// دوال التخزين الاحتياطي المحلي للإعدادات
function getLocalFallbackSettings() {
  try {
    const raw = localStorage.getItem('gameSettings') || localStorage.getItem('quiz_settings');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { timeLimit: 60, questionsCount: 15, easyCount: 5, mediumCount: 5, hardCount: 5 };
}

function saveLocalFallbackSettings(settings) {
  try {
    const current = getLocalFallbackSettings();
    const updated = { ...current, ...settings };
    const str = JSON.stringify(updated);
    localStorage.setItem('gameSettings', str);
    localStorage.setItem('quiz_settings', str);
    window.dispatchEvent(new Event("localSettingsChanged"));
  } catch (e) {
    console.error("Local settings save error:", e);
  }
}

// تصدير كائن عام لتوفير التوافق المباشر للـ script العادي
window.FirebaseService = {
  submitScore,
  deleteScore,
  listenToLeaderboard,
  updateSettings,
  listenToSettings,
  isFirebaseConfigured,
  firebaseConfig
};

// تشغيل الاستماع المباشر للإعدادات فور تحميل السكريبت
if (typeof listenToSettings === "function") {
  listenToSettings((settings) => {
    if (window.dbManager && typeof window.dbManager.updateSettings === "function") {
      window.dbManager.db.settings = { ...window.dbManager.db.settings, ...settings };
      if (typeof window.dbManager.notifyListeners === "function") {
        window.dbManager.notifyListeners();
      }
    }
    if (typeof window.applySettingsToUI === "function") {
      window.applySettingsToUI(settings);
    }
  });
}


