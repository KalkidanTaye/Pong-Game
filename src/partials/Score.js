import{SVG_NS} from '../settings'
export default class Score {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
    winner(score1, score2)
    {
      
      if(score1 === 50){
          alert("Player 1 is a Winner!!!")
          
      }
      else if (score2 === 50) {
        alert("Player 2 is a Winner!!!")
      }
    }
    render(svg, score) {
        let text = document.createElementNS(SVG_NS, 'text')
        text.setAttributeNS(null, 'x', this.x)
        text.setAttributeNS(null, 'y', this.y)
        text.setAttributeNS(null, 'size', this.size)
        text.setAttributeNS(null, 'font-family', 'Silkscreen Web')
        text.setAttributeNS(null, 'font-size', this.size)
        text.setAttributeNS(null, 'fill', '#ffffff')
        text.textContent = score
        svg.appendChild(text)
    }
  }