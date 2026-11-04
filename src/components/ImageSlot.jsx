import { useState } from 'react'

export default function ImageSlot({ src = '', alt, label, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return <div className={`image-slot ${className}`} role="img" aria-label={`${label} image placeholder`}><span>IMAGE SLOT</span><strong>{label}</strong><small>Add an image in public/images/ and pass its path here.</small></div>
  return <div className={`image-slot image-slot--filled ${className}`}><img src={src} alt={alt || label} onError={() => setFailed(true)} /></div>
}
