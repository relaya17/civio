# 🔍 הוראות שחזור קבצי .env

## ⚠️ מצב נוכחי:
קבצי ה-`.env` המקוריים לא נמצאו במערכת. זה נורמלי כי הם לא נשמרים ב-git (נמצאים ב-`.gitignore`).

## 📋 מה יש לנו:
1. **MongoDB Atlas Connection String** (חלקי):
   ```
   mongodb+srv://arleettt1_db_user:<PASSWORD>@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0
   ```
   - Username: `arleettt1_db_user` ✅
   - Cluster: `cluster0.n7wu9vn.mongodb.net` ✅
   - Database: `civio` ✅
   - Password: ❌ חסר

## 🔄 איפה יכול להיות המידע:

### 1. MongoDB Atlas Dashboard (הכי סביר!)
1. התחבר ל-https://cloud.mongodb.com
2. בחר את ה-Cluster `cluster0.n7wu9vn.mongodb.net`
3. לך ל-**Database Access** → **Database Users**
4. מצא את המשתמש `arleettt1_db_user`
5. **אפשרויות:**
   - אם אתה זוכר את הסיסמה - השתמש בה
   - אם לא - לחץ **Edit** → **Edit Password** → צור סיסמה חדשה
6. לאחר מכן, לך ל-**Database** → **Connect** → **Connect your application**
7. העתק את ה-Connection String החדש

### 2. Render Dashboard (אם כבר פרסת)
1. התחבר ל-https://dashboard.render.com
2. בחר את השירות `civio-server` (אם קיים)
3. לך ל-**Environment** → **Environment Variables**
4. שם תראה את כל המשתנים, כולל:
   - `MONGODB_URI` (עם הסיסמה!)
   - `JWT_SECRET`
   - `CORS_ORIGINS`

### 3. Vercel Dashboard (אם פרסת את ה-Web)
1. התחבר ל-https://vercel.com
2. בחר את הפרויקט `civio` (אם קיים)
3. לך ל-**Settings** → **Environment Variables**
4. שם תראה את `VITE_API_BASE_URL`

### 4. MongoDB Compass (אם התקנת)
אם יש לך MongoDB Compass מותקן:
1. פתח את MongoDB Compass
2. בדוק את ה-Connection Strings השמורים
3. חפש חיבורים ל-`cluster0.n7wu9vn.mongodb.net`

### 5. Password Manager
אם אתה משתמש ב-Password Manager (LastPass, 1Password, Bitwarden וכו'):
- חפש: `arleettt1_db_user`, `MongoDB`, `civio`, `cluster0.n7wu9vn`

### 6. קבצי Notepad/Text Editor
- בדוק אם שמרת את המידע במקום אחר
- חפש קבצי `.txt`, `.md`, או הערות

---

## ✅ מה לעשות עכשיו:

### אפשרות 1: שחזר מ-MongoDB Atlas (מומלץ!)
1. התחבר ל-MongoDB Atlas
2. אם שכחת את הסיסמה - צור סיסמה חדשה למשתמש
3. העתק את ה-Connection String החדש
4. עדכן את `apps/server/.env`:

```env
MONGODB_URI=mongodb+srv://arleettt1_db_user:YOUR_NEW_PASSWORD@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0
```

### אפשרות 2: צור משתמש חדש ב-MongoDB
אם לא מצאת את המשתמש הישן:
1. לך ל-MongoDB Atlas → **Database Access** → **Add New Database User**
2. צור משתמש חדש עם סיסמה
3. העתק את ה-Connection String החדש
4. עדכן את `apps/server/.env`

### אפשרות 3: בדוק ב-Render/Vercel
אם כבר פרסת:
- **Render**: https://dashboard.render.com → בחר שירות → Environment Variables
- **Vercel**: https://vercel.com → בחר פרויקט → Settings → Environment Variables

---

## 📝 תבנית קובץ `.env` מלא:

### `apps/server/.env`:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://arleettt1_db_user:YOUR_PASSWORD@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (לפחות 32 תווים)
# לפיתוח מקומי - יש ברירת מחדל, אבל עדיף להגדיר
JWT_SECRET=your-secret-key-here-minimum-32-characters-long-change-this

# CORS
CORS_ORIGINS=http://localhost:5727

# Port
PORT=4000

# Node Environment
NODE_ENV=development
```

### `apps/web/.env`:
```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000
```

---

## 🆘 אם לא מצאת את המידע:

**אל דאגה!** הכל ניתן לשחזר:

1. **MongoDB**: צור משתמש חדש ב-Atlas (זה לא משפיע על הנתונים!)
2. **JWT_SECRET**: צור מפתח חדש (לפחות 32 תווים)
3. **CORS_ORIGINS**: עדכן לאחר הפריסה

**הנתונים ב-MongoDB לא יאבדו** - רק צריך להתחבר מחדש!

---

## 🔒 למה זה קרה?

קבצי `.env` **לא נשמרים ב-git** כי הם מכילים מידע רגיש. זה נכון ובטוח!

**טיפים לעתיד:**
1. ✅ שמור את המידע ב-Password Manager
2. ✅ שמור גיבוי מוצפן של קבצי `.env`
3. ✅ השתמש ב-Environment Variables ב-Render/Vercel
4. ❌ **אל תעלה קבצי `.env` ל-git!**

---

## 📞 צעדים הבאים:

1. **עכשיו**: התחבר ל-MongoDB Atlas וצור/שחזר את הסיסמה
2. **עדכן**: את `apps/server/.env` עם ה-Connection String החדש
3. **בדוק**: שהשרת עובד עם `pnpm -C apps/server dev`

**הכל יהיה בסדר!** 🎉
