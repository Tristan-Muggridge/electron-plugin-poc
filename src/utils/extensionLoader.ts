// This function will load all extensions dynamically
export default async function loadAndRunExtensions() {
    const context = import.meta.glob('../extensions/**/script.{ts,tsx}'); // Globbing extensions
    
    const components: Extension[] = [];

    // Dynamically load all extensions
    for (const path in context) {
        try {
            console.log(`Loading extension from: ${path}`);
            const module = await context[path](); // Dynamically import each module
            
            const extension = module.default as Extension; // Access the default export
            console.log(extension?.config, extension?.execute); // Log config and execute

            if (extension?.config && extension?.execute) {
                components.push(extension); // Add the extension to the list
            } else {
                console.warn(`Extension at ${path} is missing required properties.`);
            }
        } catch (error) {
            console.error(`Error loading extension at ${path}:`, error);
        }
    }

    return components;
}