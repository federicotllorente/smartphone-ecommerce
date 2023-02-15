import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductList } from '../helpers'
import { NotFound } from './NotFound'

export const ProductListPage = () => {
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

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

  // TODO
  if (isError) return <NotFound />
  // TODO
  if (isLoading) return (
    <span className="mt-8 mx-auto flex w-4 h-4 rounded-full border-4 border-primary-blue border-t-transparent animate-spin"></span>
  )

  return (
    <div>
      <h1>Product List Page</h1>
      {productList.length > 0 && productList.map(item => (
        <Link key={item.id} to={`/products/${item.id}`}>
          <p>
            {item.brand} {item.model}
          </p>
        </Link>
      ))}
    </div>
  )
}
