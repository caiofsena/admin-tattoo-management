import type { HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const badgeVariants = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
  variants: {
    status: {
      success: 'bg-emerald-500/15 text-emerald-300',
      warning: 'bg-amber-500/15 text-amber-300',
      danger: 'bg-rose-500/15 text-rose-300',
      neutral: 'bg-zinc-700/60 text-zinc-200',
    },
  },
  defaultVariants: {
    status: 'neutral',
  },
})

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export function Badge({ className, status, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ status }), className)} {...props} />
}
