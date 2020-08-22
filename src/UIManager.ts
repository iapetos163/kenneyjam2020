import Loading from './Loading';
import { load as loadAssets, get as getAsset } from './AssetStore';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 640;

function wallProject(x: number, y: number, z: number, xOriginOffset: number, yOriginOffset: number): [number, number] {
  return [
    480 - xOriginOffset - (52 * x) + (52 * y),
    320 - yOriginOffset - (61 * z) + (37 * (x + y))
  ];
}

export default class UIManager {
  private readonly gameElem: HTMLDivElement;
  private readonly errorElem = document.createElement('div');
  private readonly loadingLayer: Loading;
  private readonly ctx: CanvasRenderingContext2D;
  private updatePending = false;
  private errored = false;

  constructor(game: HTMLDivElement) {
    this.gameElem = game;

    this.errorElem.setAttribute('id', 'error');
    game.appendChild(this.errorElem);

    this.loadingLayer = new Loading(game);

    const canvas = document.createElement('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    game.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (ctx === null) {
      this.fail('Failed to create 2D context');
      this.ctx = new CanvasRenderingContext2D();
      return;
    }
    this.ctx = ctx;
  }

  private fail(reason: string): void {
    this.errored = true;
    this.errorElem.innerText = reason;
  }

  private renderWallNE(): void {
    const panelingNE = getAsset('panelingNE');

    for (let x = 0; x < 4; x++) {
      for (let z = 0; z < 3; z++) {
        const [pX, pY] = wallProject(x, -1, z, 3, 64 - 37);
        this.ctx.drawImage(panelingNE, pX, pY);
      }
    }
  }

  private renderWallNW(): void {
    const panelingNE = getAsset('panelingNW');

    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 3; z++) {
        const [pX, pY] = wallProject(-1, y, z, 52, 64 - 37);
        this.ctx.drawImage(panelingNE, pX, pY);
      }
    }
  }

  private renderFloor(): void {
    const floorFull = getAsset('floorFull'); // 6 104
    for (let x = 0, y = 0; x < 8; x = y) {
      for (y = 0; x >= 0; (x -= 2), (y += 2)) {
        console.log(x, y);
        if (x < 4 && y < 4) {
          const [pX, pY] = wallProject(x, y, 0, 104, 6);
          this.ctx.drawImage(floorFull, pX, pY);
        }
      }
    }
  }

  public draw(): void {
    if (!this.errored) {
      if (!this.loadingLayer.active && this.updatePending) {
        this.updatePending = false;
      }
    }
  }

  public init(): void {
    loadAssets().then(() => {
      this.renderWallNE();
      this.renderWallNW();
      this.renderFloor();

      this.loadingLayer.active = false;
    }).catch(err => {
      const message = err?.message;
      if (message === undefined) {
        this.fail(message);
      } else {
        this.fail(err);
      }
    });
  }
}
