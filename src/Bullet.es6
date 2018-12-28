class Bullet {
    constructor(game, ship) {
        let self = this;

        self.ctx = game.ctx;
        self.canvas = game.canvas;
        self.x = ship.x;
        self.y = ship.y;
        self.size = 2;

        self.color = "#ffffff";

        self.parts = [];

        self.exploded = false;
    }
    
    draw() {
        let self = this;

        self.y -= 3;

        self.ctx.beginPath();
        self.ctx.arc(self.x, self.y, self.size, 0, 2 * Math.PI);
        self.ctx.closePath();

        self.ctx.fillStyle = self.color;
        self.ctx.fill();
    }
}

export default Bullet;