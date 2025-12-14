# מידע על JWT בפרויקט

## 🔑 מה צריך ב-`.env`:

### `apps/server/.env`:

```env
# JWT Secret - חובה ב-production, אופציונלי בפיתוח
# לפחות 32 תווים!
JWT_SECRET=your-secret-key-here-minimum-32-characters-long

# JWT Settings (יש ברירות מחדל, אבל אפשר להגדיר)
JWT_ISSUER=civio
JWT_AUDIENCE=civio.clients
JWT_ACCESS_TTL_SECONDS=900        # 15 דקות
JWT_REFRESH_TTL_SECONDS=2592000    # 30 ימים
```

## 📋 מה יש בקוד:

### ברירות מחדל (מ-`env.ts`):
- **JWT_ISSUER**: `civio` (ברירת מחדל)
- **JWT_AUDIENCE**: `civio.clients` (ברירת מחדל)
- **JWT_ACCESS_TTL_SECONDS**: `900` (15 דקות)
- **JWT_REFRESH_TTL_SECONDS**: `2592000` (30 ימים)
- **JWT_SECRET**: 
  - בפיתוח: `dev-only-secret-change-me-dev-only-secret-change-me` (ברירת מחדל)
  - ב-production: **חובה!** לפחות 32 תווים

## ⚠️ חשוב:

1. **JWT_SECRET** - ב-production **חייב** להיות מוגדר (לפחות 32 תווים)
2. בפיתוח מקומי - יש ברירת מחדל, אבל עדיף להגדיר
3. ב-Render - `render.yaml` יוצר `JWT_SECRET` אוטומטית עם `generateValue: true`

## 🔧 איך ליצור JWT_SECRET:

### אפשרות 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### אפשרות 2: PowerShell
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### אפשרות 3: Online Generator
- https://randomkeygen.com/
- בחר "CodeIgniter Encryption Keys" או "Fort Knox Password"

## 📝 עדכון קובץ `.env`:

עדכן את `apps/server/.env`:

```env
# JWT Secret (לפחות 32 תווים)
JWT_SECRET=YOUR_SECRET_KEY_HERE_MINIMUM_32_CHARACTERS

# JWT Settings (אופציונלי - יש ברירות מחדל)
# JWT_ISSUER=civio
# JWT_AUDIENCE=civio.clients
# JWT_ACCESS_TTL_SECONDS=900
# JWT_REFRESH_TTL_SECONDS=2592000
```

## 🚀 ב-Render:

ב-`render.yaml` יש:
```yaml
- key: JWT_SECRET
  generateValue: true  # Render יוצר אוטומטית!
```

אז ב-Render **לא צריך** להגדיר ידנית - Render יוצר את זה אוטומטית!

## ✅ בדיקה:

לאחר הגדרת `JWT_SECRET`, השרת אמור לעבוד:
```bash
pnpm -C apps/server dev
```
