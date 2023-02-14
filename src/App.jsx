import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// TODO
const Home = () => (
  <div>
    Homepage
  </div>
)

// TODO
const NotFound = () => (
  <div>
    Not Found Page
  </div>
)

// TODO
const ProductListPage = () => (
  <div>
    Product List Page
  </div>
)

// TODO
const ProductDetailsPage = () => (
  <div>
    Product Details Page
  </div>
)

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
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
    <RouterProvider router={router} />
  )
}

export default App
