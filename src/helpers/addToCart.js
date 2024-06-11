import { addToCartInLocalStorage } from './cartQuantityInLocalStorage'

export const addToCart = async ({
  productId,
  colorCode,
  storageCode
}) => {
  if (!productId || !colorCode || !storageCode) return
  
  const res = await fetch(process.env.REACT_APP_API_CART, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: productId,
      colorCode,
      storageCode
    })
  }).then(data => data.json()).catch(err => console.error(err))

  if (res.count) {
    const cart = addToCartInLocalStorage(
      {
        id: productId,
        color: colorCode,
        storage: storageCode
      },
      res.count
    )
    return cart
  }
}
