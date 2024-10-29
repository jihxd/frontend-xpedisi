import { useAppSelector } from '@/lib/store/hooks'
import SidebarLogo from './sidebar-logo'
import SidebarMenuItems from './sidebar-menu-items'

const SidebarDesktop = () => {
  const isExpanded = useAppSelector((state) => state.layout.isExpanded)

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-center border-b px-4 lg:h-[60px] lg:px-6">
          <SidebarLogo hideTitle={!isExpanded} />
        </div>

        <div className="flex-1">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            <SidebarMenuItems hideTitle={!isExpanded} type="desktop" />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default SidebarDesktop
