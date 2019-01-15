import {TweenMax} from "gsap/TweenMax";
import Weapon from "./Weapon.es6";

class ShipFighter {

    constructor(args) {
        this.shipColor = '#ffff11';
        this.height = 25;
        this.width = 20;
        this.position = {
            x: args.position.x,
            y: args.position.y
        };
        this.velocity = {
            x: 0
        };

        this.maxVelocity = 5;

        this.speed = 0.25;
        this.inertia = 0.90;
        this.create = args.create;

        this.weapon = new Weapon({
            ship: this
        });
    }


    render(state) {
        if(state.keys.left){
            this.move('LEFT');
        }
        if(state.keys.right){
            this.move('RIGHT');
        }
        if(state.keys.space) {
            this.shoot();
        }

        const ctx = state.ctx;

        ctx.beginPath();
        ctx.moveTo(this.position.x + this.width / 2, this.position.y);
        ctx.lineTo(this.position.x, this.position.y + this.height);
        ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
        ctx.closePath();
        ctx.fillStyle = this.shipColor;
        ctx.fill();


        if (!(this.velocity.x < 0.001 && this.velocity.x > -0.001)) {
            this.position.x += this.velocity.x;
            this.velocity.x *= this.inertia;
        }
    }

    accelerate(direction){
        if (direction == "LEFT" && this.velocity.x > -this.maxVelocity) {
            this.velocity.x -= 1;
        }
        else if (direction == 'RIGHT' && this.velocity.x < this.maxVelocity) {
            this.velocity.x += 1;
        }
    }

    move(direction) {
        if (direction == 'LEFT') {
            this.accelerate('LEFT');
        }

        else if (direction == 'RIGHT') {
            this.accelerate('RIGHT');
        }
    }

    shoot() {
        this.weapon.shoot({
            position: {
                x: this.position.x,
                y: this.position.y
            }
        });
    }
}

export default ShipFighter;