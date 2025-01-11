import React, { useCallback } from "react";
import { ExtensionPermissions } from "../../types/extensions";

const extensions = [
  {
    name: 'hello-world',
    description: 'Hello World',
    script: `
import React from "react";

export default function Main({sdk}: {sdk: SDK}) {
  console.log("it worked!");

  return (
    <div className="text-2xl font-bold">
      Hello World!
    </div>
  )
}
 `},
  {
    name: 'version-info',
    description: 'Version Info',
    script: `
import React, { useEffect } from "react";
  
export default function Main({ sdk }: { sdk: SDK }) {
  const { versions } = sdk;

  useEffect(() => {
    console.log({
      chrome: versions.chrome(),
      NodeJS: versions.node(),
      electron: versions.electron(),
    });
  }, []);

  return (
    <ul>
      <li>Chrome (v{versions.chrome()})</li>
      <li>Node.js (v{versions.node()})</li>
      <li>Electron (v{versions.electron()})</li>
    </ul>
  );
}
 `}
]

const config: Extension['config'] = {
    author: "Tristan Muggridge",
    version: "1.0",
    name: "Extension Downloader",
    description: "an extension to help manage other extensions, pretty meta...",
    permissions: [ExtensionPermissions.FILE_WRITE, ExtensionPermissions.FILE_READ],
    source: "https://github.com/Tristan-Muggridge/electron-plugin-poc/tree/main/src/extensions/extension-downloader",
    enabled: true
}

const extension: Extension = {
    config,
    execute: function ({sdk}: {sdk: SDK}) {
        const installOnClick = useCallback(async (extension: typeof extensions[0]) => {
            const result = await sdk.IO.writeToFile(`./src/extensions/${extension.name}`, 'script.tsx', extension.script)
            
            if (result.success) {
                alert("Installed successfully!");
            } else {
                alert(`Failed to install: ${result.error}`);
            }
        }, [sdk])
    
        return (
            <div className="flex flex-col gap-4">
                <h2>Extension Marketplace</h2>
                <ul className="flex flex-col gap-1">
                {
                    extensions.map(extension => (
                        <li key={extension.name} className="flex justify-between px-2">
                            <p>{extension.description}</p>
                            <button onClick={() => installOnClick(extension)} className="border text-sm border-zinc-600 p-1 rounded hover:bg-zinc-500 transition-colors">Install</button>
                        </li>
                    ))
                }
                </ul>
            </div>
        )  
    }
}

export default extension;