import Image from 'next/image'
import { MANIFESTATION_CONTENT } from '@/app/(brand)/manifestation/manifestation.constants'

export default function ManifestationGallery() {
  const { images } = MANIFESTATION_CONTENT.gallery

  return (
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              width={600}
              height={400}
              className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-52 lg:h-60"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
