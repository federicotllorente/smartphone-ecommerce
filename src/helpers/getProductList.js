const getCachedProductList = () => {
  const cachedProductList = localStorage.getItem('productList') ?? ''
  return cachedProductList ? JSON.parse(cachedProductList) : undefined
}

const setCachedProductList = (content) => {
  localStorage.setItem('productList', JSON.stringify(content))
}

export const getProductList = async () => {
  const cachedProductList = getCachedProductList()

  if (!cachedProductList || (cachedProductList && cachedProductList.expiringDate < Date.now())) {
    const data = await fetchProductListData()
    try {
      if (data) {
        setCachedProductList(data)
        return data
      }
    } catch (err) {
      console.error(err)
    }
  }

  return cachedProductList
}

const fetchProductListData = async () => {
  const response = await fetch(process.env.REACT_APP_API_PRODUCT)

  try {
    const data = await response.json()
    return {
      expiringDate: Date.now() + (1000 * 60 * 60),
      url: response.url,
      data: data.products
    }
  } catch (err) {
    console.error(err)
  }
}
