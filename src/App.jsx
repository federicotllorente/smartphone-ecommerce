import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Homepage } from './pages/Homepage'
import { NotFound } from './pages/NotFound'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { ProductListPage } from './pages/ProductListPage'

import { CartContext, getCartInLocalStorage } from './helpers'

const App = () => {
  const [cart, setCart] = useState([])

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

  useEffect(() => {
    // Set context with data in the local storage
    const cartToSet = getCartInLocalStorage()
    if (Array.isArray(cartToSet) && cartToSet.length)
      setCart(cartToSet)
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  )
}

export default App
