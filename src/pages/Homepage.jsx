import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

export const Homepage = () => {
  return (
    <Layout className="pt-6 px-2 flex flex-col justify-center items-center gap-3 text-center">
      <h2>Welcome to the <span className="text-primary-blue hover:text-primary-purple transition">Fabulous Ecommerce</span></h2>
      <Link
        to="/products"
        className="px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition"
      >
        See all our products
      </Link>
    </Layout>
  )
}
