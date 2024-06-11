import { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { QuantityButton } from './QuantityButton'
import { ProductItemModal } from './ProductItemModal'

import { CartContext } from '../helpers'

export const ProductItem = ({
  id,
  brand,
  model,
  imgUrl,
  price
}) => {
  const { cart } = useContext(CartContext)
  const [shouldShowModal, setShouldShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const itemsInCart = useMemo(() => Array.isArray(cart) ? cart?.filter(el => el.id === id) : [], [cart])
  const unifiedItemInCart = useMemo(
    () => itemsInCart.length ? ({
      id: itemsInCart?.[0].id,
      quantity: itemsInCart?.reduce((total, item) => total + item.quantity, 0) ?? 0
    }) : {},
    [cart]
  )

  const handleOpenModal = () => {
    setShouldShowModal(true)
    setSelectedProduct(id)
  }

  // if (itemsInCart.length) console.log('itemsInCart', id, itemsInCart)
  // if (Object.keys(unifiedItemInCart).length) console.log('unifiedItemInCart', id, unifiedItemInCart)

  return (
    <div className="h-full flex flex-col border border-secondary-black-darkWithOpacity rounded">
      <Link
        to={`/products/${id}`}
        className="h-full flex flex-col justify-between"
        data-testid="productItem"
      >
        <div className="flex flex-col">
          <img
            src={imgUrl}
            alt={`${brand} ${model}`}
            className="w-full max-w-20 md:max-w-auto mx-auto p-2"
            data-testid="productItemImage"
          />
          <div className="h-full flex flex-col p-2 gap-1 justify-between" >
            <p data-testid="productItemTitle">
              {brand} {model}
            </p>
            <strong data-testid="productItemPrice">{`$ ${price}`}</strong>
          </div>
        </div>
      </Link>
      {!unifiedItemInCart.quantity && (
        <button
          className="px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition"
          data-testid="productItemSeeDetailsButton"
          onClick={handleOpenModal}
        >
          Add to cart
        </button>
      )}
      {unifiedItemInCart.quantity && (
        <QuantityButton
          quantity={unifiedItemInCart.quantity}
          onDecrease={handleOpenModal}
          onIncrease={handleOpenModal}
          noBorderBottom
        />
      )}
      {shouldShowModal && selectedProduct && (
        <ProductItemModal
          productDetails={selectedProduct}
          productId={selectedProduct}
          onClose={() => {
            setShouldShowModal(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
