var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(tag, parent) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(g) {
        _super.call(this, "bird", document.getElementById("container"));
        this.width = 150;
        this.height = 120;
        this.downkey = 40;
        this.upkey = 38;
        this.leftkey = 37;
        this.rightkey = 39;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.game = g;
        this.x = 50;
        this.y = 100;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.div.style.transform = "translate(" + this.x + "px,100px)";
    }
    Bird.prototype.onKeyDown = function (event) {
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
    };
    Bird.prototype.onKeyUp = function (event) {
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
    };
    Bird.prototype.update = function () {
        var targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150)
            this.y = targetY;
        var targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50)
            this.x = targetX;
        this.draw();
    };
    Bird.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    };
    return Bird;
}(GameObject));
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, offsetCarX) {
        _super.call(this, "wheel", parent);
        this.div.style.transform = "translate(" + offsetCarX + "px, 30px)";
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(g) {
        var _this = this;
        _super.call(this, "car", document.getElementById("container"));
        this.game = g;
        this.x = 0;
        this.y = 450;
        this.speed = 4;
        document.addEventListener("keydown", function (e) { return _this.handleKeyDown(e); });
        this.move();
        var frontWheel = new Wheel(this.div, 105);
        var backWheel = new Wheel(this.div, 20);
    }
    Car.prototype.handleKeyDown = function (e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    };
    Car.prototype.move = function () {
        if (this.braking)
            this.speed *= 0.98;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.x > 335) {
            if (!this.crashed) {
                this.game.carCrashed(this.speed);
                this.stop();
            }
            this.crashed = true;
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px,450px)";
    };
    Car.prototype.stop = function () {
        this.speed = 0;
    };
    return Car;
}(GameObject));
var TrafficObject = (function (_super) {
    __extends(TrafficObject, _super);
    function TrafficObject(tag, yPos, g) {
        _super.call(this, tag, document.getElementById("container"));
        this.tag = tag;
        this.speed = 4;
        this.yPos = yPos;
        this.g = g;
        this.x = 800;
        this.move();
    }
    TrafficObject.prototype.move = function () {
        this.x -= this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.yPos + "px)";
        if (this.x <= -400) {
            this.g.signCreator();
            this.div.remove();
        }
    };
    return TrafficObject;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.bird = new Bird(this);
        this.signCreator();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bird.update();
        this.trafficObject.move();
        if (this.collisionCheck(this.trafficObject, this.bird))
            this.endGame();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : 0";
    };
    Game.prototype.signCreator = function () {
        this.randomNumber = Math.round(Math.random() * 10);
        console.log(this.randomNumber);
        if (this.randomNumber <= 5) {
            this.trafficObject = new TrafficSign(this);
        }
        else if (this.randomNumber > 5) {
            this.trafficObject = new TrafficLight(this);
        }
    };
    Game.prototype.collisionCheck = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        _super.call(this, "rock", document.getElementById("container"));
        this.g = 0;
        this._speed = 0;
        this.x = 490;
        this.y = 450;
        this.move();
    }
    Object.defineProperty(Rock.prototype, "speed", {
        set: function (s) {
            this._speed = s;
        },
        enumerable: true,
        configurable: true
    });
    Rock.prototype.move = function () {
        this.x += this._speed;
        this.y += this.g;
        this._speed *= 0.98;
        if (this.y + 62 > document.getElementById("container").clientHeight) {
            this._speed = 0;
            this.g = 0;
        }
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Rock.prototype.crashed = function (carSpeed) {
        this._speed = carSpeed + 3;
        this.g = 9.81;
    };
    return Rock;
}(GameObject));
var TrafficLight = (function (_super) {
    __extends(TrafficLight, _super);
    function TrafficLight(g) {
        _super.call(this, "trafficlight", 0, g);
        this.width = 149;
        this.height = 200;
    }
    return TrafficLight;
}(TrafficObject));
var TrafficSign = (function (_super) {
    __extends(TrafficSign, _super);
    function TrafficSign(g) {
        _super.call(this, "trafficsign", 310, g);
        this.width = 204;
        this.height = 204;
    }
    return TrafficSign;
}(TrafficObject));
//# sourceMappingURL=main.js.map