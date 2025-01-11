import React from "react";
import ExtensionInjector from "../components/ExtensionInjection";
import { ExtensionsProvider } from "../contexts/ExtensionContext";

export default function App() {
    return (
        <ExtensionsProvider>
            <div className="flex flex-col gap-8">
                <h1 className="text-lg font-semibold">Extension Dynamic Loading PoC</h1>
                <ExtensionInjector />
            </div>
        </ExtensionsProvider>
    );
}
