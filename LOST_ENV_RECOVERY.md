# שחזור קבצי .env - מידע שנמצא

## 🔍 מה מצאתי:

### 1. כתובת MongoDB Atlas (ב-README.md):
```
mongodb+srv://arleettt1_db_user:<URL_ENCODED_PASSWORD>@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0
```

**פרטים:**
- **Username**: `arleettt1_db_user`
- **Cluster**: `cluster0.n7wu9vn.mongodb.net`
- **Database**: `civio`

**מה חסר:**
- ❌ הסיסמה (`<URL_ENCODED_PASSWORD>`)

---

## 🔄 איפה יכול להיות המידע?

### 1. MongoDB Atlas Dashboard
- התחבר ל-https://cloud.mongodb.com
- חפש את המשתמש `arleettt1_db_user`
- אם שכחת את הסיסמה, תוכל ליצור משתמש חדש או לאפס את הסיסמה

### 2. Render Dashboard (אם כבר פרסת)
- התחבר ל-https://dashboard.render.com
- בחר את השירות `civio-server`
- לך ל-**Environment** → **Environment Variables**
- שם תוכל לראות את כל המשתנים שהוגדרו, כולל `MONGODB_URI` ו-`JWT_SECRET`

### 3. Vercel Dashboard (אם פרסת את ה-Web)
- התחבר ל-https://vercel.com
- בחר את הפרויקט
- לך ל-**Settings** → **Environment Variables**
- שם תוכל לראות את `VITE_API_BASE_URL`

### 4. גיבויים ב-Dropbox
- בדוק אם יש תיקיות גיבוי ב-Dropbox
- חפש קבצים עם שמות כמו:
  - `.env.backup`
  - `.env.old`
  - `env.txt`
  - `secrets.txt`

### 5. היסטוריית Git (אם הקבצים היו ב-git פעם)
```bash
# בדוק אם היו קבצי .env ב-git בעבר
git log --all --full-history -- "*env*"
```

### 6. קבצי Notepad/Text Editor
- בדוק אם שמרת את המידע במקום אחר
- חפש קבצי `.txt` או `.md` עם מידע על MongoDB או JWT

---

## ✅ מה לעשות עכשיו:

### אפשרות 1: שחזר מ-MongoDB Atlas
1. התחבר ל-https://cloud.mongodb.com
2. בחר את ה-Cluster `cluster0.n7wu9vn.mongodb.net`
3. לך ל-**Database Access** → **Database Users**
4. מצא את המשתמש `arleettt1_db_user`
5. אם שכחת את הסיסמה:
   - לחץ **Edit** על המשתמש
   - לחץ **Edit Password**
   - צור סיסמה חדשה
   - העתק את ה-Connection String החדש

### אפשרות 2: צור משתמש חדש ב-MongoDB
1. התחבר ל-MongoDB Atlas
2. לך ל-**Database Access** → **Add New Database User**
3. צור משתמש חדש עם סיסמה
4. העתק את ה-Connection String החדש

### אפשרות 3: בדוק ב-Render/Vercel
אם כבר פרסת את האפליקציה:
- **Render**: https://dashboard.render.com → בחר שירות → Environment Variables
- **Vercel**: https://vercel.com → בחר פרויקט → Settings → Environment Variables

---

## 📝 מה צריך בקובץ `.env`:

### `apps/server/.env`:
```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://arleettt1_db_user:YOUR_PASSWORD@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (לפחות 32 תווים)
# לפיתוח מקומי - יש ברירת מחדל, אבל עדיף להגדיר
JWT_SECRET=your-secret-key-here-minimum-32-characters-long

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

## 🔒 אבטחה - למה זה קרה?

קבצי `.env` **לא נשמרים ב-git** (נמצאים ב-`.gitignore`) כי הם מכילים מידע רגיש.

**טיפים לעתיד:**
1. ✅ שמור את המידע במקום בטוח (Password Manager)
2. ✅ שמור גיבוי של קבצי `.env` במקום מוצפן
3. ✅ השתמש ב-Environment Variables ב-Render/Vercel (לא ב-git)
4. ❌ **אל תעלה קבצי `.env` ל-git!**

---

## 🆘 אם לא מצאת את המידע:

1. **MongoDB**: צור משתמש חדש ב-Atlas
2. **JWT_SECRET**: צור מפתח חדש (לפחות 32 תווים)
3. **CORS_ORIGINS**: עדכן לאחר הפריסה

הכל ניתן לשחזר! 🎉
