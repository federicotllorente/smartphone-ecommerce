import { render, screen } from '@testing-library/react'
import { Searchbar } from '../Searchbar'

describe('Searchbar', () => {
  const renderComponent = () =>
    render(<Searchbar />)
  
  it('renders the component', () => {
    renderComponent()
    const searchbar = screen.getByTestId('searchbar')
    expect(searchbar).toBeInTheDocument()
  })

  it('renders the input', () => {
    renderComponent()
    const searchbarInput = screen.getByTestId('searchbarInput')
    expect(searchbarInput).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderComponent()
    const searchbarSubmitButton = screen.getByTestId('searchbarSubmitButton')
    expect(searchbarSubmitButton).toBeInTheDocument()
  })
})
