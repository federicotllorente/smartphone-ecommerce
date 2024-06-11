import { useEffect, useState } from 'react'

import { Loader } from './Loader'
import { ProductDescription } from './ProductDescription'
import { ProductActions } from './ProductActions'

import { getProductDetails } from '../helpers'
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg'

export const ProductItemModal = ({
  productId,
  onClose
}) => {
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
    fetchProductDetails()
  }, [productId])

  if (isError || !productDetails) return null

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#000] opacity-70" onClick={onClose}></div>
      <div className="fixed w-screen md:container top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {isLoading ? (
          <Loader />
        ) : (
          // TODO This should be a component
          <div className="relative max-h-modal md:max-h-modal-md flex flex-col mt-[96px] md:mt-[112px] mx-6 mb-6 p-6 md:flex-row gap-2 bg-secondary-white-light overflow-y-scroll">
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
            <span className="absolute top-3 right-3">
              <button
                className="relative w-[24px] h-[24px]"
                onClick={onClose}
              >
                <CloseIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.5]" />
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  )
}
