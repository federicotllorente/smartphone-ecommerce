import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useBreakpoint } from '../helpers/useBreakpoint'
import { ReactComponent as MenuIcon } from '../assets/svg/menu.svg'
import { ReactComponent as CartIcon } from '../assets/svg/shopping_cart.svg'
import { getCartQuantityInLocalStorage } from '../helpers'
import { CartContext } from '../helpers/CartContext'

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const breakpoint = useBreakpoint()
  const isMobile = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [breakpoint])

  const { cartQuantity, setCartQuantity } = useContext(CartContext)

  useEffect(() => {
    // Close when navigating
    setMenuIsOpen(false)

    // Set context with data in the local storage
    const cartQuantityInLocalStorage = getCartQuantityInLocalStorage()
    setCartQuantity(cartQuantityInLocalStorage)
  }, [])

  return (
    <section className="fixed z-2 w-full bg-primary-blue text-secondary-white">
      <div className="relative md:p-2 flex justify-between md:justify-start items-center md:gap-2 md:container md:mx-auto">
        <div className="md:w-full flex items-center md:justify-between">
          {isMobile && (
            <button onClick={() => setMenuIsOpen(v => !v)}>
              <MenuIcon className="scale-50 fill-secondary-white" />
            </button>
          )}
          <Link to="/">
            <h2 className="text-md">FabulousEcommerce</h2>
          </Link>
          {(!isMobile || menuIsOpen) && (
            <div className={classNames({
              'w-full h-full mt-6 flex flex-col fixed top-0 z-2 bg-secondary-white text-secondary-black': isMobile
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
        <button className="relative w-4 h-4 mr-1">
          <CartIcon className="absolute -inset-1 scale-[0.5] fill-secondary-white" />
          {cartQuantity ? (
            <span className="absolute z-3 w-[18px] h-[18px] -top-0.5 -right-0.5 bg-secondary-black rounded-full text-xxs leading-normal">
              {cartQuantity}
            </span>
          ) : null}
        </button>
      </div>
    </section>
  )
}
