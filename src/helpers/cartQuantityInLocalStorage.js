export const getCartInLocalStorage = () => {
  const cartInLocalStorage = localStorage.getItem('cart')
  return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
}

export const addToCartInLocalStorage = (product, quantity) => {
  const cart = getCartInLocalStorage()
  const productInCart = cart?.find(el =>
    el.id === product.id &&
    el.color === product.color &&
    el.storage === product.storage
  )

  if (productInCart) {
    const cartToSet = cart.filter(el => !(
      el.id === product.id &&
      el.color === product.color &&
      el.storage === product.storage
    ))
    cartToSet.unshift({ ...product, quantity: quantity + productInCart.quantity })
    localStorage.setItem('cart', JSON.stringify(cartToSet))
  } else {
    cart.unshift({ ...product, quantity })
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return getCartInLocalStorage()
}

export const removeFromCartInLocalStorage = (product, quantity) => {
  const cart = getCartInLocalStorage()
  const productInCart = cart?.find(el =>
    el.id === product.id &&
    el.color === product.color &&
    el.storage === product.storage
  )

  if (!productInCart) return

  if (productInCart.quantity - quantity <= 0) {
    const cartToSet = cart.filter(el => !(
      el.id === product.id &&
      el.color === product.color &&
      el.storage === product.storage
    ))
    localStorage.setItem('cart', JSON.stringify(cartToSet))
  } else {
    const cartToSet = cart.filter(el => !(
      el.id === product.id &&
      el.color === product.color &&
      el.storage === product.storage
    ))
  
    cartToSet.unshift({ ...product, quantity: productInCart.quantity - quantity })
    localStorage.setItem('cart', JSON.stringify(cartToSet))
  }

  return getCartInLocalStorage()
}
