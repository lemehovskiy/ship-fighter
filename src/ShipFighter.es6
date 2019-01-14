import {TweenMax} from "gsap/TweenMax";
import Weapon from "./Weapon.es6";

class ShipFighter {

    constructor(args) {
        this.shipColor = '#ffff11';
        this.height = 25;
        this.width = 20;
        this.x = args.position.x;
        this.y = args.position.y;
        this.acceleration = 0;
        this.create = args.create;

        this.controls();
        this.weapon = new Weapon({
            ship: this
        });
    }


    render(state) {
        const ctx = state.ctx;

        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fillStyle = this.shipColor;
        ctx.fill();

        if (this.x < -this.width / 2 - +this.acceleration) {
            this.x = -this.width / 2;
        }
        else if (this.x > state.screen.width - this.width / 2 + this.acceleration) {
            this.x = state.screen.width - this.width / 2 + this.acceleration;
        }

        this.x += this.acceleration;
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
        this.weapon.shoot({
            position: {
                x: this.x,
                y: this.y
            }
        });
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