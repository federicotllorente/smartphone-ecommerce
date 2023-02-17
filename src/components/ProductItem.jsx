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
    data-testid="productItem"
  >
    <img
      src={imgUrl}
      alt={`${brand} ${model}`}
      className="w-full max-w-20 md:max-w-auto mx-auto p-2"
      data-testid="productItemImage"
    />
    <div className="h-full flex flex-col p-2 gap-1 justify-between" >
      <p data-testid="productItemTitle">
        {brand} {model}
      </p>
      <strong data-testid="productItemPrice">{`$ ${price}`}</strong>
    </div>
    <button
      className="px-2 py-1 bg-primary-blue text-secondary-white font-bold hover:bg-primary-purple transition"
      data-testid="productItemSeeDetailsButton"
    >
      See details
    </button>
  </Link>
)
