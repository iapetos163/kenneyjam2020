export default class Loading {
  private elementActive = true;
  private readonly elem = document.createElement('div');

  constructor(game: HTMLDivElement) {
    this.elem.innerText = 'Loading...';
    this.elem.setAttribute('id', 'loading');
    game.appendChild(this.elem);
  }

  public get active(): boolean {
    return this.elementActive;
  }

  public set active(a: boolean) {
    if (this.elementActive && !a) {
      this.elem.setAttribute('class', 'inactive');
      this.elementActive = false;
    } else if (!this.elementActive && a) {
      this.elem.removeAttribute('class');
      this.elementActive = true;
    }
  }
}
