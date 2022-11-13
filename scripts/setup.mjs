

const setup = async () => {
  return ""

}
  

try {
  setup();
} catch {
  console.warn('Database is not ready yet. Skipping seeding...');
}
export { setup };