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
      <h3 className="pt-2 pb-1">Specifications</h3>
      <ul>
        <li><strong>Brand:</strong> {brand}</li>
        <li><strong>Model:</strong> {model}</li>
        {ram && <li><strong>RAM:</strong> {ram}</li>}
        {os && <li><strong>OS:</strong> {os}</li>}
        {shouldShowFullDescription && (
          <>
            {cpu && <li><strong>CPU:</strong> {cpu}</li>}
            {gpu && <li><strong>GPU:</strong> {gpu}</li>}
            {displaySize && <li><strong>Display size:</strong> {displaySize}</li>}
            {displayResolution && <li><strong>Display resolution:</strong> {displayResolution}</li>}
            {battery && <li><strong>Battery:</strong> {battery}</li>}
            {primaryCamera && <li><strong>Primary camera:</strong> {Array.isArray(primaryCamera) ? primaryCamera.join(', ') : primaryCamera}</li>}
            {secondaryCmera && <li><strong>Secondary camera:</strong> {Array.isArray(secondaryCmera) ? secondaryCmera.join(', ') : secondaryCmera}</li>}
            {dimentions && <li><strong>Device dimentions:</strong> {dimentions}</li>}
            {weight && <li><strong>Device weight:</strong> {weight} grams</li>}
            {externalMemory && <li><strong>External memory:</strong> {externalMemory}</li>}
          </>
        )}
      </ul>
      <button
        onClick={() => setShouldShowFullDescription(v => !v)}
        className="mt-1 font-bold underline"
      >
        {shouldShowFullDescription ? 'Show less' : 'Show more'}
      </button>
    </>
  )
}
