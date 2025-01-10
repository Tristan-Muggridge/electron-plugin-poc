import React from "react";

const sdk = window.SDK;

// This function will load all extensions dynamically
export default async function loadAndRunExtensions() {
    const context = import.meta.glob('../extensions/**/script.{ts,tsx}'); // Globbing extensions
    
    const components: React.ReactNode[] = [];

    // Dynamically load all extensions
    for (const path in context) {
        try {
            const module = await context[path](); // Dynamically import each module
            if (module?.default) {
                components.push(<module.default sdk={sdk} />); // Wrap the extension component with sdk
            }
        } catch (error) {
            console.error(`Error loading extension at ${path}:`, error);
        }
    }

    return components;
}