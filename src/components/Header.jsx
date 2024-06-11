import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import {
  CartContext,
  useBreakpoint
} from '../helpers'

import { ReactComponent as CartIcon } from '../assets/svg/shopping_cart.svg'
import { ReactComponent as MenuIcon } from '../assets/svg/menu.svg'

import { CartModal } from './CartModal'

export const Header = () => {
  const { breakpoint } = useBreakpoint()
  const isMobile = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [breakpoint])
  
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false)
  
  const { cart } = useContext(CartContext)

  const cartQuantity = useMemo(() =>
    cart.reduce((total, item) => total + item.quantity, 0),
  [cart]
  )

  useEffect(() => {
    setMenuIsOpen(false)
    setCartModalIsOpen(false)
  }, [])

  return (
    <>
      <section
        className="fixed z-2 w-full bg-primary-blue text-secondary-white"
        data-testid="header"
      >
        <div className="relative md:p-2 flex justify-between md:justify-start items-center md:gap-2 md:container md:mx-auto">
          <div className="md:w-full flex items-center md:justify-between">
            {isMobile && (
              <button onClick={() => setMenuIsOpen(v => !v)}>
                <MenuIcon className="scale-50 fill-secondary-white" />
              </button>
            )}
            <Link to="/">
              <h2
                className="text-md"
                data-testid="logo"
              >
                FabulousEcommerce
              </h2>
            </Link>
            {(!isMobile || menuIsOpen) && (
              <div
                className={classNames({
                  'w-full h-full mt-6 flex flex-col fixed top-0 z-2 bg-secondary-white text-secondary-black': isMobile
                })}
                data-testid="menu"
              >
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
          <button
            className="relative w-5 h-5 mr-1 -my-1 transition md:hover:bg-secondary-white md:hover:bg-opacity-30 rounded-full"
            onClick={() => setCartModalIsOpen(true)}
          >
            <CartIcon
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.5] fill-secondary-white"
              data-testid="cartIcon"
            />

            {cartQuantity ? (
              <span className="absolute z-3 w-[18px] h-[18px] -top-0.5 -right-0.5 bg-secondary-black rounded-full text-xxs leading-normal">
                {cartQuantity}
              </span>
            ) : null}
          </button>
        </div>
      </section>

      {cartModalIsOpen && (
        <CartModal onClose={() => setCartModalIsOpen(false)} />
      )}
    </>
  )
}
