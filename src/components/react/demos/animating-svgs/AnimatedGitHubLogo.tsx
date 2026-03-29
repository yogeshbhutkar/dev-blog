import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

const outlineVariants: Variants = {
	rest: { pathLength: 0 },
	hover: {
		pathLength: 1,
		transition: { duration: 2, ease: "easeInOut" },
	},
};

const tailVariants: Variants = {
	rest: { pathLength: 0, rotate: 0 },
	hover: {
		pathLength: 1,
		rotate: 15,
		transition: {
			pathLength: { duration: 0.5, delay: 2, ease: "easeInOut" },
			rotate: {
				delay: 2.5,
				repeat: Infinity,
				repeatType: "mirror",
				type: "spring",
				stiffness: 100,
				damping: 10,
			},
		},
	},
};

const hintVariants: Variants = {
	rest: { opacity: 1 },
	hover: { opacity: 0, transition: { duration: 0.2 } },
};

function AnimatedGitHubLogo() {
	const [isTouch, setIsTouch] = useState(false);

	useEffect(() => {
		// Detect if the device is touch-enabled to disable hover animations
		const mediaQuery = window.matchMedia("(hover: none)");
		setIsTouch(mediaQuery.matches);

		// Listen for changes in the media query to update the state if the device capabilities change
		const handleChange = (e: MediaQueryListEvent) => {
			setIsTouch(e.matches);
			return;
		};

		mediaQuery.addEventListener("change", handleChange);
		return () =>
			mediaQuery.removeEventListener("change", handleChange);
	}, []);

	return (
		<motion.div
			className="bg-muted/5 text-foreground relative flex h-56 w-full items-center justify-center rounded-lg"
			initial="rest"
			animate={isTouch ? "hover" : undefined}
			whileHover="hover"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="80"
				height="80"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="butt"
				strokeLinejoin="round"
				role="img"
			>
				<title>Github Logo</title>

				{/* Outline */}
				<motion.path
					d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
					variants={outlineVariants}
				></motion.path>

				{/* Tail */}
				<motion.path
					d="M9 18c-4.51 2-5-2-7-2"
					variants={tailVariants}
				></motion.path>
			</svg>

			{!isTouch && (
				<motion.span
					className="absolute bottom-2 rounded-md bg-white px-4 py-1 text-black"
					variants={hintVariants}
				>
					Hover me
				</motion.span>
			)}
		</motion.div>
	);
}

export default AnimatedGitHubLogo;
