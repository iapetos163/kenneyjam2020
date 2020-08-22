import panelingNE from './assets/world/paneling_NE.png';
import panelingNW from './assets/world/paneling_NW.png';

const ERR_NOT_READY = new Error('Cannot get image from AssetStore because it is not ready');

const images: {[key: string]: CanvasImageSource} = {};
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
  loadImage(panelingNW, 'panelingNW');
  await Promise.all(loadPromises);
  ready = true;
}

export function get(key: string): CanvasImageSource {
  if (!ready) {
    throw ERR_NOT_READY;
  }
  const img = images[key];
  if (img === undefined) {
    throw new Error(`Asset ${key} not fonud`);
  }
  return img;
}
