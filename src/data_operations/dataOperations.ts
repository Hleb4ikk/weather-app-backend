import fs from 'fs';

export function loadMemes(path: string) {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw);
}

export function saveMemes(memes: any, path: string) {
  fs.writeFileSync(path, JSON.stringify(memes, null, 2), 'utf-8');
}
