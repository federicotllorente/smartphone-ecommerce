import { useContext } from 'react'

import { ReactComponent as CloseIcon } from '../assets/svg/close.svg'
import { CartContext } from '../helpers'

export const CartModal = ({ onClose }) => {
  const { cart } = useContext(CartContext)

  console.log(cart)

  const removeFromCart = i => console.log(i)

  return (
    <>
      <div className="fixed top-0 right-0 w-screen h-screen bg-[#000] opacity-70 z-[49]" onClick={onClose}></div>
      <div className="fixed right-0 top-0 w-full md:w-[500px] h-full bg-secondary-white z-[50] shadow-lg shadow-black/30">
        <span className="absolute top-3 right-3">
          <button
            className="relative w-[24px] h-[24px]"
            onClick={onClose}
          >
            <CloseIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.5]" />
          </button>
        </span>
        <div className="p-4 overflow-y-auto">
          <h2>Cart summary</h2>
          <div>
            {cart.map((item) => (
              <ProductInCartItem
                key={item.id}
                name={item.name}
                price={item.price}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const ProductInCartItem = ({ name, price, onRemove }) => {
  return (
    <div className="flex justify-between items-center border-b border-secondary-black-darkWithOpacity p-2">
      <div>
        <p className="font-bold">{name}</p>
        <p>${price}</p>
      </div>
      <button
        onClick={onRemove}
        className="bg-red-500 text-white p-1 rounded hover:bg-red-700 transition"
      >
        Remove
      </button>
    </div>
  )
}
