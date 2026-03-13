export default async function globalTeardown() {
  const instance = globalThis.__MONGOINSTANCE;
  if (instance) {
    await instance.stop();
  }
}
