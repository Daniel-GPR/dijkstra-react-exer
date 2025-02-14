export async function runUpdate(ms: number, exec: () => void) {
  setTimeout(exec, ms);
}
