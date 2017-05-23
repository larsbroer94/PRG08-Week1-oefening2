/// <reference path="gameObject.ts"/>

class Rock extends GameObject {

    private _speed:number;
    private g : number = 0;

    public set speed(s : number) {
        this._speed = s;
    }
                        
    constructor() {
        super("rock", document.getElementById("container"));

        this._speed = 0;
        this.x = 490;
        this.y = 450;
        this.move();
    }

    public move():void {

        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;

        if (this.y + 62 > document.getElementById("container").clientHeight){
            this._speed = 0;
            this.g = 0;
        } 

        //teken de div op de juiste positie
        this.div.style.transform ="translate("+ this.x +"px,"+ this.y +"px)";     
    }

    public crashed(carSpeed : number) {
        this._speed  = carSpeed + 3;
        this.g = 9.81;
    }
    
}