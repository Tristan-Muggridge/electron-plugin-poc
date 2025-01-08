import React, { useEffect, useState } from "react";

const sdk = window.SDK

// This function will load all extensions dynamically
async function loadAndRunExtensions() {
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
  
const ExtensionInjector: React.FC = () => {
  const [extensions, setExtensions] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    loadAndRunExtensions().then((loadedExtensions) => {
      setExtensions(loadedExtensions); // Set the loaded extensions to state
    }).catch(error => {
      console.error("Error loading extensions:", error);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* If no extensions are loaded, display a message */}
      {extensions.length === 0 ? (
        <p>No extensions loaded.</p>
      ) : (
        extensions.map((ExtensionComponent, index) => (
          <div key={index} className="extension-container">
            {ExtensionComponent}
          </div>
        ))
      )}
    </div>
  );
};

export default function App() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Extension Dynamic Loading PoC</h1>
            <ExtensionInjector />
        </div>
    );
}
