import { useState } from 'react'

export const ProductDescription = ({
  brand,
  model,
  ram,
  os,
  cpu,
  gpu,
  displaySize,
  displayResolution,
  battery,
  primaryCamera,
  secondaryCmera, // this property (with the typo) is coming like this from the API
  dimentions,
  weight,
  externalMemory
}) => {
  const [shouldShowFullDescription, setShouldShowFullDescription] = useState(false)

  return (
    <>
      <h3
        className="pt-2 pb-1"
        data-testid="productDescriptionTitle"
      >Specifications</h3>
      <ul data-testid="productDescriptionList">
        {brand && <li data-testid="productDescriptionList-brand"><strong>Brand:</strong> {brand}</li>}
        {model && <li data-testid="productDescriptionList-model"><strong>Model:</strong> {model}</li>}
        {ram && <li data-testid="productDescriptionList-ram"><strong>RAM:</strong> {ram}</li>}
        {os && <li data-testid="productDescriptionList-os"><strong>OS:</strong> {os}</li>}
        {shouldShowFullDescription && (
          <>
            {cpu && <li data-testid="productDescriptionList-cpu"><strong>CPU:</strong> {cpu}</li>}
            {gpu && <li data-testid="productDescriptionList-gpu"><strong>GPU:</strong> {gpu}</li>}
            {displaySize && <li data-testid="productDescriptionList-displaySize"><strong>Display size:</strong> {displaySize}</li>}
            {displayResolution && <li data-testid="productDescriptionList-displayResolution"><strong>Display resolution:</strong> {displayResolution}</li>}
            {battery && <li data-testid="productDescriptionList-battery"><strong>Battery:</strong> {battery}</li>}
            {primaryCamera && <li data-testid="productDescriptionList-primaryCamera"><strong>Primary camera:</strong> {Array.isArray(primaryCamera) ? primaryCamera.join(', ') : primaryCamera}</li>}
            {secondaryCmera && <li data-testid="productDescriptionList-secondaryCmera"><strong>Secondary camera:</strong> {Array.isArray(secondaryCmera) ? secondaryCmera.join(', ') : secondaryCmera}</li>}
            {dimentions && <li data-testid="productDescriptionList-dimentions"><strong>Device dimentions:</strong> {dimentions}</li>}
            {weight && <li data-testid="productDescriptionList-weight"><strong>Device weight:</strong> {weight} grams</li>}
            {externalMemory && <li data-testid="productDescriptionList-externalMemory"><strong>External memory:</strong> {externalMemory}</li>}
          </>
        )}
      </ul>
      <button
        onClick={() => setShouldShowFullDescription(v => !v)}
        className="mt-1 font-bold underline"
        data-testid="productDescriptionShowMoreButton"
      >
        {shouldShowFullDescription ? 'Show less' : 'Show more'}
      </button>
    </>
  )
}
