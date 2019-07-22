import{SVG_NS} from '../settings'

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down){
        this.boardHeight = boardHeight
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 10
        this.score = 0
        // let that = this

        document.addEventListener('keydown', event => { 
            switch(event.key) {
                case up:
                        this.y = Math.max(0, this.y - this.speed)
                break
                case down:
                        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed)
                break
                
            }
        })
    }
    coordinates(x,y,width,height){
        let leftX = x
        let rightX = x + width
        let topY = y
        let bottomY = y + height
        return [leftX, rightX, topY, bottomY]
    }
    changePaddle(score1, score2){
           
        if((score1 - score2) === 5){
            player1.height+=5
            this.reset()
          }
          else if (score2 - score1 === 5) {
            player1.height+=5
            this.reset()
        }
    }

    render(svg){
        let rect = document.createElementNS(SVG_NS, 'rect')
        rect.setAttributeNS(null,'fill', 'white') 
        rect.setAttributeNS(null, 'height', this.height)
        rect.setAttributeNS(null, 'width', this.width)
        rect.setAttributeNS(null, 'x', this.x)
        rect.setAttributeNS(null, 'y', this.y)
        svg.appendChild(rect);
    }
}
