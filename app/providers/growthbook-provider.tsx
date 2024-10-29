'use client'
import { setIsInitialized } from '@/lib/store/features/growthbook/growthbook-slice'
import { useAppDispatch } from '@/lib/store/hooks'
import { GrowthBook, GrowthBookPayload } from '@growthbook/growthbook'
import { GrowthBookProvider } from '@growthbook/growthbook-react'
import { useEffect, useMemo } from 'react'

export default function GbProvider({
  initialized,
  payload,
  children,
}: {
  initialized: boolean
  payload: GrowthBookPayload
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()

  const gb = useMemo(
    () =>
      new GrowthBook({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
      }).initSync({
        payload,
        streaming: true,
      }),
    [payload],
  )

  useEffect(() => {
    dispatch(setIsInitialized(initialized))
  }, [dispatch, initialized])

  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}
