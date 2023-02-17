import { createContext } from 'react'

export const CartContext = createContext({
  cartQuantity: 0,
  setCartQuantity: () => {}
})
