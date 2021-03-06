import {SVG_NS} from '../settings'
import pingSound1 from '../../public/sounds/pong-01.wav'
import pingSound2 from '../../public/sounds/pong-04.wav'

export default class Ball {
    constructor(radius, boardWidth, boardHeight){
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1
        this.ping1 = new Audio(pingSound1)
        this.ping2 = new Audio(pingSound1)
        this.reset()
    }

    
    reset(){
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        this.vy=0
        while(this.vy === 0){
            this.vy = Math.floor(Math.random() * 10 -5)
        }
        
        this.vx = this.direction * (6- Math.abs(this.vy))
        
    }
    paddleCollision(player1, player2){
        if(this.vx > 0)
        {
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                (this.x + this.radius >= leftX)
                && (this.x + this.radius <= rightX)
                && (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx
                this.ping1.play()
               
            }
        } else {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
            let [leftX, rightX, topY, bottomY] = paddle
             if(
                 (this.x - this.radius <= rightX)
                 && (this.x - this.radius >= leftX)
                 && (this.y >= topY && this.y <= bottomY)
              ) {
                // Ball movement
                this.vx = -this.vx
                this.ping2.play()
                // this.ping2.muted = 0
            }
        }
    } 
    
    wallCollision(){
        const hitTop = this.y - this.radius <= 0
        const hitBottom = this.y + this.radius >= this.boardHeight
        const hitLeft = this.x - this.radius <= 0
        const hitRight = this.x + this.radius >= this.boardWidth
        

        if(hitTop || hitBottom){
            this.vy = -this.vy
        }
        if(hitLeft || hitRight){
            this.vx = - this.vx
        }

    }
    
    goal(player){
        player.score++
        this.reset()
        
        }
    
    winner(player1, player2) {
        if(player1.score > 30){
                alert("winner");
                this.reset()
                player1.score = 0 
                player2.score = 0 
            }    
    }

    changePaddle(player1, player2){
    // console.log(player1.height)
      if((player2.score - player1.score > 5) && (player2.height <= 64)) {
          player2.height+=8
          //change the color of the paddle when it changes height
          console.log(player2.height)
          
        }
        else if((player1.score - player2.score > 5) && (player1.height <= 64)){
                player1.height+=8
                console.log(player1.height)
            
          }
       
  }

    render(svg, player1, player2){

        this.x += this.vx
        this.y += this.vy
        this.wallCollision()
        this.paddleCollision(player1, player2)
        
        let circle = document.createElementNS(SVG_NS, 'circle')
        
        circle.setAttributeNS(null, 'r', this.radius)
        circle.setAttributeNS(null, 'cx', this.x)
        circle.setAttributeNS(null, 'cy', this.y)
        circle.setAttributeNS(null, 'fill', 'white')
        svg.appendChild(circle)
        // Goal Detection
        const rightGoal = this.x + this.radius >= this.boardWidth
        const leftGoal = this.x - this.radius <= 0
        if(rightGoal){
            this.goal(player1)
            this.direction = 1
        }
        else if(leftGoal){
            this.goal(player2)
            this.direction = -1
        }
        this.winner(player1, player2)
        this.changePaddle(player1, player2)
    }

}