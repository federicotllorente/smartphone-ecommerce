import { addToCartInLocalStorage } from './cartQuantityInLocalStorage'

export const addToCart = async ({
  product,
  quantity = 1
}) => {
  if (!product.id || !product.color || !product.storage) return
  
  const res = await fetch(process.env.REACT_APP_API_CART, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: product.id,
      colorCode: product.color,
      storageCode: product.storage
    })
  }).then(data => data.json()).catch(err => console.error(err))

  if (res.count) {
    const cart = addToCartInLocalStorage(
      product,
      quantity
    )
    return cart
  }
}
