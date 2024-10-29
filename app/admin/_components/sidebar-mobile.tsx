import SidebarLogo from './sidebar-logo'
import SidebarMenuItems from './sidebar-menu-items'

const SidebarMobile = () => {
  return (
    <nav className="grid gap-2 font-medium">
      <SidebarLogo />

      <div className="mt-2 space-y-2">
        <SidebarMenuItems type="mobile" />
      </div>
    </nav>
  )
}

export default SidebarMobile
