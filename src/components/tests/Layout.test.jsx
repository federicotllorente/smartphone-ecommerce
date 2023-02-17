import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '../Layout'

describe('Layout', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )
  
  it('renders the header', () => {
    renderComponent()
    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })

  it('renders the children wrapper', () => {
    renderComponent()
    const layoutChildrenWrapper = screen.getByTestId('layoutChildrenWrapper')
    expect(layoutChildrenWrapper).toBeInTheDocument()
  })
})
