import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

interface Props {
  hideTitle?: boolean
}

const SidebarLogo = ({ hideTitle = false }: Props) => (
  <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
    <LayoutDashboard className="h-6 w-6" />
    {!hideTitle && <span>Xpedisi</span>}
  </Link>
)

export default SidebarLogo
