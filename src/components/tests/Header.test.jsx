import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../Header'

describe('Header', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
  
  it('renders the component', () => {
    renderComponent()
    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
  })

  it('renders the logo/site name', () => {
    renderComponent()
    const logo = screen.getByTestId('logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders the menu', () => {
    renderComponent()
    const menu = screen.getByTestId('menu')
    expect(menu).toBeInTheDocument()
    expect(menu.firstChild).toHaveTextContent('All products')
  })

  it('renders the cart icon', () => {
    renderComponent()
    const cartIcon = screen.getByTestId('cartIcon')
    expect(cartIcon).toBeInTheDocument()
  })
})
