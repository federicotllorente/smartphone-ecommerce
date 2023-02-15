import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../helpers/useBreakpoint'
import { ReactComponent as MenuIcon } from '../assets/svg/menu.svg'

export const Header = () => {
  const breakpoint = useBreakpoint()
  const isMobile = useMemo(() => breakpoint === 'xs' || breakpoint === 'sm', [breakpoint])

  return (
    <section className="flex">
      {isMobile && (
        <MenuIcon />
      )}
      <Link to="/">
        <h2>FabulousEcommerce</h2>
      </Link>
      <div>
        <Link to="/products">
          All products
        </Link>
      </div>
    </section>
  )
}
