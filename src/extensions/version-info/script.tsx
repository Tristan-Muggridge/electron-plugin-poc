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
 