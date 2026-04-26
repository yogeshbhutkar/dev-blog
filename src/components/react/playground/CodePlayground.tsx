import {
	SandpackCodeEditor,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
	getSandpackCssText,
} from "@codesandbox/sandpack-react";
import { atomDark, aquaBlue } from "@codesandbox/sandpack-themes";
import { useEffect, useLayoutEffect, useState } from "react";
import PlayIcon from "@/components/react/playground/PlayIcon";
import { useTheme } from "@/components/react/hooks/use-theme";

type SandpackTemplate = React.ComponentProps<
	typeof SandpackProvider
>["template"];

/**
 * Injects Sandpack styles into the document head. This is necessary to ensure that the styles are
 * applied correctly when the component is rendered, especially in environments where styles may not
 * be automatically injected (e.g., Astro).
 */
function injectSandpackStyles() {
	// Remove any stale stitches styles
	const existingStyle = document.getElementById("sandpack-styles");
	if (existingStyle) existingStyle.remove();
	document
		.querySelectorAll("style[data-s]")
		.forEach((el) => el.remove());

	// Inject fresh styles
	const style = document.createElement("style");
	style.id = "sandpack-styles";
	style.textContent = getSandpackCssText();
	document.head.appendChild(style);
}

export default function CodePlayground({
	files,
	template,
	dependencies,
}: {
	files: Record<string, string>;
	template: SandpackTemplate;
	dependencies?: Record<string, string>;
}) {
	const [isActive, setIsActive] = useState(false);
	const [mountKey, setMountKey] = useState(0);
	const { theme } = useTheme();

	/**
	 * Listen for the "astro:before-swap" event to deactivate the playground
	 * before Astro performs a page swap. This ensures that the component is
	 * properly unmounted.
	 */
	useEffect(() => {
		const handleBeforeSwap = () => {
			setIsActive(false);
			setMountKey((key) => key + 1);
		};

		document.addEventListener("astro:before-swap", handleBeforeSwap);
		return () =>
			document.removeEventListener(
				"astro:before-swap",
				handleBeforeSwap,
			);
	}, []);

	useLayoutEffect(() => {
		if (isActive) {
			injectSandpackStyles();
		}
	}, [isActive]);

	if (isActive) {
		return (
			<SandpackProvider
				key={mountKey}
				files={files}
				theme={theme === "dark" ?  atomDark : aquaBlue}
				template={template}
				customSetup={{ dependencies }}
			>
				<SandpackLayout
					style={{
						borderRadius: "8px",
						borderColor: "var(--color-border)",
					}}
				>
					<SandpackCodeEditor
						style={{ height: "25rem" }}
						closableTabs
						showTabs
					/>
					<SandpackPreview style={{ height: "25rem" }} />
				</SandpackLayout>
			</SandpackProvider>
		);
	}

	return (
		<div className="border-border bg-muted/5 flex min-h-100 items-center justify-center rounded-md border">
			<button
				className="bg-background text-muted hover:bg-muted/10 border-border group flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 text-center text-sm hover:border-blue-400 dark:hover:border-blue-300"
				onClick={() => {
					setIsActive((prev) => !prev);
					setMountKey((key) => key + 1);
				}}
			>
				<PlayIcon
					className="mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-300"
					width={36}
					height={36}
				/>
				<span className="font-medium">
					Launch interactive code playground
				</span>
				<span className="text-xs">
					Edit code and see live preview
				</span>
			</button>
		</div>
	);
}
