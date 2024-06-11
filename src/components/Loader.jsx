import classNames from 'classnames'

export const Loader = ({ isMinified = false, color = 'blue' }) => (
  <span
    className={classNames(
      'mx-auto flex rounded-full border-4 border-t-transparent animate-spin',
      {
        'border-primary-blue': color === 'blue',
        'border-secondary-white-light': color === 'white',
        'mt-8 w-4 h-4': !isMinified,
        'w-3 h-3': isMinified
      }
    )}
    data-testid="loader"
  ></span>
)
