export interface ISidebarItem {
  name: string
  href: string
  icon?: React.ElementType
  children?: ISidebarItem[]
}
