import React, { Suspense } from 'react';
import { useExtensions } from "../../contexts/ExtensionContext";

const sdk = window.SDK;

const ExtensionRenderer: React.FC<{ extension: Extension }> = ({ extension }) => {
    const Component = React.useMemo(() => extension.execute, [extension.execute]);
  
    return (
      <Suspense fallback={<div>Loading extension...</div>}>
        {Component({ sdk })}
      </Suspense>
    );
};
  
  const ExtensionInjector: React.FC = () => {
    const extensions = useExtensions();
  
    return (
      <div className="flex flex-col gap-4">
        {/* If no extensions are loaded, display a message */}
        {extensions.length === 0 ? (
          <p>No extensions loaded.</p>
        ) : (
          extensions
            .filter((extension) => {
              console.log(extension.config);
              if (extension.config.permissions) console.log(`${extension.config.name} is requesting access to the following protected operations.\n ${extension.config.permissions.toString()}`)
              return extension.config.enabled;
            })
            .map((extension, index) => (
              <div key={index} className="extension-container">
                <ExtensionRenderer extension={extension} />
              </div>
            ))
        )}
      </div>
    );
  };
  
  

export default ExtensionInjector;