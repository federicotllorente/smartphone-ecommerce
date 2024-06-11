import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'

import { addToCart, CartContext } from '../helpers'

import { ReactComponent as CartIcon } from '../assets/svg/shopping_cart.svg'

import { ProductOption } from './ProductOption'
import { QuantityButton } from './QuantityButton'
import { Loader } from './Loader'

export const ProductActions = ({ product }) => {
  const [selectedOptions, setSelectedOptions] =  useState([])
  // const [selectedOptionInCart, setSelectedOptionInCart] =  useState(null)
  const [selectedOptionsIsComplete, setSelectedOptionsIsComplete] = useState(false)
  const [shouldShowTooltipInOptions, setShouldShowTooltipInOptions] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { options } = product

  const [isLoading, setIsLoading] = useState(false)

  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    // const colorCode = selectedOptions?.find(i => i.name === 'colors')?.code
    // const storageCode = selectedOptions?.find(i => i.name === 'storages')?.code

    // const itemInCart = cart.find(el => {
    //   return el.id === productId && el.color === colorCode && el.storage === storageCode

    //   // if (colorCode && storageCode)
    //   //   return el.id === productId && el.color === colorCode && el.storage === storageCode
      
    //   // if (colorCode && !storageCode)
    //   //   return el.id === productId && el.color === colorCode

    //   // if (!colorCode && storageCode)
    //   //   return el.id === productId && el.storage === storageCode
      
    //   // return el.id === productId
    // })

    // setSelectedOptionInCart(itemInCart)

    // Set if selected options is complete
    const selectedOptionsIsCompleteToSet = !selectedOptions.find(i => typeof i.code === 'undefined')
    setSelectedOptionsIsComplete(selectedOptionsIsCompleteToSet)
  }, [selectedOptions])

  useEffect(() => {
    if (!options) return

    const newSelectedOptions = []
    Object.keys(options).forEach(key => {
      options[key].length == 1
        ? newSelectedOptions.push({ name: key, code: options[key][0].code })
        : newSelectedOptions.push({ name: key })
    })

    setSelectedOptions(newSelectedOptions)
  }, [])

  const handleAddToCart = async () => {
    if (!selectedOptionsIsComplete)
      return setShouldShowTooltipInOptions(true)

    setIsLoading(true)

    const colorCode = selectedOptions.find(i => i.name === 'colors').code
    const storageCode = selectedOptions.find(i => i.name === 'storages').code

    if (!colorCode || !storageCode) return
    
    const cartToSet = await addToCart({
      product: {
        id: product.id,
        details: {
          ...product,
          id: undefined
        },
        color: colorCode,
        storage: storageCode
      },
      quantity
    })

    if (cartToSet) setCart(cartToSet)

    setIsLoading(false)
  }

  // const handleDecreaseQuantity = () => {}
  // const handleIncreaseQuantity = () => {}

  if (!options || Object.keys(options).length == 0) return null
  return (
    <>
      {/* OPTIONS */}
      {Object.keys(options).map((option, idx, array) => (
        <ProductOption
          key={option}
          title={option}
          values={options[option]}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          shouldShowTooltip={shouldShowTooltipInOptions}
          className={classNames({ 'pb-2': idx != array.length - 1 })}
        />
      ))}

      <div className="flex mt-2 gap-1 items-center">
        {/* QUANTITY BUTTON */}
        <div className="max-w-1/2">
          <QuantityButton
            // quantity={selectedOptionInCart?.quantity ?? 1}
            quantity={quantity}
            // onDecrease={handleDecreaseQuantity}
            // onIncrease={handleIncreaseQuantity}
            onDecrease={() => quantity > 1 && setQuantity(quantity - 1)}
            onIncrease={() => quantity < 10 && setQuantity(quantity + 1)}
            isDecreaseDisabled={quantity == 1}
            isIncreaseDisabled={quantity == 10}
          />
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className={classNames(
            'relative px-2 py-1 bg-primary-blue text-secondary-white font-bold transition',
            {
              'cursor-not-allowed': !selectedOptionsIsComplete,
              'opacity-50': !selectedOptionsIsComplete && !isLoading,
              'hover:bg-primary-purple': selectedOptionsIsComplete && !isLoading
            }
          )}
          data-testid="addToCartButton"
          disabled={!selectedOptionsIsComplete || isLoading}
        >
          {isLoading ? (
            <div className="w-[113px] h-[24px]">
              <Loader isMinified color="white" />
            </div>
          ) : (
            <>
              <CartIcon className="absolute left-0 -inset-y-0.5 scale-[0.4] fill-secondary-white" />
              <span className="pl-3.5">
                Add to cart
              </span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
