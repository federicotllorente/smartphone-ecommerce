import { render, screen } from '@testing-library/react'
import { Loader } from '../Loader'

describe('Loader', () => {
  const renderComponent = () =>
    render(<Loader />)
  
  it('renders the component', () => {
    renderComponent()
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })
})
