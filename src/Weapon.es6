import Bullet from "./Bullet.es6";

class Weapon {
    constructor(args) {
        this.create = args.ship.create;
        this.roundsPerMinute = 1000;

        this.state = {
            lastShot: 0
        }
    }

    shoot(args) {
        if(!(Date.now() - this.state.lastShot > 60 / this.roundsPerMinute * 1000)) return;


        let bullet = new Bullet({
            position: {
                x: args.position.x,
                y: args.position.y
            }
        });

        this.create(bullet, 'bullets');
        
        this.state.lastShot = new Date();
    }
}

export default Weapon;