'use client'

import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import SidebarMobile from './sidebar-mobile'
import NavbarDropdownMenu from './navbar-dropdown-menu'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { setIsExpanded } from '@/lib/store/features/layout/layout-slice'
import { useFeatureIsOn } from '@growthbook/growthbook-react'

const Navbar = () => {
  const isExpanded = useAppSelector((state) => state.layout.isExpanded)
  const dispatch = useAppDispatch()

  const isGrowthbookInitialized = useAppSelector(
    (state) => state.growthbook.isInitialized,
  )
  const isShowThemeSwitcher = useFeatureIsOn('enable-theme-switcher')

  const renderThemeToggle = () => {
    // Show theme toggle by default when Growthbook is not initialized
    if (!isGrowthbookInitialized || isShowThemeSwitcher) {
      return <ThemeToggle />
    }
    return null
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetTitle>
            <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Sidebar Menu</VisuallyHidden.Root>
          </SheetDescription>

          <SheetContent side="left" className="flex flex-col">
            <SidebarMobile />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex w-full flex-1 gap-2 max-sm:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(setIsExpanded(!isExpanded))}
        >
          <Menu className="h-5 w-5 opacity-50" />
        </Button>

        <form className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ID"
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {renderThemeToggle()}

        <NavbarDropdownMenu />
      </div>
    </header>
  )
}

export default Navbar
