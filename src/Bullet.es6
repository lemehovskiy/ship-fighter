class Bullet {
    constructor(args) {
        this.color = "#ffffff";
        this.parts = [];
        this.exploded = false;
        this.collisionType = 'circle';
        this.delete = false;

        this.state = {
            position: {
                x: args.position.x,
                y: args.position.y
            },
            radius: 2
        }
    }
    destroy(){
        this.delete = true;
    }

    render(state) {
        const ctx = state.ctx;
        this.state.position.y -= 3;

        ctx.beginPath();
        ctx.arc(this.state.position.x, this.state.position.y, this.state.radius, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default Bullet;