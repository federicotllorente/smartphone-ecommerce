import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'
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

  if (isError) return <NotFound />
  if (isLoading) return <Loader />

  return (
    <Layout>
      <h1>Product List Page</h1>
      {productList.length > 0 && productList.map(item => (
        <Link key={item.id} to={`/products/${item.id}`}>
          <p>
            {item.brand} {item.model}
          </p>
        </Link>
      ))}
    </Layout>
  )
}
