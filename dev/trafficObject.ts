/// <reference path="gameObject.ts"/>

class TrafficObject extends GameObject {

    private speed : number;
    private yPos : number;
    private g : Game;
    private tag : string;

    public width : number;
    public height : number;
                        
    constructor(tag : string, yPos : number, g : Game) {
        super(tag, document.getElementById("container"));

        this.tag = tag;
        this.speed = 4;
        this.yPos = yPos;
        this.g = g;
        this.x = 800;

        this.move();

    }

    public move():void {
        // de snelheid bij de x waarde optellen
        this.x -= this.speed;
        
        // tekenen
        this.div.style.transform ="translate("+this.x+"px,"+this.yPos+"px)";

        // Controleren op zijkant geraakt
        if (this.x <= -400) {
            this.g.signCreator();
            this.div.remove();
        }
   
    }
}