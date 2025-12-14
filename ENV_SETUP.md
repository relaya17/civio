# הוראות יצירת קבצי .env

## למה אין קבצי .env?

קבצי `.env` מכילים מידע רגיש (סיסמאות, מפתחות API וכו') ולכן **לא נשמרים ב-git** (נמצאים ב-`.gitignore`).

אתה צריך ליצור אותם בעצמך באופן מקומי.

---

## 📋 יצירת קבצי .env

### 1. שרת (Backend) - `apps/server/.env`

```bash
# העתק את הקובץ example
cp apps/server/.env.example apps/server/.env
```

או צור ידנית את הקובץ `apps/server/.env` עם התוכן הבא:

```env
# MongoDB (אופציונלי - רק אם יש לך MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civio?retryWrites=true&w=majority

# JWT Secret (נדרש רק ב-production, לפחות 32 תווים)
# JWT_SECRET=your-secret-key-here-minimum-32-characters-long

# CORS (לפיתוח מקומי)
CORS_ORIGINS=http://localhost:5727

# Port (ברירת מחדל: 4000)
PORT=4000

# Node Environment
NODE_ENV=development
```

**הערות:**
- `MONGODB_URI` - אופציונלי, רק אם יש לך MongoDB Atlas
- `JWT_SECRET` - לא נדרש לפיתוח מקומי (יש ברירת מחדל), אבל **חובה ב-production**
- `CORS_ORIGINS` - כתובת ה-URL של האפליקציה (localhost לפיתוח)

---

### 2. אפליקציית Web - `apps/web/.env`

```bash
# העתק את הקובץ example
cp apps/web/.env.example apps/web/.env
```

או צור ידנית את הקובץ `apps/web/.env` עם התוכן הבא:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000
```

**הערות:**
- `VITE_API_BASE_URL` - כתובת השרת (localhost לפיתוח מקומי)
- ב-production, זה יוגדר ב-Vercel/Render Environment Variables

---

## ✅ בדיקה

לאחר יצירת הקבצים, השרת והאפליקציה אמורים לעבוד:

```bash
# הפעל את השרת
pnpm -C apps/server dev

# הפעל את האפליקציה (בטרמינל אחר)
pnpm -C apps/web dev
```

---

## 🔒 אבטחה

**חשוב:**
- ✅ קבצי `.env` נמצאים ב-`.gitignore` - לא יועלו ל-git
- ✅ קבצי `.env.example` כן נשמרים ב-git (ללא ערכים רגישים)
- ❌ **אל תעלה קבצי `.env` ל-git!**
- ❌ **אל תשתף את תוכן קבצי `.env` עם אחרים!**
