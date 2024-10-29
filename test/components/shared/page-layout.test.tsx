import React from 'react'
import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import PageLayout from '@/components/shared/page-layout'

describe('PageLayout Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the title', () => {
    render(<PageLayout title="Test Title">Content</PageLayout>)
    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toBeDefined()
  })

  it('renders the action when provided', () => {
    render(
      <PageLayout title="Test Title" action={<button>Click Me</button>}>
        Content
      </PageLayout>,
    )
    const actionElement = screen.getByRole('button', { name: /click me/i })
    expect(actionElement).toBeDefined()
  })

  it('does not render the action when not provided', () => {
    render(<PageLayout title="Test Title">Content</PageLayout>)
    const actionElement = screen.queryByTestId('page-layout-action')
    expect(actionElement).toBeNull()
  })

  it('renders the children', () => {
    render(<PageLayout title="Test Title">This is the content!</PageLayout>)
    const contentElement = screen.getByText(/this is the content!/i)
    expect(contentElement).toBeDefined()
  })
})
