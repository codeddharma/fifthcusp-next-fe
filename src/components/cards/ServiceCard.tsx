import Image from 'next/image'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  href: string
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-black border border-white/10 hover:border-white/30 transition-colors overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-base font-semibold tracking-wide text-white">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
        <span className="mt-2 text-xs tracking-widest text-white/40 group-hover:text-white transition-colors">
          EXPLORE →
        </span>
      </div>
    </Link>
  )
}
