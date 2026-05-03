export const TEXT_WEIGHTS = {
	light: 'font-light',
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	black: 'font-black',
} as const

export const TEXT_SIZES = {
	'6xl': 'text-6xl',
	'5xl': 'text-5xl',
	'4xl': 'text-4xl',
	'3xl': 'text-3xl',
	'2xl': 'text-2xl',
	xl: 'text-xl',
	lg: 'text-lg',
	md: 'text-md',
	sm: 'text-sm',
	xs: 'text-xs',
} as const

export const TEXT_TAGS = [
	'p',
	'span',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
] as const

export const TEXT_VARIANTS = {
	unstyled: '',
	default: 'text-foreground',
	muted: 'text-muted',
} as const

export type TextWeight = keyof typeof TEXT_WEIGHTS
export type TextSize = keyof typeof TEXT_SIZES
export type TextAs = (typeof TEXT_TAGS)[number]
export type TextVariant = keyof typeof TEXT_VARIANTS
