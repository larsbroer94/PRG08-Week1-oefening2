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
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(parent, offsetCarX) {
        _super.call(this, "wheel", parent);
        this.div.style.transform = "translate(" + offsetCarX + "px, 30px)";
    }
    return Wheel;
}(GameObject));
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(g) {
        var _this = this;
        _super.call(this, "bird", document.getElementById("container"));
        this.game = g;
        this.x = 0;
        this.y = 220;
        this.speed = 4;
        document.addEventListener("keydown", function (e) { return _this.handleKeyDown(e); });
        this.move();
    }
    Bird.prototype.handleKeyDown = function (e) {
        if (e.key == ' ') {
            console.log('hoi');
        }
    };
    Bird.prototype.move = function () {
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
            console.log("crashed!");
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px,220px)";
    };
    Bird.prototype.stop = function () {
        this.speed = 0;
    };
    return Bird;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(g) {
        var _this = this;
        _super.call(this, "car", document.getElementById("container"));
        this.game = g;
        this.x = 0;
        this.y = 220;
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
            console.log("crashed!");
        }
        this.x += this.speed;
        this.div.style.transform = "translate(" + this.x + "px,220px)";
    };
    Car.prototype.stop = function () {
        this.speed = 0;
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.car = new Car(this);
        this.rock = new Rock();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.carCrashed = function (carSpeed) {
        this.rock.crashed(carSpeed);
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : 0";
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
        this.y = 210;
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
//# sourceMappingURL=main.js.map