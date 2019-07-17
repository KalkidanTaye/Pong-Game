import {SVG_NS, KEYS} from '../settings'
import Board from './Board'
import Paddle from './Paddle'
export default class Game {
  constructor(element, width, height) {
    this.element = element
    this.width = width;
    this.height = height;
    
    this.board = new Board(this.width, this.height)
    this.gameElement = document.getElementById(this.element)

    // paddle dimension
    this.paddlewidth = 8
    this.paddleHeight = 56
    this.boardGap = 10
  
    //Player 1 Paddle
    this.player1 = new Paddle (
      this.height,
      this.paddlewidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
      )
    //Player 2 Paddle
    this.player2 = new Paddle(
      this.height,
      this.paddlewidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddlewidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
      )


    this.paddle = new Paddle(this.width, this.height)
    // Other code goes here...
    this.gameElement = document.getElementById(this.element)
  }

  render() {

    //Clear board
    this.gameElement.innerHTML = ''
    // create SVG Element for the Board
    let svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttributeNS(null, 'width', this.width)
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg);
    this.board.render(svg)
    this.player1.render(svg)
    this.player2.render(svg)
    
  }
}
