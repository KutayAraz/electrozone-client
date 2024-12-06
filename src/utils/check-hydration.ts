export async function checkHydration(store: any) {
  return new Promise((resolve: any) => {
    const checkInterval = setInterval(() => {
      const state = store.getState();
      if (state.hydration.completed) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 50);
  });
}
