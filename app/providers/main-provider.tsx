import StoreProvider from './store-provider'
import GbProvider from './growthbook-provider'
import { ThemeProvider } from './theme-provider'
import {
  configureServerSideGrowthBook,
  initServerSideGrowthBook,
} from '@/lib/growthbook-server'
import type { ReactNode } from 'react'

const MainProvider = async ({ children }: { children: ReactNode }) => {
  configureServerSideGrowthBook()

  const { success, payload } = await initServerSideGrowthBook()

  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <GbProvider payload={payload} initialized={success}>
          {children}
        </GbProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MainProvider
