'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
import { Fragment } from 'react'
import { INavbarItem } from '../_interfaces/navbar'
import { logout } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'

const NavbarDropdownMenu = () => {
  const router = useRouter()

  const items: INavbarItem[] = [
    {
      name: 'Logout',
      action: async () => {
        try {
          console.log('logout')
          await logout() // Memanggil fungsi logout
          // router.push('/app/(auth)/login') // Redirect ke halaman login setelah logout berhasil
        } catch (error) {
          console.error('Gagal logout:', error)
        }
      },
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {items.map((item) => (
          <Fragment key={item.name}>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={item.action}>
              {item.name}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavbarDropdownMenu
