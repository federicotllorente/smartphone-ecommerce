import classNames from 'classnames'

export const QuantityButton = ({
  quantity,
  onDecrease,
  onIncrease,
  isDecreaseDisabled,
  isIncreaseDisabled,
  noBorderBottom
}) => {
  if (!quantity) return null

  return (
    <div className="w-full grid grid-cols-3">
      <button
        className={classNames(
          'px-2 py-1 bg-primary-blue text-secondary-white font-bold transition',
          {
            'cursor-not-allowed opacity-50': isDecreaseDisabled,
            'hover:bg-primary-purple': !isDecreaseDisabled
          }
        )}
        data-testid="productQuantityButtonDecrease"
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
      >
        -
      </button>
      
      <div
        className={classNames(
          'flex justify-center items-center text-center border-secondary-black-darkWithOpacity',
          {
            'border-y': !noBorderBottom,
            'border-t': noBorderBottom
          }
        )}
      >
        {quantity}
      </div>

      <button
        className={classNames(
          'px-2 py-1 bg-primary-blue text-secondary-white font-bold transition',
          {
            'cursor-not-allowed opacity-50': isIncreaseDisabled,
            'hover:bg-primary-purple': !isIncreaseDisabled
          }
        )}
        data-testid="productQuantityButtonIncrease"
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
      >
        +
      </button>
    </div>
  )
}
