# הגדרות פריסה ל-Render

## 📋 שירות 1: שרת (Backend Server)

### Basic Settings
- **Name**: `civio-server`
- **Environment**: `Node`
- **Region**: בחר את האזור שלך
- **Branch**: `main` (או `master`)

### Build & Deploy
- **Root Directory**: `.` (root של ה-repo)
- **Build Command**: 
  ```
  pnpm install --frozen-lockfile && pnpm -C apps/server build
  ```
- **Start Command**: 
  ```
  pnpm -C apps/server start
  ```

### Instance Type
- **Free** (לפיתוח) או **Starter** ($7/חודש) לפרודקשן

### Health Check Path
- `/api/health`

### Environment Variables
```
NODE_ENV=production
JWT_SECRET=<GENERATE_OR_SET_SECRET_32_CHARS_MIN>
JWT_ISSUER=civio
JWT_AUDIENCE=civio.clients
CORS_ORIGINS=https://your-web-app.onrender.com
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/civio?retryWrites=true&w=majority
```

**הערות:**
- `JWT_SECRET` - צריך להיות לפחות 32 תווים (Render יכול ליצור אוטומטית)
- `CORS_ORIGINS` - כתובת ה-URL של שירות ה-Web (לאחר יצירתו)
- `MONGODB_URI` - כתובת MongoDB Atlas שלך (אופציונלי אבל מומלץ)

---

## 📋 שירות 2: אפליקציית Web (Frontend)

### Basic Settings
- **Name**: `civio-web`
- **Environment**: `Static Site` (או `Web Service` אם צריך Node)
- **Region**: אותו אזור כמו השרת
- **Branch**: `main` (או `master`)

### Build & Deploy
- **Root Directory**: `apps/web`
- **Build Command**: 
  ```
  pnpm install --frozen-lockfile && pnpm run build
  ```
- **Start Command**: 
  ```
  (לא נדרש ל-Static Site, או: pnpm run preview)
  ```

### Instance Type
- **Free** (ל-Static Site) או **Starter** ($7/חודש)

### Environment Variables
```
VITE_API_BASE_URL=https://civio-server.onrender.com
```

**הערות:**
- `VITE_API_BASE_URL` - כתובת ה-URL של שירות השרת (לאחר יצירתו)
- אם משתמשים ב-Static Site, צריך להגדיר את זה כ-Build-time variable

---

## 🔄 סדר הפעולות

1. **צור את שירות השרת קודם**
   - העתק את ההגדרות מ-"שירות 1" למעלה
   - הוסף את כל ה-Environment Variables (חוץ מ-`CORS_ORIGINS` - תעדכן אחרי)
   - המתן שהשרת יעלה בהצלחה

2. **צור את שירות ה-Web**
   - העתק את ההגדרות מ-"שירות 2" למעלה
   - הגדר את `VITE_API_BASE_URL` לכתובת השרת
   - המתן שהבילד יעבור בהצלחה

3. **עדכן את CORS_ORIGINS בשרת**
   - חזור לשירות השרת
   - עדכן את `CORS_ORIGINS` לכתובת ה-URL של שירות ה-Web
   - השרת יתחיל מחדש אוטומטית

---

## ✅ בדיקות

לאחר הפריסה, בדוק:
- שירות השרת: `https://civio-server.onrender.com/api/health`
- שירות ה-Web: `https://civio-web.onrender.com`
