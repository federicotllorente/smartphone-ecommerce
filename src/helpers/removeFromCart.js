import { removeFromCartInLocalStorage } from './cartQuantityInLocalStorage'

export const removeFromCart = async ({
  product,
  quantity = 1
}) => {
  if (!product.id || !product.color || !product.storage) return

  const cart = removeFromCartInLocalStorage(
    product,
    quantity
  )
  return cart
}
