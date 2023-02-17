import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Loader } from '../components/Loader'
import { ProductDescription } from '../components/ProductDescription'
import { ProductActions } from '../components/ProductActions'
import { getProductDetails } from '../helpers'
import { NotFound } from './NotFound'
import { ReactComponent as Arrow } from '../assets/svg/arrow_forward.svg'

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
  
  if (isError || !productDetails) return <NotFound />
  if (isLoading) return <Loader />

  return (
    <Layout className="px-2 pb-2">
      <Link to="/products" className="group w-fit mb-2 flex items-center relative">
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
          <ProductActions productId={productId} options={productDetails.options} />
        </div>
      </div>
    </Layout>
  )
}
