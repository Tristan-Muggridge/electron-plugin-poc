export {};

declare global {
  interface Window {
    SDK: import('./preload').SDK
  }
}
