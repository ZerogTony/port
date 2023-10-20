import Page from 'components/Page'

export default class extends Page {
  constructor() {
    super({
      classes: {
        active: 'intro--active'
      },
      element: '.intro',
      isScrollable: false
    });

    this.create();
  }

  /**
   * Animations.
   */
  show() {
    this.element.classList.add(this.classes.active);

    return super.show();
  }

  async hide() {
    this.element.classList.remove(this.classes.active);

    await delay(400);

    return super.hide();
  }

  /**
   * Create.
   */
  create() {
    super.create();
  }

  /**
   * Events.
   */
  onResize() {
    super.onResize();
  }

  /**
   * Loop.
   */
  update() {
    super.update();
  }
}
