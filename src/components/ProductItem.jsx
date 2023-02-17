import { Link } from 'react-router-dom'

export const ProductItem = ({
  id,
  brand,
  model,
  imgUrl,
  price
}) => (
  <Link
    to={`/products/${id}`}
    className="h-full flex flex-col border border-secondary-black-darkWithOpacity rounded"
  >
    <img
      src={imgUrl}
      alt={`${brand} ${model}`}
      className="w-full max-w-20 md:max-w-auto mx-auto p-2"
    />
    <div className="h-full flex flex-col p-2 gap-1 justify-between">
      <p>
        {brand} {model}
      </p>
      <strong>{`$ ${price}`}</strong>
    </div>
    <button className="px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition">
      See details
    </button>
  </Link>
)
