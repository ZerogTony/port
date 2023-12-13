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

     this.originalBackground = document.documentElement.style.background;
    this.isOriginalBackground = true;
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


  


  onEasterEgg() {
    // Check if the current background is the original
    if (this.isOriginalBackground) {
      // Change the background to black
      document.documentElement.style.background = 'black';
  
      // Update the background of other elements if necessary
      this.homeBottom.style.background = 'linear-gradient(to bottom, transparent 0%, black 100%)';
      this.homeTop.style.background = 'linear-gradient(to bottom, black 0%, transparent 100%)';
      this.aboutGallery.style.color = 'white'; // Change text color for visibility
  
      // Update the canvas background color if it's part of your design
      if (this.canvas) {
        this.canvas.background = {
          r: 0,
          g: 0,
          b: 0
        };
      }
    } else {
      // Revert to the original background color
      document.documentElement.style.background = this.originalBackground;
  
      // Revert the background of other elements to their original state
      this.homeBottom.style.background = ''; // Original style for homeBottom
      this.homeTop.style.background = ''; // Original style for homeTop
      this.aboutGallery.style.color = ''; // Original text color
  
      // Revert the canvas background color if it's part of your design
      if (this.canvas) {
        // Assuming you have a method or properties to get the original canvas background
        this.canvas.background = this.getOriginalCanvasBackground();
      }
    }
  
    // Toggle the state
    this.isOriginalBackground = !this.isOriginalBackground;
  }
  
  // Example helper method to get the original canvas background
  // You need to implement this based on how your canvas background is set
  getOriginalCanvasBackground() {
    // Return the original canvas background color
    // This is just a placeholder, you need to implement this method
    return {
      r: 255, // Original red component
      g: 255, // Original green component
      b: 255  // Original blue component
    };
  }

  /**
   * Listeners.
   */
  addEventListeners () {
    this.elements.easter.addEventListener('click', this.onEasterEgg)
  }
}

