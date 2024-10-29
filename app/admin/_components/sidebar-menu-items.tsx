'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BetweenHorizonalEnd, Home, Table2, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ISidebarItem } from '../_interfaces/sidebar'
import { useAppSelector } from '@/lib/store/hooks'

interface Props {
  type: 'desktop' | 'mobile'
  hideTitle?: boolean
}

const SidebarMenuItems = ({ type, hideTitle = false }: Props) => {
  const pathname = usePathname()
  const isExpanded = useAppSelector((state) => state.layout.isExpanded)

  const items: ISidebarItem[] = [
    {
      name: 'Paket',
      href: '/admin/master',
      icon: BetweenHorizonalEnd,
      children: [
        {
          name: 'Paket',
          href: '/admin/master/users',
          icon: User,
        },
      ],
    },
  ]

  const itemClasses = cn(
    'flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-muted-foreground',
    { 'md:justify-center': hideTitle },
    { 'text-base': type === 'mobile' },
  )

  const iconClasses = cn({
    'h-4 w-4': type === 'desktop',
    'h-5 w-5': type === 'mobile',
  })

  return items.map((item) => {
    if (item.children && isExpanded) {
      return (
        <Accordion key={item.name} type="multiple">
          <AccordionItem value={item.name} className="border-none">
            <AccordionTrigger
              className={cn(
                'px-3 py-2 text-foreground hover:text-muted-foreground hover:no-underline',
                type === 'desktop' ? 'rounded-lg' : 'rounded-xl',
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className={iconClasses} />}

                <span className={cn({ 'md:hidden': hideTitle })}>
                  {item.name}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              {item.children.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  className={cn(itemClasses, '!ml-7 mt-2', {
                    'bg-primary !text-primary-foreground':
                      pathname === child.href,
                    'md:!ml-0': hideTitle,
                  })}
                >
                  {child.icon && <child.icon className={iconClasses} />}

                  <span className={cn({ 'md:hidden': hideTitle })}>
                    {child.name}
                  </span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(itemClasses, {
          'bg-primary !text-primary-foreground': pathname === item.href,
        })}
      >
        {item.icon && <item.icon className={iconClasses} />}

        <span className={cn({ 'md:hidden': hideTitle })}>{item.name}</span>
      </Link>
    )
  })
}

export default SidebarMenuItems
