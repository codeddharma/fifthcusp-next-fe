import Link from 'next/link'

interface CTAButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  className?: string
}

export default function CTAButton({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-block px-6 py-3 text-sm font-semibold tracking-widest transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-white/90'
      : 'border border-white text-white hover:bg-white hover:text-black'

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {label}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {label}
    </button>
  )
}
