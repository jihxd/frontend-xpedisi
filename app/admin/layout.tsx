'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import Navbar from './_components/navbar'
import SidebarDesktop from './_components/sidebar-desktop'
import MainContent from './_components/main-content'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/lib/store/hooks'
import useFcmToken from '@/hooks/useFcmToken'

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const isExpanded = useAppSelector((state) => state.layout.isExpanded)
  // useFcmToken()

  return (
    <div
      className={cn('grid min-h-screen w-full md:grid-cols-[240px_1fr]', {
        'md:!grid-cols-[80px_1fr]': !isExpanded,
      })}
    >
      <SidebarDesktop />

      <div className="flex flex-col">
        <Navbar />

        <ScrollArea className="h-[calc(100vh-62px)]">
          <MainContent>{children}</MainContent>
        </ScrollArea>
      </div>
    </div>
  )
}

export default AdminLayout
