
import Page from 'components/Page'

import FontFaceObserver from 'fontfaceobserver'

import each from 'lodash/each'

import Detection from 'classes/Detection'

import { BREAKPOINT_PHONE } from 'utils/breakpoints'
import { getOffset } from 'utils/dom'
import { clamp, delay } from 'utils/math'

export default class extends Page {
  constructor() {
    super({
      classes: {
        active: 'intro--active'
      },
      element: '.intro',
      elements: {
            wrapper: '.intro__content',
            title: '.intro__header__title',
            titles: '.intro__header__title__text span',
          
      },
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

    const font = new FontFaceObserver('Neue Montreal', 10000)

    font.load().then(_ => {
      this.onResize()
    }).catch(_ => {
      this.onResize()
    })
  
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

