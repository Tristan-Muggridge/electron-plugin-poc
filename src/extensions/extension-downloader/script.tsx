import React, { useCallback } from "react";
import extensions from "../../data/extensions"

export default function ({sdk}: {sdk: SDK}) {

  const install = async (extension: typeof extensions[number]) => {
    const result = await Promise.all([
      await sdk.IO.writeToFile(`./src/extensions/${extension.config.name}`, 'script.tsx', extension.src),
      await sdk.IO.writeToFile(`./src/extensions/${extension.config.name}`, 'config.json', JSON.stringify(extension.config, undefined, 2)),
    ]);
    
    if (result.every(promise => promise.success)) {
        alert("Installed successfully!");
    } else {
        alert(`Failed to install: ${result.map(result => result.error).join('\n')}`);
    }
  }

  const installOnClick = useCallback(async (extension: typeof extensions[0]) => {

      if (extension.config.permissions) window.ipcRenderer.confirmationDialogue({
        title: `${extension.config.name} Authorisation`, 
        message: `Do you authorise ${extension.config.name} to use the following permissions? \n${
          Object.keys(extension.config.permissions.files).map(perm => `File ${perm}`).join(', ')
        }`,
      });

      else (install(extension))

      console.log(extension.config)

      // const confirmed = await sdk.ConfirmationDialogue.invoke({
      //   title: `${extension.config.name} Authorisation`, 
      //   message: `this application requires the following permissions: \n${extension.config.permissions.map(perm => ExtensionPermissionToString[perm]).join(', ')}`,
      // })
      
      // console.log(confirmed)
      window.ipcRenderer.confirmationResponse( async (event, response) => {
        if (response === false) return;
        install(extension);
      })
  }, [sdk])

  return (
      <div className="flex flex-col gap-4">
          <h2>Extension Marketplace</h2>

          <ul className="flex flex-col gap-1">
          {
              Object.entries(extensions).map(([id, extension]) => (
                  <li key={id} className="flex justify-between px-2">
                      <p>{extension.config.name}</p>
                      <button onClick={() => installOnClick(extension)} className="border text-sm border-zinc-600 p-1 rounded hover:bg-zinc-500 transition-colors">
                        Install
                      </button>
                  </li>
              ))
          }
          </ul>

      </div>
  )  
}