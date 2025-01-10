import React, { useEffect, useState } from "react";
import loadAndRunExtensions from "./extensionLoader";
  
const ExtensionInjector: React.FC = () => {
  const [extensions, setExtensions] = useState<React.ReactNode[]>([]);

  useEffect(() => {
        loadAndRunExtensions()
        .then((loadedExtensions) => {
            setExtensions(loadedExtensions);
        })
        .catch(error => {
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

export default ExtensionInjector;