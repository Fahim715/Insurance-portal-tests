import path from 'path';

export function buildFileUrl(relativePathFromRoot: string): string {
  const resolvedPath = path.resolve(process.cwd(), relativePathFromRoot);
  return `file://${resolvedPath}`;
}

export function randomEmail(): string {
  const id = Math.floor(Math.random() * 9_000_000) + 1_000_000;
  return `test_${id}@example.com`;
}

export function randomAge(min = 18, max = 99): string {
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(value);
}
