import { useCallback, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'
import { ProductItem } from '../components/ProductItem'
import { Searchbar } from '../components/Searchbar'
import { getProductList } from '../helpers'
import { NotFound } from './NotFound'

export const ProductListPage = () => {
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [searchInput, setSearchInput] = useState(null)
  const [filteredProductList, setFilteredProductList] = useState([])

  const fetchProductList = async () => {
    setIsLoading(true)
    const response = await getProductList()

    try {
      setProductList(response.data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
    }
  }
  
  useEffect(() => {
    fetchProductList()
  }, [])

  const handleSearchBarOnChange = useCallback(e => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }, [setSearchInput])

  const handleSearchBarOnSubmit = useCallback(e => {
    e.preventDefault()
    setSearchInput(e.target[0].value)
  }, [setSearchInput])

  useEffect(() => {
    if (searchInput) {
      setIsLoading(true)

      const newFilteredProductList = productList.filter(({ brand, model }) =>
        brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        model.toLowerCase().includes(searchInput.toLowerCase()) ||
        `${brand} ${model}`.toLowerCase().includes(searchInput.toLowerCase()) ||
        `${model} ${brand}`.toLowerCase().includes(searchInput.toLowerCase())
      )

      setFilteredProductList(newFilteredProductList)
      setIsLoading(false)
    } else {
      setFilteredProductList([])
    }
  }, [searchInput])

  if (isError) return <NotFound />
  if (isLoading) return <Loader />

  return (
    <Layout>
      <div className="p-2 flex flex-col md:flex-row-reverse justify-between gap-3">
        <Searchbar
          handleSearchBarOnChange={handleSearchBarOnChange}
          handleSearchBarOnSubmit={handleSearchBarOnSubmit}
        />
        <h2 className="text-center">All our products</h2>
      </div>
      <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
        {searchInput
          ? filteredProductList.length > 0 && filteredProductList.map(item => (
            <ProductItem key={item.id} {...item} />
          ))
          : productList.length > 0 && productList.map(item => (
            <ProductItem key={item.id} {...item} />
          ))
        }
      </div>
    </Layout>
  )
}
