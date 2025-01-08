/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import '../index.css';

async function loadAndRunExtensions() {
    const context = import.meta.glob('../extensions/**/script.ts'); // Using Vite's glob import
  
    for (const path in context) {
      const module = await context[path](); // Dynamically import each module
      if (module?.default) {
        module.default(window.SDK); // Call the `main()` function (assuming it's exported as the default)
      }
    }
}

loadAndRunExtensions();

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
