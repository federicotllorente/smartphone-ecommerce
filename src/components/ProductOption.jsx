import { useMemo } from 'react'
import classNames from 'classnames'

export const ProductOption = ({ title, values, selectedOptions, setSelectedOptions, shouldShowTooltip, className }) => {
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
