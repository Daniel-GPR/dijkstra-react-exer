export async function runUpdate(ms: number, execute: () => void) {
  setTimeout(execute, ms);
}
