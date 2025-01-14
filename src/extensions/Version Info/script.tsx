function main({ sdk }: { sdk: SDK }) {
            const { versions } = sdk;
            return (
                <ul>
                    <li>Chrome (v{versions.chrome()})</li>
                    <li>Node.js (v{versions.node()})</li>
                    <li>Electron (v{versions.electron()})</li>
                </ul>
            );
        }