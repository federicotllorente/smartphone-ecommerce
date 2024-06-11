import { useContext, useState } from 'react'

import { ReactComponent as CloseIcon } from '../assets/svg/close.svg'
import { CartContext, addToCart, removeFromCart } from '../helpers'

import { QuantityButton } from './QuantityButton'

export const CartModal = ({ onClose }) => {
  const { cart } = useContext(CartContext)

  return (
    <>
      <div className="fixed top-0 right-0 w-screen h-screen bg-[#000] opacity-70 z-[49]" onClick={onClose}></div>
      <div className="fixed right-0 top-0 w-full md:w-[600px] h-full bg-secondary-white z-[50] shadow-lg shadow-black/30">
        <span className="absolute top-3 right-3">
          <button
            className="relative w-[24px] h-[24px]"
            onClick={onClose}
          >
            <CloseIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.5]" />
          </button>
        </span>
        <div className="p-4 overflow-y-auto">
          <h2 className="pb-4">Cart summary</h2>
          
          <div>
            {cart.map((item) => (
              <ProductInCartItem
                key={`${item.id}-${item.color}-${item.storage}`}
                product={{ ...item }}
              />
            ))}
          </div>

          <div className="flex gap-2 p-2 justify-between">
            <p className="text-md font-bold">Total <span className="text-xs font-normal">{`(${cart.reduce((total, item) => total + item.quantity, 0)} products)`}</span></p>
            <p className="text-md font-bold">$ {parseFloat(cart.reduce((total, item) => total + parseFloat(item.details.price) * item.quantity, 0))}</p>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductInCartItem = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { setCart } = useContext(CartContext)
  
  const handleDecreaseQuantity = async () => {
    setIsLoading(true)

    const cartToSet = await removeFromCart({
      product,
      quantity: 1
    })

    if (cartToSet) setCart(cartToSet)

    setIsLoading(false)
  }

  const handleIncreaseQuantity = async () => {
    setIsLoading(true)

    const cartToSet = await addToCart({
      product,
      quantity: 1
    })

    if (cartToSet) setCart(cartToSet)

    setIsLoading(false)
  }

  return (
    <div className="flex gap-3 justify-between border-b border-secondary-black-darkWithOpacity p-2">
      <div className="flex gap-3">
        <div className="w-[100px] aspect-square">
          <img
            src={product.details.imgUrl}
            alt={`${product.details.brand} ${product.details.model}`}
            data-testid="productItemImage"
          />
        </div>

        <div>
          <p className="pb-1 text-md font-bold">{product.details.brand} {product.details.model}</p>
          <p><span className="font-bold">Color: </span>{product?.details?.options?.colors?.find(c => c.code === product.color).name}</p>
          <p><span className="font-bold">Storage: </span>{product?.details?.options?.storages?.find(s => s.code === product.storage).name}</p>
          
          <div className="mt-2 max-w-[123px]">
            <QuantityButton
              quantity={product.quantity}
              onDecrease={handleDecreaseQuantity}
              onIncrease={handleIncreaseQuantity}
              isIncreaseDisabled={product.quantity == 10}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-md font-bold">$ {parseFloat(product.details.price) * product.quantity}</p>
        <p className="text-xs pt-1">$ {parseFloat(product.details.price)} / unit</p>
      </div>
    </div>
  )
}
