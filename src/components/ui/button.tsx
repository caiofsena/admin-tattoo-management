import type { ButtonHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/utils'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300/70 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-violet-500 text-white hover:bg-violet-400',
      secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
      ghost: 'text-zinc-200 hover:bg-zinc-800',
      danger: 'bg-rose-500 text-white hover:bg-rose-400',
      info: 'bg-indigo-500 text-white hover:bg-indigo-400',
      light: 'bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-100',
    },
    size: {
      sm: 'h-8 px-3',
      md: 'h-10 px-4',
      lg: 'h-11 px-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
