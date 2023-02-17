import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductActions } from '../ProductActions'

const optionsMock = {
  colors: [
    {
      code: 1000,
      name: 'Black'
    }
  ],
  storages: [
    {
      code: 2000,
      name: '16 GB'
    },
    {
      code: 2001,
      name: '32 GB'
    }
  ]
}

describe('ProductActions', () => {
  const renderComponent = (props) => {
    const defaultProps = {
      productId: 'example',
      options: optionsMock
    }

    return render(
      <MemoryRouter>
        <ProductActions {...(props ? props : defaultProps)} />
      </MemoryRouter>
    )
  }

  it('does not render the component if no options prop is passed', async () => {
    const { container } = renderComponent({ productId: 'example' })
    expect(container.childNodes).toHaveLength(0)
  })
  
  it('renders the product option components', () => {
    renderComponent()
    const productOptionComponents = screen.getAllByTestId('productOption')
    expect(productOptionComponents).toHaveLength(2)
  })

  it('renders the product option titles', () => {
    renderComponent()
    const productOptionTitles = screen.getAllByTestId('productOptionTitle')
    expect(productOptionTitles).toHaveLength(2)
  })

  it('renders the product option values', () => {
    renderComponent()
    const productOptionValues = screen.getAllByTestId('productOptionValue')
    expect(productOptionValues).toHaveLength(3)
  })

  it('renders the add to cart button', () => {
    renderComponent()
    const addToCartButton = screen.getByTestId('addToCartButton')
    expect(addToCartButton).toBeInTheDocument()
  })
})
