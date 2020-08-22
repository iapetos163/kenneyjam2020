import Loading from './Loading';
import { load as loadAssets } from './AssetStore';

export default class UIManager {
  private readonly gameElem: HTMLDivElement;
  private readonly errorElem = document.createElement('p');
  private readonly loadingLayer: Loading;
  private updatePending = false;
  private errored = false;

  constructor(game: HTMLDivElement) {
    this.gameElem = game;

    this.errorElem.setAttribute('id', 'error');
    game.appendChild(this.errorElem);

    this.loadingLayer = new Loading(game);
  }

  private fail(reason: string): void {
    this.errored = true;
    this.errorElem.innerText = reason;
  }

  public draw(): void {
    if (!this.errored) {
      if (!this.loadingLayer.active && this.updatePending) {
        this.updatePending = false;
      }
    }
  }

  public init(): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx == null) {
      this.fail('Failed create 2D context');
      return;
    }

    loadAssets().then(() => {
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
