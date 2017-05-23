/// <reference path="trafficObject.ts"/>

class TrafficLight extends TrafficObject {
                   
    constructor(g : Game) {
        super("trafficlight", 0, g);
        this.width = 149;
        this.height = 200;
    }
}