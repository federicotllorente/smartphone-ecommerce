import classNames from 'classnames'
import { Header } from './Header'

export const Layout = ({ className, children }) => (
  <>
    <Header />
    <main className={classNames('md:container md:mx-auto', className)}>
      {children}
    </main>
  </>
)
