import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import loadAndRunExtensions from "../utils/extensionLoader";

const ExtensionContext = createContext<{extensions: Extension[]}>({extensions: []});

export const ExtensionsProvider = ({ children }: { children: ReactNode }) => {
    const [extensions, setExtensions] = useState<Extension[]>([]);

    useEffect(() => {
        loadAndRunExtensions()
            .then(extensions => setExtensions([...extensions]))
            .catch(e => console.error(`ExtensionsContext: Failed to load extensions`, e))
    }, [])

    return (
        <ExtensionContext.Provider value={{ extensions }}>
            {children}
        </ExtensionContext.Provider>
    );
}

export function useExtensions() {
    const {extensions} = useContext(ExtensionContext);
    return extensions;
}