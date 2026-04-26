import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

function getSnapshot(): "light" | "dark" {
    return document.body.classList.contains("dark") ? "dark" : "light";
}

function getDefaultSnapshot(): "light" | "dark" {
    return "light";
}

export const useTheme = (): { theme: "light" | "dark" } => {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getDefaultSnapshot);
    return { theme };
};