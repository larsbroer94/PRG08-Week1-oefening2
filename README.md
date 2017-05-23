# EndGame Lars Broer

### UML
Onderstaand is een UML te vinden.

![UML](UML.png?raw=true "UML")

Wat op dit moment af is:
- Game.ts
- GameObject.ts
- Bird.ts
- TrafficObject.ts
- TrafficSign.ts
- TrafficLight.ts

Wat nog gedaan moet worden:
- Human.ts
- Poop.ts
- BirdBehaviour met Poop en Move

# Installatie instructies
Omdat het hier gaat om een simpele typescript game zonder libraries is het een kwestie van forken en openen. Ook is hij te spelen via de live omgeving van Github.

# Programmeerprincipes toegepast

### Interface
Op dit moment is er nog geen interface gebruikt. Dit gaat echter plaatsvinden via het Strategy Pattern (zie UML).

### Static Utility Method
Op dit moment nog geen static utility method. 

### Singleton
Deze is as we speak in de maak, maar nog niet af dus niet mee gepusht. Nog kleine aanpassingen.

### Encapsulation
```
class Game {
    private bird : Bird;
    private trafficObject : TrafficObject;
    private randomNumber : number;

    private score : number = 0;
    private activeGame : boolean = true;
```
Private, Public en Protected (zie GameObject voor getters en setters.)

### Inheritance
```
class TrafficLight extends TrafficObject {
                   
    constructor(g : Game) {
        super("trafficlight", 0, g);
        this.width = 149;
        this.height = 200;
    }
}
```
Gebruik maken van extensions (overerving)

# Overige info
- Veel gezeur gehad met de vogel laten bewegen (smooth)
- Collision detection toegepast
- Gameloop gemaakt inclusief scores
- Gamefinish bij collision en score eindigen
- Randomizer signs
- Potentiele speed verhoging voor moeilijkheid

# Uitlichten code
### Collision Detection
```
    collisionCheck(c1:TrafficObject, c2:Bird): boolean {
        return !(c2.x > c1.x + c1.width || 
                 c2.x + c2.width < c1.x || 
                 c2.y > c1.y + c1.height || 
                 c2.y + c2.height < c1.y);
    }
} 
```

### Moving Bird
```
    public update(): void {
        let targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.y = targetY;

        let targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.x = targetX;

        this.draw();
    }
```