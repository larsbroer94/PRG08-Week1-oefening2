/// <reference path="gameObject.ts"/>

class Bird extends GameObject {

    private speed: number;
    private game: Game;
    private crashed: boolean;

    public width: number = 150;
    public height: number = 120;

    private downkey: number = 40;
    private upkey: number = 38;
    private leftkey: number = 37;
    private rightkey: number = 39;

    private downSpeed: number = 0;
    private upSpeed: number = 0;
    private leftSpeed: number = 0;
    private rightSpeed: number = 0;

    constructor(g: Game) {
        super("bird", document.getElementById("container"));
        this.game = g;
        this.x = 50;
        this.y = 100;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        this.div.style.transform = "translate(" + this.x + "px,100px)";

    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 7;
                break;
            case this.downkey:
                this.downSpeed = 7;
                break;
            case this.leftkey:
                this.leftSpeed = 10;
                break;
            case this.rightkey:
                this.rightSpeed = 5;
                break;
        }
    }

    // speed op 0 als de eigen keys zijn losgelaten
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    }

    // bewegen - let op, de update functie wordt door game aangeroepen! niet door de event listener (dat is niet smooth)
    public update(): void {
        let targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.y = targetY;

        let targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.x = targetX;

        this.draw();
    }

    public draw(): void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    }
}

