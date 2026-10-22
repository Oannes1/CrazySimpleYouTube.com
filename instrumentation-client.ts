import { initBotId } from 'botid/client/core'

/**
 * Vercel BotID. Runs an invisible check in the browser and attaches the
 * result to requests on these routes. The matching server check lives in
 * each route handler (checkBotId). No keys needed: it works on any Vercel
 * deployment, and is skipped during local `npm run dev`.
 */
initBotId({
  protect: [
    { path: '/api/subscribe', method: 'POST' },
    { path: '/api/vault', method: 'POST' },
    { path: '/api/track', method: 'POST' },
  ],
})
