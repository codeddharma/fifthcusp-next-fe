import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantCls: Record<Variant, string> = {
  primary:
    'bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-700 shadow-lg shadow-purple-900/40',
  outline:
    'border border-purple-500 text-purple-400 hover:bg-purple-500/10 active:bg-purple-500/20',
  ghost: 'text-white/60 hover:text-white hover:bg-white/5',
}

const sizeCls: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variantCls[variant],
        sizeCls[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
