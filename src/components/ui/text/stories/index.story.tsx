import type { AstroRenderer } from '@storybook-astro/framework'
import type { ComponentAnnotations } from 'storybook/internal/types'
import { Text } from '@/components/ui'
import {
	TEXT_SIZES,
	TEXT_TAGS,
	TEXT_VARIANTS,
	TEXT_WEIGHTS,
	type TextAs,
	type TextSize,
	type TextWeight,
} from '@/components/ui/text/types'

export default {
	title: 'Components/UI/Text',
	component: Text,
	argTypes: {
		as: {
			control: { type: 'select' },
			options: TEXT_TAGS,
		},
		size: {
			control: { type: 'select' },
			options: Object.keys(TEXT_SIZES),
		},
		weight: {
			control: { type: 'select' },
			options: Object.keys(TEXT_WEIGHTS),
		},
		variant: {
			control: { type: 'select' },
			options: Object.keys(TEXT_VARIANTS),
		},
	},
}

type TextArgs = {
	as?: TextAs
	size?: TextSize
	weight?: TextWeight
	slots?: {
		default: string
	}
}

export const Heading1 = {
	args: {
		as: 'h1',
		size: '6xl',
		weight: 'bold',
		slots: {
			default: 'A quick brown fox jumps over the lazy dog',
		},
	},
} satisfies ComponentAnnotations<AstroRenderer, TextArgs>

export const Heading2 = {
	args: {
		as: 'h2',
		size: '5xl',
		weight: 'bold',
		slots: {
			default: 'A quick brown fox jumps over the lazy dog',
		},
	},
} satisfies ComponentAnnotations<AstroRenderer, TextArgs>

export const Paragraph = {
	args: {
		as: 'p',
		size: 'md',
		weight: 'normal',
		slots: {
			default: 'A quick brown fox jumps over the lazy dog',
		},
	},
} satisfies ComponentAnnotations<AstroRenderer, TextArgs>
