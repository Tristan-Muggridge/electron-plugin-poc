// This function will load all extensions dynamically
export default async function loadAndRunExtensions() {
    const context = import.meta.glob('../extensions/**/script.{ts,tsx}'); // Globbing extensions
    
    const components: Extension[] = [];

    // Dynamically load all extensions
    for (const filepath in context) {
        try {

            const config = await window.SDK.IO.readFromFile('./src/extensions/'+filepath.split('script.tsx').at(0)+'/config.json')
            const jsonConfig = JSON.parse(config)

            console.log(`Loading extension from: ${filepath}`);
            const module = await context[filepath](); // Dynamically import each module
            
            const extension = {
                config: jsonConfig,
                execute: module.default
            } as Extension; // Access the default export

            console.log(extension?.config, extension?.execute); // Log config and execute

            if (extension?.config && extension?.execute) {
                components.push(extension); // Add the extension to the list
            } else {
                console.warn(`Extension at ${filepath} is missing required properties.`);
            }
        } catch (error) {
            console.error(`Error loading extension at ${filepath}:`, error);
            continue
        }
    }

    return components;
}