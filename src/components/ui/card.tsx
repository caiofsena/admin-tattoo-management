import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type CardProps = HTMLAttributes<HTMLElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <section
      className={cn('rounded-xl border border-zinc-800 bg-zinc-900/60 p-5', className)}
      {...props}
    />
  )
}
