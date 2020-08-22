import panelingNE from './assets/world/paneling_NE.png';

const ERR_NOT_READY = new Error('Cannot get image from AssetStore because it is not ready');

const images: {[key: string]: HTMLImageElement} = {};
const loadPromises: Promise<void>[] = [];
let ready = false;

function loadImage(path: string, key: string): void {
  const img = new Image();
  images[key] = img;
  const promise = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (evt) => reject(evt);
    img.src = path;
  });
  loadPromises.push(promise);
}

export async function load(): Promise<void> {
  loadImage(panelingNE, 'panelingNE');
  ready = true;
}

export function get(key: string): HTMLImageElement | undefined {
  if (!ready) {
    throw ERR_NOT_READY;
  }
  return images[key];
}