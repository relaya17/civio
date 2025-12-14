## Civio

**Civio – Clear guidance for your rights**

Monorepo (Turborepo + pnpm) for:
- `apps/web`: React + Vite + MUI (RTL)
- `apps/mobile`: Expo + React Native + React Native Paper
- `apps/server`: Node + Express + TypeScript (AI-safe gateway)

### Local development

- **Server**:

```bash
pnpm -C apps/server dev
```

- **MongoDB (Atlas)**: create `apps/server/.env` (this file is ignored by git) and set:

```bash
MONGODB_URI=mongodb+srv://arleettt1_db_user:<URL_ENCODED_PASSWORD>@cluster0.n7wu9vn.mongodb.net/civio?retryWrites=true&w=majority&appName=Cluster0
```

Notes:
- Replace `<URL_ENCODED_PASSWORD>` with your actual password (URL-encode if it contains `@ : / ? #` etc).
- The `/civio` part is the database name (recommended).

### פריסה (Deployment)

#### 1. פריסת השרת ב-Render

1. **התחבר ל-Render**: https://dashboard.render.com
2. **New → Blueprint**: בחר את ה-repository `relaya17/civio`
3. Render יקרא את `render.yaml` ויצור את השירות אוטומטית
4. **לאחר יצירת השירות**, הוסף/עדכן את ה-**Environment Variables** ב-Render dashboard:
   - **`CORS_ORIGINS`**: כתובת ה-Vercel שלך (לדוגמה: `https://civio.vercel.app` או `https://your-app.vercel.app`)
   - **`MONGODB_URI`** (מומלץ): כתובת ה-MongoDB Atlas שלך

**הערות:**
- Render יוצר `JWT_SECRET` אוטומטית מ-`render.yaml`
- Render מזריק `PORT` אוטומטית
- השרת לא יתחיל ב-production בלי `JWT_SECRET` ו-`CORS_ORIGINS`

#### 2. פריסת האפליקציה ב-Vercel

1. **התחבר ל-Vercel**: https://vercel.com
2. **Add New Project**: בחר את ה-repository `relaya17/civio`
3. **הגדרות Build**:
   - **Framework Preset**: Vite (או Auto-detect)
   - **Root Directory**: השאר ריק (Vercel יקרא את `vercel.json`)
   - **Build Command**: `pnpm install --frozen-lockfile && pnpm -C apps/web build` (אוטומטי מ-`vercel.json`)
   - **Output Directory**: `apps/web/dist` (אוטומטי מ-`vercel.json`)
4. **Environment Variables**:
   - **`VITE_API_BASE_URL`**: כתובת ה-Render שלך (לדוגמה: `https://civio-server.onrender.com`)
5. **Deploy**

**הערות:**
- Vercel יקרא את `vercel.json` אוטומטית
- לאחר הפריסה, עדכן את `CORS_ORIGINS` ב-Render עם כתובת ה-Vercel החדשה

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
