import { render, screen } from '@testing-library/react'
import { ProductDescription } from '../ProductDescription'

// This is only the data showed at rendering, when the description is not fully showed
const baseProductDataMock = {
  brand: 'Acer',
  model: 'Iconia Talk S',
  ram: '2 GB RAM',
  os: 'Android 6.0 (Marshmallow)'
}

// This is the full description that is being rendered when the user clicks the 'Show more' button
const extendedProductDataMock = {
  ...baseProductDataMock,
  cpu: 'Quad-core 1.3 GHz Cortex-A53',
  gpu: 'Mali-T720MP2',
  displaySize: '720 x 1280 pixels (~210 ppi pixel density)',
  displayResolution: '7.0 inches (~69.8% screen-to-body ratio)',
  battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
  primaryCamera: [
    '13 MP',
    'autofocus'
  ],
  secondaryCmera: [ // this property (with the typo) is coming like this from the API
    '2 MP',
    '720p'
  ],
  dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
  weight: '260',
  externalMemory: 'microSD  up to 128 GB (dedicated slot)'
}

describe('ProductDescription', () => {
  const renderComponent = (props) => {
    const defaultProps = extendedProductDataMock

    return render(
      <ProductDescription {...(props ? props : defaultProps)} />
    )
  }

  it('renders the product description title', () => {
    renderComponent()
    const productDescriptionTitle = screen.getByTestId('productDescriptionTitle')
    expect(productDescriptionTitle).toBeInTheDocument()
  })

  it('renders the product description list', () => {
    renderComponent()
    const productDescriptionList = screen.getByTestId('productDescriptionList')
    expect(productDescriptionList).toBeInTheDocument()
    expect(productDescriptionList.childNodes).toHaveLength(Object.keys(baseProductDataMock).length)
  })

  it('renders the product description list items', () => {
    renderComponent()
    Object.keys(baseProductDataMock).forEach(item => {
      const productDescriptionListItem = screen.getByTestId(`productDescriptionList-${item}`)
      expect(productDescriptionListItem).toBeInTheDocument()
    })
  })

  it('does not render the product description list items if no props are passed', () => {
    renderComponent({})
    const productDescriptionList = screen.getByTestId('productDescriptionList')
    expect(productDescriptionList.childNodes).toHaveLength(0)
  })

  it('renders the Show more button', () => {
    renderComponent()
    const productDescriptionShowMoreButton = screen.getByTestId('productDescriptionShowMoreButton')
    expect(productDescriptionShowMoreButton).toBeInTheDocument()
  })
})
