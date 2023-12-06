import each from 'lodash/each'

import Component from 'classes/Component'
import { random } from 'utils/math'



export default class extends Component {
  constructor ({ canvas, url }) {

  
    super({
      classes: {
        linksActive: 'navigation__link--active'
      },
      element: '.navigation',
      elements: {
        links: '.navigation__link',
        easter: '.navigation__easter'
      }
    })

    this.canvas = canvas

    this.homeBottom = document.querySelector('.home__background__bottom')
    this.homeTop = document.querySelector('.home__background__top')
    this.aboutGallery = document.querySelector('.about__gallery')

    this.onChange(url)

    this.isEasterEggBlack = true;
  }


  

  /**
   * Events.
   */
  onChange (url) {
    each(this.elements.links, link => {
      const value = link.href.replace(window.location.origin, '')

      if (url === value) {
        link.classList.add(this.classes.linksActive)
      } else {
        link.classList.remove(this.classes.linksActive)
      }
    })
  }


  


onEasterEgg () {
  // Toggle the color between white and black
  const backgroundColor = this.isEasterEggBlack ? 'black' : 'white';
  const fontColor = this.isEasterEggBlack ? 'white' : 'black';

  // Apply the background color
  document.documentElement.style.background = backgroundColor;
  this.homeBottom.style.background = `linear-gradient(to bottom, transparent 0%, ${backgroundColor} 100%)`;
  this.homeTop.style.background = `linear-gradient(to bottom, ${backgroundColor} 0%, transparent 100%)`;

  // Apply the font color
  document.documentElement.style.color = fontColor;
  this.aboutGallery.style.color = fontColor;

  // Update specific elements like "work" and "about"
  const workElement = document.querySelector('.work'); // Replace '.work' with the actual class or ID
  const aboutElement = document.querySelector('.home__link'); // Replace '.about' with the actual class or ID
  if (workElement) workElement.style.color = fontColor;
  if (aboutElement) aboutElement.style.color = fontColor;

  // Update the navigation links
  const navigationLinks = document.querySelectorAll('.navigation__link'); // Replace with the actual class or ID of your navigation links
  navigationLinks.forEach(link => {
    link.style.color = fontColor;
  });

  // Update the canvas background if it exists
  if (this.canvas) {
    const colorValue = this.isEasterEggBlack ? 0 : 255; // Black is 0, white is 255
    this.canvas.background = {
      r: colorValue,
      g: colorValue,
      b: colorValue
    };
  }

  // Toggle the state for the next click
  this.isEasterEggBlack = !this.isEasterEggBlack;
}



  /**
   * Listeners.
   */
  addEventListeners () {
    this.elements.easter.addEventListener('click', this.onEasterEgg)
  }
}

