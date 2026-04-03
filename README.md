# Mux Convex Component Example App

An example video streaming app built with the [`@mux/convex`](https://www.npmjs.com/package/@mux/convex) component. It demonstrates how to sync Mux video assets into Convex and stream them in the browser using [Video.js 10](https://www.npmjs.com/package/@videojs/react) with Mux's HLS playback.

## What's in the box

- **[`@mux/convex`](https://www.npmjs.com/package/@mux/convex)** — Convex component that syncs Mux `assets`, `uploads`, `liveStreams`, and `events` into Convex tables, plus `videoMetadata` for app-level data (title, tags, visibility, etc.)
- **Mux webhook ingestion** — `POST /mux/webhook` endpoint that verifies and processes Mux webhook events to keep Convex in sync
- **Backfill migration** — One-time action to import existing Mux assets into Convex
- **[`@videojs/react`](https://www.npmjs.com/package/@videojs/react)** with `MuxVideo` — HLS video player that streams directly from Mux using playback IDs stored in Convex
- **Rsbuild + React 19** frontend with real-time Convex subscriptions

## Prerequisites

- A [Mux](https://mux.com) account with video assets
- A [Convex](https://convex.dev) project
- [Bun](https://bun.sh) (or npm/pnpm/yarn)

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Set up Convex

```bash
npx convex dev
```

This will prompt you to create or connect a Convex project and start the dev server.

### 3. Set environment variables

Set your Mux credentials in Convex:

```bash
npx convex env set MUX_TOKEN_ID <your_mux_token_id>
npx convex env set MUX_TOKEN_SECRET <your_mux_token_secret>
npx convex env set MUX_WEBHOOK_SECRET <your_mux_webhook_secret>
```

Add the Convex deployment URL to `.env.local` for the frontend:

```
CONVEX_URL=https://<your-deployment>.convex.cloud
PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud
```

### 4. Configure the Mux webhook

In the [Mux Dashboard](https://dashboard.mux.com), create a webhook endpoint pointing to:

```
https://<your-deployment>.convex.site/mux/webhook
```

### 5. Backfill existing assets

If you already have assets in Mux, run the backfill migration to sync them into Convex:

```bash
npx convex run migrations:backfillMux '{}'
```

### 6. Start the app

```bash
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project structure

```
convex/
  convex.config.ts    # Registers the @mux/convex component
  schema.ts           # App-level schema
  videos.ts           # Public queries wrapping the Mux component catalog
  http.ts             # HTTP router (Mux webhook + test endpoint)
  muxHttp.ts          # Registers the POST /mux/webhook route
  muxWebhook.ts       # Verifies and processes Mux webhook events
  migrations.ts       # One-time backfill of existing Mux assets
src/
  index.tsx           # Entry point with ConvexProvider
  App.tsx             # Main app — video player + sidebar
  components/
    VideoPlayer.tsx   # Video.js 10 player with MuxVideo media element
    VideoList.tsx     # Scrollable list of video thumbnails
```

## Scripts

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `bun run dev`      | Start the dev server           |
| `bun run build`    | Build for production           |
| `bun run preview`  | Preview the production build   |

## Learn more

- [`@mux/convex` on npm](https://www.npmjs.com/package/@mux/convex)
- [Convex documentation](https://docs.convex.dev)
- [Mux documentation](https://docs.mux.com)
- [Video.js 10 React](https://www.npmjs.com/package/@videojs/react)
- [Rsbuild documentation](https://rsbuild.rs)
# Mux-Convex-Example
