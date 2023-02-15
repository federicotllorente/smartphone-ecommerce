import { Link } from 'react-router-dom'

export const ProductItem = ({
  id,
  brand,
  model,
  imgUrl,
  price
}) => (
  <div className="h-full flex flex-col border border-secondary-black-darkWithOpacity rounded">
    <Link
      to={`/products/${id}`}
      className="p-2 h-full flex flex-col gap-2"
    >
      <img
        src={imgUrl}
        alt={`${brand} ${model}`}
        className="w-full max-w-20 md:max-w-auto mx-auto"
      />
      <div className="h-full flex flex-col gap-1 justify-between">
        <p>
          {brand} {model}
        </p>
        <strong>{`$ ${price}`}</strong>
      </div>
    </Link>
    <button
      onClick={() => alert(`${id} was added to the cart`)}
      className="px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition"
    >
      Add to cart
    </button>
  </div>
)
