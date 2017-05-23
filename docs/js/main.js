var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent) {
        this._x = 0;
        this._y = 0;
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
        var _this = _super.call(this, "bird", document.getElementById("container")) || this;
        _this.width = 150;
        _this.height = 120;
        _this.downkey = 40;
        _this.upkey = 38;
        _this.leftkey = 37;
        _this.rightkey = 39;
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.game = g;
        _this.x = 50;
        _this.y = 100;
        window.addEventListener("keydown", _this.onKeyDown.bind(_this));
        window.addEventListener("keyup", _this.onKeyUp.bind(_this));
        _this.div.style.transform = "translate(" + _this.x + "px,100px)";
        return _this;
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
var TrafficObject = (function (_super) {
    __extends(TrafficObject, _super);
    function TrafficObject(tag, yPos, g) {
        var _this = _super.call(this, tag, document.getElementById("container")) || this;
        _this.speed = 0;
        _this.yPos = 0;
        _this.width = 0;
        _this.height = 0;
        _this.tag = tag;
        _this.speed = 4;
        _this.y = _this.yPos = yPos;
        _this.g = g;
        _this.x = 800;
        _this.move();
        return _this;
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
        this.score = 0;
        this.activeGame = true;
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
        if (this.activeGame == true) {
            this.score++;
            document.getElementById("score").innerHTML = "Score : " + this.score;
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        this.activeGame = false;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : " + this.score + " Game over!";
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
        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var TrafficLight = (function (_super) {
    __extends(TrafficLight, _super);
    function TrafficLight(g) {
        var _this = _super.call(this, "trafficlight", 0, g) || this;
        _this.width = 149;
        _this.height = 200;
        return _this;
    }
    return TrafficLight;
}(TrafficObject));
var TrafficSign = (function (_super) {
    __extends(TrafficSign, _super);
    function TrafficSign(g) {
        var _this = _super.call(this, "trafficsign", 310, g) || this;
        _this.width = 204;
        _this.height = 204;
        return _this;
    }
    return TrafficSign;
}(TrafficObject));
//# sourceMappingURL=main.js.map