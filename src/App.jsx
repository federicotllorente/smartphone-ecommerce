import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartContext } from './helpers/CartContext'
import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/NotFound'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { ProductListPage } from './pages/ProductListPage'

const App = () => {
  const [cartQuantity, setCartQuantity] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
      errorElement: <NotFound />
    },
    {
      path: 'products',
      element: <ProductListPage />,
      errorElement: <NotFound />
    },
    {
      path: 'products/:productId',
      element: <ProductDetailsPage />,
      errorElement: <NotFound />,
      loader: async ({ params }) => {
        if (!params.productId) throw new Error
        return { productId: params.productId }
      }
    }
  ])

  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App
