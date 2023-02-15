import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'
import { getProductDetails } from '../helpers'
import { NotFound } from './NotFound'

export const ProductDetailsPage = () => {
  const { productId } = useLoaderData()
  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchProductDetails = async () => {
    setIsLoading(true)
    const response = await getProductDetails(productId)

    try {
      setProductDetails(response.data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
    }
  }
  
  useEffect(() => {
    fetchProductDetails()
  }, [productId])
  
  if (isError) return <NotFound />
  if (isLoading) return <Loader />

  return (
    <Layout>
      <Link to="/products">{'< Back'}</Link>
      <h1>Product Details Page: {productId}</h1>
      {productDetails && (<span>{productDetails.brand}</span>)}
    </Layout>
  )
}
