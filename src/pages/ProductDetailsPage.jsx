import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'
import { ProductDescription } from '../components/ProductDescription'
import { ProductActions } from '../components/ProductActions'
import { ProductItem } from '../components/ProductItem'

import { getProductDetails, getProductList } from '../helpers'
import { NotFound } from './NotFound'
import { ReactComponent as Arrow } from '../assets/svg/arrow_forward.svg'

export const ProductDetailsPage = () => {
  const { productId } = useLoaderData()

  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchProductDetails = async () => {
    setIsLoading(true)
    setIsError(false)
    
    try {
      const response = await getProductDetails(productId)
      if (!response.data) throw new Error
      setProductDetails(response.data)
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delay = Math.floor(Math.random() * (1500 - 200 + 1)) + 400
    setIsLoading(true)
    setTimeout(() => {
      // setIsLoading(false)
      fetchProductDetails()
    }, delay)
  }, [productId])

  if (isLoading) return <Layout><Loader /></Layout>
  if (isError || !productDetails) return <NotFound />

  return (
    <Layout className="flex flex-col px-2 pb-2 gap-4">
      <Link to="/products" className="group w-fit flex items-center relative">
        <Arrow className="absolute -left-2 scale-[0.3] rotate-180 group-hover:fill-primary-blue transition" />
        <span className="pl-3 group-hover:text-primary-blue transition">Back</span>
      </Link>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/2 flex flex-col gap-2">
          <h2>{productDetails.brand} {productDetails.model}</h2>
          <img
            src={productDetails.imgUrl}
            alt={`${productDetails.brand} ${productDetails.model}`}
            className="w-full max-w-20 md:max-w-auto mx-auto"
          />
        </div>
        <div className="md:w-1/2">
          <span className="text-lg font-bold">$ {productDetails.price}</span>
          <ProductDescription {...productDetails} />
          <hr className="my-2 border-secondary-black opacity-20" />
          <ProductActions product={productDetails} />
        </div>
      </div>

      <RecommendationGrid productId={productId} />
    </Layout>
  )
}

// TODO
const RecommendationGrid = ({ productId }) => {
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  /* Temporary */
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
  
  if (isError || !productList.length) return null
  if (isLoading) return <Loader />
  
  return (
    <div>
      <h3 className="pb-2">Recommended products</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
        {productList.filter(p => p.id !== productId).slice(0, 8).map(item => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
