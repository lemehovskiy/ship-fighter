import {TweenMax} from "gsap/TweenMax";
import Weapon from "./Weapon.es6";

class ShipFighter {

    constructor(game) {
        let self = this;

        self.canvas = game.canvas;
        self.ctx = game.ctx;

        self.bullets = [];
        self.shipColor = '#ffff11';
        self.height = 25;
        self.width = 20;
        self.x = self.canvas.width / 2 + this.width / 2;
        self.y = self.canvas.height - this.height;
        self.acceleration = 0;


        self.controls();

        self.weapon = new Weapon(game, this);
    }


    draw() {
        let self = this;

        self.ctx.beginPath();
        self.ctx.moveTo(this.x + this.width / 2, this.y);
        self.ctx.lineTo(this.x, this.y + this.height);
        self.ctx.lineTo(this.x + this.width, this.y + this.height);
        self.ctx.closePath();
        self.ctx.fillStyle = self.shipColor;
        self.ctx.fill();

        if (self.x < -self.width / 2 - +self.acceleration) {
            self.x = -self.width / 2;
        }

        else if (self.x > self.canvas.width - self.width / 2 + self.acceleration) {
            self.x = self.canvas.width - self.width / 2 + self.acceleration;
        }


        self.x += self.acceleration;


    }

    stop() {

        let self = this;
        TweenMax.to(self, 0.5, {acceleration: 0});

    }

    move(direction) {

        let self = this;


        if (direction == 'left') {
            TweenMax.to(self, 1, {acceleration: -5});
        }

        else if (direction == 'right') {
            TweenMax.to(self, 1, {acceleration: 5});
        }

    }

    shoot() {

        let self = this;
        self.weapon.shoot();

    }


    controls() {
        let self = this;
        document.addEventListener("keydown", function (e) {

            switch (e.keyCode) {
                case 37:
                    self.move('left');
                    break;
                case 39:
                    self.move('right');
                    break;
                case 32:
                    self.shoot();
                    break;
            }
        });

        document.addEventListener("keyup", function (e) {

            if (e.keyCode == 37 || e.keyCode == 39) {
                self.stop();
            }

        });
    }
}

export default ShipFighter;