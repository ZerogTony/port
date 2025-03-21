import Page from 'components/Page'
import Scrolling from 'components/Scrolling'

import { delay } from 'utils/math'

export default class extends Page {
  constructor () {
    super({
      classes: {
        active: 'home--active'
      },
      element: '.home',
      elements: {
        list: '.home__list',
        items: '.home__item',
        fullscreenDiv: '.fullscreen-div'
      },
      isScrollable: true
    })
    this.hasTransitionPlayed = false;
    this.create()
  }

  /**
   * Animations.
   */
  show () {
    
    this.list.enable()

    this.element.classList.add(this.classes.active)

    if (!this.hasTransitionPlayed) {
     setTimeout(() => {
        this.elements.fullscreenDiv.style.transform = 'translateY(-100%)';
        this.hasTransitionPlayed = true; // Set the flag to true after playing the transition
      }, 500);
    }

    return super.show()

    
  }

  async hide () {
    this.list.disable()

    this.element.classList.remove(this.classes.active)

    await delay(400)
    if (!this.hasTransitionPlayed) {
      this.elements.fullscreenDiv.style.transform = 'translateY(0)';
      this.hasTransitionPlayed = true; // Set the flag to true after playing the transition
    }

    return super.hide();
  }

  /**
   * Create.
   */
  create () {
    super.create()

    this.createList()
  }

  createList () {
    this.list = new Scrolling({
      element: document.body,
      elements: {
        list: this.elements.list,
        items: this.elements.items
      }
    })
  }

  /**
   * Events.
   */
  onResize () {
    super.onResize()

    this.list.onResize()
  }

  onTouchDown (event) {
    this.list.onTouchDown(event)
  }

  onTouchMove (event) {
    this.list.onTouchMove(event)
  }

  onTouchUp (event) {
    this.list.onTouchUp(event)
  }

  onWheel (event) {
    this.list.onWheel(event)
  }

  /**
   * Loop.
   */
  update () {
    super.update()

    this.list.update()
  }
}
