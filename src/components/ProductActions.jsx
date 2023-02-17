import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as CartIcon } from '../assets/svg/shopping_cart.svg'
import { increaseCartQuantityInLocalStorage } from '../helpers'

export const ProductActions = ({ productId, options }) => {
  const [selectedOptions, setSelectedOptions] =  useState([])
  const [shouldShowTooltipInOptions, setShouldShowTooltipInOptions] = useState(false)

  useEffect(() => {
    const newSelectedOptions = []
    Object.keys(options).forEach(key => {
      options[key].length == 1
        ? newSelectedOptions.push({ name: key, code: options[key][0].code })
        : newSelectedOptions.push({ name: key })
    })
    setSelectedOptions(newSelectedOptions)
  }, [])

  const handleAddToCart = async () => {
    const selectedOptionsIsComplete = !selectedOptions.find(i => typeof i.code === 'undefined')
    if (!selectedOptionsIsComplete) return setShouldShowTooltipInOptions(true)

    const colorCode = selectedOptions.find(i => i.name === 'colors').code
    const storageCode = selectedOptions.find(i => i.name === 'storages').code

    if (!colorCode || !storageCode) return
    const res = await fetch('https://itx-frontend-test.onrender.com/api/cart', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: productId,
        colorCode,
        storageCode
      })
    }).then(data => data.json()).catch(err => console.error(err))

    if (res.count) {
      increaseCartQuantityInLocalStorage(res.count)
    }
  }

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

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        className="relative mt-2 px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition"
      >
        <CartIcon className="absolute left-0 -inset-y-0.5 scale-[0.4] fill-secondary-white" />
        <span className="pl-3.5">Add to cart</span>
      </button>
    </>
  )
}

const ProductOption = ({ title, values, selectedOptions, setSelectedOptions, shouldShowTooltip, className }) => {
  const selectedValue = useMemo(() => selectedOptions.find(i => i.name == title), [selectedOptions])

  return (
    <div className={className}>
      <div className="flex gap-1">
        <h3>{`${title.charAt(0).toUpperCase()}${title.slice(1)}`}</h3>
        {!selectedValue?.code && shouldShowTooltip && (
          <span className="px-1 py-0.5 text-xs bg-secondary-red text-secondary-white">Please select an option</span>
        )}
      </div>
      <div className="pt-1 flex gap-1">
        {values.map(value => (
          <button
            key={value.name}
            onClick={() => setSelectedOptions([...selectedOptions.filter(i => i.name !== title), { name: title, code: value.code }])}
            className={classNames(
              'px-1 py-0.5 border rounded hover:border-primary-blue-light hover:bg-primary-blue-light hover:text-secondary-black transition',
              {
                'border-secondary-black-darkWithOpacity text-secondary-black': selectedValue?.code != value.code,
                'border-secondary-black bg-secondary-black text-secondary-white': selectedValue?.code == value.code
              }
            )}
          >
            {value.name}
          </button>
        ))}
      </div>
    </div>
  )
}
