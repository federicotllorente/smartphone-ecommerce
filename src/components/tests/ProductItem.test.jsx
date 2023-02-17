import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductItem } from '../ProductItem'

const itemData = {
  id: 'example',
  brand: 'Acer',
  model: 'Iconia Talk S',
  imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg',
  price: '170'
}

describe('ProductItem', () => {
  const renderComponent = (props) => {
    const defaultProps = itemData

    return render(
      <MemoryRouter>
        <ProductItem {...(props ? props : defaultProps)} />
      </MemoryRouter>
    )
  }
  
  it('renders the component', () => {
    renderComponent()
    const productItem = screen.getByTestId('productItem')
    expect(productItem).toBeInTheDocument()
  })

  it('renders the items image', () => {
    renderComponent()
    const productItemImage = screen.getByTestId('productItemImage')
    expect(productItemImage).toBeInTheDocument()
    expect(productItemImage).toHaveAttribute('src', itemData.imgUrl)
  })

  it('renders the image component but not the image itself if a src is not passed', () => {
    renderComponent({ ...itemData, imgUrl: undefined })
    const productItemImage = screen.getByTestId('productItemImage')
    expect(productItemImage).toBeInTheDocument()
    expect(productItemImage).not.toHaveAttribute('src', itemData.imgUrl)
  })

  it('renders the items title', () => {
    renderComponent()
    const productItemTitle = screen.getByTestId('productItemTitle')
    expect(productItemTitle).toBeInTheDocument()
    expect(productItemTitle).toHaveTextContent(`${itemData.brand} ${itemData.model}`)
  })

  it('does not render the title properly if a brand and a model are not passed', () => {
    renderComponent({ ...itemData, brand: undefined, model: undefined })
    const productItemTitle = screen.getByTestId('productItemTitle')
    expect(productItemTitle).toBeInTheDocument()
    expect(productItemTitle).toHaveTextContent('')
  })

  it('renders the items price', () => {
    renderComponent()
    const productItemPrice = screen.getByTestId('productItemPrice')
    expect(productItemPrice).toBeInTheDocument()
    expect(productItemPrice).toHaveTextContent(`$ ${itemData.price}`)
  })

  it('renders the See Details button', () => {
    renderComponent()
    const productItemSeeDetailsButton = screen.getByTestId('productItemSeeDetailsButton')
    expect(productItemSeeDetailsButton).toBeInTheDocument()
  })
})
