import { normalizeProductData } from './getProductDetails'

// TODO
// const getCachedProductRecommendations = () => {
//   const cachedProductList = localStorage.getItem('productList') ?? ''
//   return cachedProductList ? JSON.parse(cachedProductList) : undefined
// }

// TODO
// const setCachedProductRecommendations = (content) => {
//   localStorage.setItem('productList', JSON.stringify(content))
// }

export const getProductRecommendations = async (productId) => {
  // const cachedProductRecommendations = getCachedProductRecommendations()
  const cachedProductRecommendations = undefined

  if (!cachedProductRecommendations || (cachedProductRecommendations && cachedProductRecommendations.expiringDate < Date.now())) {
    const data = await fetchProductRecommendationsData(productId)
    try {
      if (data) {
        // setCachedProductRecommendations(data)
        return data
      }
    } catch (err) {
      console.error(err)
    }
  }

  return cachedProductRecommendations
}

const fetchProductRecommendationsData = async (productId) => {
  if (!productId) return

  const response = await fetch(`${process.env.REACT_APP_API_RECOMMENDATIONS_BY_PRODUCT_ID}/${productId}`)
  
  try {
    const data = await response.json()
    const recommendations = data.recommendations.map(r => normalizeProductData(r))
    return {
      expiringDate: Date.now() + (1000 * 60 * 60),
      url: response.url,
      data: recommendations
    }
  } catch (err) {
    console.error(err)
  }
}
