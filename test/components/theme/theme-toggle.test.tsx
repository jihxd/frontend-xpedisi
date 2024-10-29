import React from 'react'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import userEvent from '@testing-library/user-event'
import { useTheme } from 'next-themes'
import { UseThemeProps } from 'next-themes/dist/types'

vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeToggle Component', () => {
  let setTheme: UseThemeProps['setTheme']

  beforeEach(() => {
    setTheme = vi.fn()

    vi.mocked(useTheme).mockReturnValue({
      setTheme,
    } as UseThemeProps)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(toggleButton).toBeDefined()
  })

  it('renders the dropdown menu with theme options', async () => {
    render(<ThemeToggle />)

    const toggleButton = screen.getByTestId('theme-toggle')
    await userEvent.click(toggleButton)

    expect(screen.getByText('Light')).toBeDefined()
    expect(screen.getByText('Dark')).toBeDefined()
    expect(screen.getByText('System')).toBeDefined()
  })

  it('calls setTheme with "light" when Light option is clicked', async () => {
    render(<ThemeToggle />)

    const toggleButton = screen.getByTestId('theme-toggle')
    await userEvent.click(toggleButton)

    const lightOption = screen.getByText('Light')
    await userEvent.click(lightOption)

    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme with "dark" when Dark option is clicked', async () => {
    render(<ThemeToggle />)

    const toggleButton = screen.getByTestId('theme-toggle')
    await userEvent.click(toggleButton)

    const darkOption = screen.getByText('Dark')
    await userEvent.click(darkOption)

    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
