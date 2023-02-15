import { Header } from './Header'

export const Layout = ({ className, children }) => (
  <>
    <Header />
    <main className={className}>
      {children}
    </main>
  </>
)
