import { react } from '@storybook-astro/framework/integrations'
import tailwindcss from '@tailwindcss/vite'
import type { ViteUserConfig } from 'astro'

export default {
	stories: ['../src/**/*.story.@(js|jsx|ts|tsx)'],
	staticDirs: ['../public'],
	framework: {
		name: '@storybook-astro/framework',
		options: {
			integrations: [react({ include: ['**/react/**'] })],
		},
	},
	async viteFinal(config: ViteUserConfig) {
		config.plugins = config.plugins || []
		config.plugins.push(tailwindcss())
		return config
	},
}
