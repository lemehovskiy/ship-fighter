class Bullet {
    constructor(args) {
        this.x = args.position.x;
        this.y = args.position.y;
        this.size = 2;
        this.color = "#ffffff";
        this.parts = [];
        this.exploded = false;
    }

    render(state) {
        const ctx = state.ctx;
        this.y -= 3;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Bullet;