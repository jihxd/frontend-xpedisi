import {
  setPolyfills,
  configureCache,
  GrowthBook,
} from '@growthbook/growthbook'

export function configureServerSideGrowthBook() {
  setPolyfills({
    fetch: (
      url: Parameters<typeof fetch>[0],
      opts: Parameters<typeof fetch>[1],
    ) =>
      fetch(url, {
        ...opts,
        next: {
          // Cache feature definitions for 1 minute
          // Implement SDK webhooks to revalidate on demand (see growthbook-revalidate route handler)
          revalidate: 60,
          tags: ['growthbook'],
        },
      }),
  })

  // Disable the built-in cache since we're using Next.js's fetch cache instead
  configureCache({
    disableCache: true,
  })
}

export async function initServerSideGrowthBook() {
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    enableDevMode: process.env.NODE_ENV === 'development',
  })
  const res = await gb.init({ timeout: 1000 })
  const payload = gb.getDecryptedPayload()
  gb.destroy()

  return {
    success: res.success,
    payload,
  }
}
