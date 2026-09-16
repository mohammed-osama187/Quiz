/* =========================================================
   تحدي المعرفة - خدمة Firebase (Modular SDK v10 CDN)
   الخطوة 4: ربط Firebase بالموقع للوحة المتصدرين والتحديث الحي
   ========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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

// 3. الاستماع للتغيرات في لوحة المتصدرين لحظة بلحظة (Live Leaderboard)
export function listenToLeaderboard(callback, maxItems = 25) {
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
      id: "local_" + Date.now(),
      name: name,
      score: Number(score) || 0,
      timestamp: new Date().toISOString()
    });
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem("quiz_local_leaderboard", JSON.stringify(list.slice(0, 50)));
    window.dispatchEvent(new Event("localScoresChanged"));
  } catch (e) {
    console.error("Local save error:", e);
  }
}

// تصدير كائن عام لتوفير التوافق المباشر للـ script العادي
window.FirebaseService = {
  submitScore,
  listenToLeaderboard,
  isFirebaseConfigured,
  firebaseConfig
};
