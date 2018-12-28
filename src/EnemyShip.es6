var _ = require('lodash');
import Part from "./Part.es6";

class EnemyShip {
    constructor(canvas, ctx) {

        let self = this;


        self.canvas = canvas;
        self.ctx = ctx;

        self.width = 10;
        self.height = 20;

        self.color = "#FF0000";

        self.x = _.random(0, self.canvas.width - self.width);
        self.y = -self.height;
    }

    explode(){

        let self = this;

        self.exploded = true;

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

            self.parts.push(part);
        }
    }

    draw_parts() {

        let self = this;

        self.parts.forEach(function (part, index) {
            part.draw();

            if (part.life <= 0) {
                self.parts.splice(index, 1);
            }
        })
    }

    draw() {

        let self = this;

        self.ctx.beginPath();
        self.ctx.rect(self.x, self.y++, self.width, self.height);
        self.ctx.closePath();

        self.ctx.fillStyle = self.color;
        self.ctx.fill();
    }
}

export default EnemyShip;