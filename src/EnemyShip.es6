var _ = require('lodash');
import Part from "./Part.es6";

class EnemyShip {
    constructor(args) {
        this.exploded = false;
        this.color = "#FF0000";
        this.collisionType = 'rect';
        this.delete = false;

        this.state = {
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 10,
                height: 20
            }
        }

        this.state.position.x = _.random(0, args.screen.width - this.state.size.width);
        this.state.position.y = -this.state.size.height;
    }

    destroy(){
        this.delete = true;
    }

    explode(){
        console.log('enemyExplode');

        let self = this,
            parts = [];

        let poolRadius = 500;

        for (let i = 0; i < 50; i++) {

            let angle = Math.random() * Math.PI * 2; //random angle in radians
            let radius = Math.random() * poolRadius;

            let part = new Part({
                x: self.x,
                y: self.y,
                move_to_x: Math.cos(angle) * radius + self.x,
                move_to_y: Math.sin(angle) * radius + self.y
            });

            parts.push(part);
        }

        self.exploded = true;

        console.log(parts);
        console.log(self.exploded);
    }

    drawExplode() {

        console.log('draw parts');

        let self = this;

        self.parts.forEach(function (part, index) {
            part.draw();

            if (part.life <= 0) {
                self.parts.splice(index, 1);
            }
        })
    }

    // renderEnemies() {
    //     self.enemies.forEach(function (enemy, i) {
    //         enemy.draw();
    //
    //         if (enemy.y > self.canvas.height) {
    //             self.enemies.splice(i, 1);
    //             self.lives--;
    //
    //         }
    //     })
    // }

    render(state){
        this.state.position.y++;
        this.draw(state);
    }

    draw(state) {

        const ctx = state.ctx;

        ctx.beginPath();
        ctx.rect(this.state.position.x, this.state.position.y, this.state.size.width, this.state.size.height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

    }
}

export default EnemyShip;