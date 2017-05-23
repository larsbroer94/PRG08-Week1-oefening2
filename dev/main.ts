/// <reference path="bird.ts"/>
/// <reference path="trafficObject.ts"/>

class Game {
    private bird : Bird;
    private trafficObject : TrafficObject;
    private randomNumber : number;

    private score : number = 0;
    private activeGame : boolean = true;
    
    constructor() {
        this.bird = new Bird(this);
        this.signCreator();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.bird.update();
        this.trafficObject.move();

        // CollisionCheck
        if(this.collisionCheck(this.trafficObject, this.bird)) this.endGame();

        // Score add
        if (this.activeGame == true) {
            this.score ++;
            document.getElementById("score").innerHTML = "Score : "+ this.score;
        }

        // Gameloop
        requestAnimationFrame(() => this.gameLoop());

    }

    public endGame(){
        this.activeGame = false;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : "+ this.score +" Game over!";
    }

    public signCreator() {
        
        this.randomNumber = Math.round(Math.random() * 10);
        console.log(this.randomNumber);

        if (this.randomNumber <= 5) 
        {
            this.trafficObject = new TrafficSign(this);
        } 
        
        else if (this.randomNumber > 5)
        {
            this.trafficObject = new TrafficLight(this);
        }
    }

    collisionCheck(c1:TrafficObject, c2:Bird): boolean {
        return !(c2.x > c1.x + c1.width || 
                 c2.x + c2.width < c1.x || 
                 c2.y > c1.y + c1.height || 
                 c2.y + c2.height < c1.y);
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});