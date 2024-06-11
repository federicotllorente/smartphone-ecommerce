import classNames from 'classnames'
import { Loader } from './Loader'

export const QuantityButton = ({
  quantity,
  onDecrease,
  onIncrease,
  isDecreaseDisabled,
  isIncreaseDisabled,
  noBorderBottom,
  isLoading = false
}) => {
  if (!quantity) return null

  return (
    <div className="w-full grid grid-cols-3">
      <button
        className={classNames(
          'px-2 py-1 bg-primary-blue text-secondary-white font-bold transition',
          {
            'cursor-not-allowed opacity-50': isDecreaseDisabled || isLoading,
            'hover:bg-primary-purple': !isDecreaseDisabled && !isLoading
          }
        )}
        data-testid="productQuantityButtonDecrease"
        onClick={onDecrease}
        disabled={isDecreaseDisabled || isLoading}
      >
        -
      </button>
      
      <div
        className={classNames(
          'flex justify-center items-center text-center border-secondary-black-darkWithOpacity',
          {
            'border-y': !noBorderBottom,
            'border-t': noBorderBottom,
            'cursor-not-allowed': isLoading,
          }
        )}
      >
        {isLoading ? (
          <Loader isMinified />
        ) : quantity}
      </div>

      <button
        className={classNames(
          'px-2 py-1 bg-primary-blue text-secondary-white font-bold transition',
          {
            'cursor-not-allowed opacity-50': isIncreaseDisabled || isLoading,
            'hover:bg-primary-purple': !isIncreaseDisabled && !isLoading
          }
        )}
        data-testid="productQuantityButtonIncrease"
        onClick={onIncrease}
        disabled={isIncreaseDisabled || isLoading}
      >
        +
      </button>
    </div>
  )
}
