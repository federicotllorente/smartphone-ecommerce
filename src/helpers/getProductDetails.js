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
  const response = await fetch(`${process.env.REACT_APP_API_PRODUCT}/${productId}`)

  try {
    const data = await response.json()
    if (response.status != 200) {
      throw new Error(data.message)
    }
    return {
      expiringDate: Date.now() + (1000 * 60 * 60),
      url: response.url,
      data: normalizeProductData(data)
    }
  } catch (err) {
    console.error(err)
  }
}

export const normalizeProductData = data => ({
  ...data,
  // bluetooth: JSON.parse(data.bluetooth.replace(/'/g, '"')),
  colors: JSON.parse(data.colors.replace(/'/g, '"')),
  // internalMemory: JSON.parse(data.internalMemory.replace(/'/g, '"')),
  options: JSON.parse(data.options.replace(/'/g, '"')),
  // primaryCamera: JSON.parse(data.primaryCamera.replace(/'/g, '"')),
  // secondaryCmera: JSON.parse(data.secondaryCmera.replace(/'/g, '"')),
  // sensors: JSON.parse(data.sensors.replace(/'/g, '"')),
  // sim: JSON.parse(data.sim.replace(/'/g, '"')),
  // wlan: JSON.parse(data.wlan.replace(/'/g, '"')),
})
