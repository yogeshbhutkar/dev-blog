import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect } from "react";

export default function GitHubCalendarWrapper({
	username,
}: {
	username: string;
}) {
	const [colorScheme, setColorScheme] = useState<"light" | "dark">(
		() => {
			return (
				(localStorage.getItem("theme") as "light" | "dark") ??
				"light"
			);
		},
	);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setColorScheme(
				document.body.classList.contains("dark")
					? "dark"
					: "light",
			);
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<GitHubCalendar
			username={username}
			colorScheme={colorScheme}
			className="mt-6"
			theme={{
				light: [
					"oklch(97.7% 0.013 236.62)",
					"oklch(50% 0.134 242.749)",
				],
				dark: [
					"oklch(29.3% 0.066 243.157)",
					"oklch(90.1% 0.058 230.902)",
				],
			}}
		/>
	);
}
