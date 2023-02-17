export const getCartQuantityInLocalStorage = () => {
  const cartQuantityInLocalStorage = localStorage.getItem('cart-quantity')
  return cartQuantityInLocalStorage ? JSON.parse(cartQuantityInLocalStorage) : undefined
}

export const increaseCartQuantityInLocalStorage = (value) => {
  const cartQuantityInLocalStorage = getCartQuantityInLocalStorage()
  if (cartQuantityInLocalStorage) {
    localStorage.setItem('cart-quantity', cartQuantityInLocalStorage + value)
  } else {
    localStorage.setItem('cart-quantity', value)
  }
}
