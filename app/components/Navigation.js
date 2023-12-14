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
  // Convert hexadecimal color to RGB
  const newBackgroundColor = '#283618'; // New background color
  const newBackgroundRgb = {
    r: 40,
    g: 54,
    b: 24
  };

  // Check if the current background is the original
  if (this.isOriginalBackground) {
    // Change the background to the new color
    document.documentElement.style.background = newBackgroundColor;

    // Assuming you want to update the text color for better contrast, choose a suitable color
    this.updateTextColor('.about, .case, .home', '#ECD6B0');

    // Rest of the easter egg logic for other elements
    this.homeBottom.style.background = `linear-gradient(to bottom, transparent 0%, ${newBackgroundColor} 100%)`;
    this.homeTop.style.background = `linear-gradient(to bottom, ${newBackgroundColor} 0%, transparent 100%)`;
    this.aboutGallery.style.color = '#d3d5d5'; // Change text color for visibility

    // Update the canvas background color if it's part of your design
    if (this.canvas) {
      this.canvas.background = newBackgroundRgb;
    }
  } else {
    // Logic to revert to the original state
    document.documentElement.style.background = this.originalBackground;

    // Logic to revert the color of the 'about', 'case', and 'home' pages
    this.updateTextColor('.about, .case, .home', '');

    // Rest of the logic to revert other easter egg effects
    this.homeBottom.style.background = ''; // Restoring the original homeBottom style
    this.homeTop.style.background = ''; // Restoring the original homeTop style
    this.aboutGallery.style.color = ''; // Restoring the original aboutGallery text color

    // Logic to revert the canvas background color if it's part of your design
    if (this.canvas) {
      this.canvas.background = this.getOriginalCanvasBackground();
    }
  }

  // Toggle the easter egg activation state
  this.isOriginalBackground = !this.isOriginalBackground;
}

updateTextColor(selector, color) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.style.color = color;
  });
}

getOriginalCanvasBackground() {
  // Logic to get the original canvas background color
  // This is just a placeholder, you need to implement this method
  return {
    r: 245, // Original red component
    g: 234, // Original green component
    b: 220  // Original blue component
  };
}

  
  

  /**
   * Listeners.
   */
  addEventListeners () {
    this.elements.easter.addEventListener('click', this.onEasterEgg)
  }
}

