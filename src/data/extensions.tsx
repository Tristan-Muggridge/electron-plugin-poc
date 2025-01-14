import { ExtensionConfiguration } from "../types/extensions";

const dummyExtensions: Record<string, {config: ExtensionConfiguration, src: string}> = {
    1: {
        config: {
            author: "Tristan Muggridge",
            version: "1.0",
            name: "Version Info",
            description: "an extension to help manage other extensions, pretty meta...",
            permissions: {
                files: {
                    read: true,
                }
            },
            source: "https://github.com/Tristan-Muggridge/electron-plugin-poc/tree/main/src/extensions/extension-downloader",
            enabled: true,
        },
        src: `function main({ sdk }: { sdk: SDK }) {
            const { versions } = sdk;
            return (
                <ul>
                    <li>Chrome (v{versions.chrome()})</li>
                    <li>Node.js (v{versions.node()})</li>
                    <li>Electron (v{versions.electron()})</li>
                </ul>
            );
        }`
    },
    2: {
        config: {
            author: "Tristan Muggridge",
            version: "1.0",
            name: "Hello World",
            description: "An extension to say hello to our world!",
            source: "https://github.com/Tristan-Muggridge/electron-plugin-poc/tree/main/src/extensions/extension-downloader",
            enabled: true,
        },
        src: `function main({sdk}: { sdk: SDK }) {
            return (
                <div className="text-2xl font-bold">
                    Hello World!
                </div>
            )
        }`
    }

}

export default dummyExtensions;