export default class UIManager {
  private readonly game: HTMLDivElement;
  private updatePending = false;
  private errored = false;
  private error = document.createElement('p');

  constructor(game: HTMLDivElement) {
    this.game = game;
    game.appendChild(this.error);
    this.error.setAttribute('style', 'color: darkred;');
    console.log('appended child!!!');
  }

  public draw(): void {
    if (this.updatePending && !this.errored) {
      this.updatePending = false;
    }
  }

  public init(): void {
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    if (ctx == null) {
      this.fail('Failed create 2D context');
    }
  }

  private fail(reason: string): void {
    this.errored = true;
    this.error.innerText = reason;
  }
}
