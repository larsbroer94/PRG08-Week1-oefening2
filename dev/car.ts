/// <reference path="wheel.ts"/>
/// <reference path="gameObject.ts"/>

class Car extends GameObject {

    private speed:number;
    private braking:boolean;
    private wheel: Wheel;
    private game: Game;
    private crashed: boolean;
            
    constructor(g : Game) {        
        super("car", document.getElementById("container"));
        this.game = g;
        this.x = 0;
        this.y = 450;

        this.speed = 4;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        document.addEventListener("keydown", (e : KeyboardEvent) => this.handleKeyDown(e));

        // alvast goed zetten

        this.move();

        let frontWheel = new Wheel(this.div, 105);
        let backWheel = new Wheel(this.div, 20);
        // this.wheel = new Wheel(this.div, 20);
        // this.wheel = new Wheel(this.div, 105);
        
    }

    private handleKeyDown(e : KeyboardEvent) {
        if(e.key == ' '){
            //Brake
            this.braking = true;
        }
    }

    public move():void {
        // hier de snelheid verlagen als we aan het afremmen zijn
        //
        if (this.braking) this.speed *= 0.98;
        if (this.speed < 0.5) this.speed = 0;

        // hier kijken of de x waarde hoger is dan de x van de rots (335)
        if (this.x > 335) 
        {
            // Collision

            if (!this.crashed) {
                this.game.carCrashed(this.speed);
                this.stop();
            }
                this.crashed = true;
                // console.log("crashed!");
        }

        // de snelheid bij de x waarde optellen
        this.x += this.speed;
        
        // tekenen
        this.div.style.transform ="translate("+this.x+"px,450px)";
    } 

        private stop() {
            this.speed = 0;
        }

    //
    // hier een method maken voor on key press
    //
    // handleEvt = (e) => {
    // if (speed => 0) {
    //     this.speed *= 0.9
    //     }
    // }
}

