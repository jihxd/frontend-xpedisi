import React, { ReactNode } from 'react'

interface Props {
  title: string
  action?: ReactNode
  children: ReactNode
}

const PageLayout = ({ title, action, children }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {action && <div data-testid="page-layout-action">{action}</div>}
      </div>

      {children}
    </>
  )
}

export default PageLayout
