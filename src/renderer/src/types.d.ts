export {}

declare global {
  interface Window {
    api: {
      placeOrder: (order: any) => Promise<any>;
    }
  }
}