import { SDK } from "../../preload";

export default function Main(sdk: SDK) {
    const { versions, someUtility } = sdk;

    const information = document.getElementById('info');
    information.innerText = (`
      This app is using:
      - Chrome (v${versions.chrome()})
      - Node.js (v${versions.node()})
      - Electron (v${versions.electron()})
    `);

    console.log(someUtility())
}