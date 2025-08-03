import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")],
	daisyui: {
		themes: [
			{
				hotel: {
					"primary": "#2563eb",
					"primary-focus": "#1d4ed8",
					"primary-content": "#ffffff",
					"secondary": "#64748b",
					"secondary-focus": "#475569",
					"secondary-content": "#ffffff",
					"accent": "#f59e0b",
					"accent-focus": "#d97706",
					"accent-content": "#ffffff",
					"neutral": "#374151",
					"neutral-focus": "#1f2937",
					"neutral-content": "#ffffff",
					"base-100": "#ffffff",
					"base-200": "#f8fafc",
					"base-300": "#e2e8f0",
					"base-content": "#1e293b",
					"info": "#0ea5e9",
					"success": "#10b981",
					"warning": "#f59e0b",
					"error": "#ef4444",
				},
			},
			{
				"hotel-dark": {
					"primary": "#3b82f6",
					"primary-focus": "#2563eb",
					"primary-content": "#ffffff",
					"secondary": "#64748b",
					"secondary-focus": "#475569",
					"secondary-content": "#ffffff",
					"accent": "#f59e0b",
					"accent-focus": "#d97706",
					"accent-content": "#ffffff",
					"neutral": "#6b7280",
					"neutral-focus": "#4b5563",
					"neutral-content": "#ffffff",
					"base-100": "#1f2937",
					"base-200": "#111827",
					"base-300": "#374151",
					"base-content": "#f9fafb",
					"info": "#0ea5e9",
					"success": "#10b981",
					"warning": "#f59e0b",
					"error": "#ef4444",
				},
			},
		],
	},
} satisfies Config;
