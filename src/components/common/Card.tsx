import { ElementType, ComponentPropsWithoutRef } from 'react'

type CardProps<T extends ElementType = 'div'> = {
  as?: T
  hover?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'hover' | 'className'>

export default function Card<T extends ElementType = 'div'>({
  as,
  hover = false,
  className = '',
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      className={[
        'cosmic-glass rounded-[20px]',
        hover &&
          'transition duration-300 hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-(--shadow-card-hover)',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}
