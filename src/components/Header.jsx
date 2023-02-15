import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useBreakpoint } from '../helpers/useBreakpoint'
import { ReactComponent as MenuIcon } from '../assets/svg/menu.svg'

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const breakpoint = useBreakpoint()
  const isMobile = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [breakpoint])

  return (
    <section className="w-full bg-primary-blue text-secondary-white">
      <div className="md:p-2 flex items-center md:justify-between relative md:container md:mx-auto">
        {isMobile && (
          <button onClick={() => setMenuIsOpen(v => !v)}>
            <MenuIcon className="scale-50" />
          </button>
        )}
        <Link to="/">
          <h2 className="text-md">FabulousEcommerce</h2>
        </Link>
        {(!isMobile || menuIsOpen) && (
          <div className={classNames({
            'w-full h-full mt-6 flex flex-col fixed top-0 z-2 bg-secondary-white': isMobile
          })}>
            <Link
              to="/products"
              className={classNames({
                'p-2 border-b border-secondary-black-darkWithOpacity': isMobile
              })}
            >
              All products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
