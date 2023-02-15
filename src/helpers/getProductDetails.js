const getCachedProductDetails = (productId) => {
  const cachedProductDetails = localStorage.getItem(productId) ?? ''
  return cachedProductDetails ? JSON.parse(cachedProductDetails) : undefined
}

const setCachedProductDetails = (productId, content) => {
  localStorage.setItem(productId, JSON.stringify(content))
}

export const getProductDetails = async (productId) => {
  const cachedProductDetails = getCachedProductDetails(productId)

  if (!cachedProductDetails || (cachedProductDetails && cachedProductDetails.expiringDate < Date.now())) {
    const data = await fetchProductDetailsData(productId)

    try {
      if (data) {
        setCachedProductDetails(productId, data)
        return data
      }
    } catch (err) {
      console.error(err)
    }
  }

  return cachedProductDetails
}

const fetchProductDetailsData = async (productId) => {
  const response = await fetch(`https://itx-frontend-test.onrender.com/api/product/${productId}`)

  try {
    const data = await response.json()
    if (response.status != 200) {
      throw new Error(data.message)
    }
    return {
      expiringDate: Date.now() + (1000 * 60 * 60),
      url: response.url,
      data
    }
  } catch (err) {
    console.error(err)
  }
}
