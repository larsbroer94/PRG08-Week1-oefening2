/// <reference path="trafficObject.ts"/>

class TrafficSign extends TrafficObject {
                        
    constructor(g: Game) {
        super("trafficsign", 310, g);
        this.width = 204;
        this.height = 204;
    }
}