import React from "react";
import ExtensionInjector from "../components/ExtensionInjection";

export default function App() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Extension Dynamic Loading PoC</h1>
            <ExtensionInjector />
        </div>
    );
}
