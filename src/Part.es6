class Part{
    constructor(options){
        let self = this;

        self.width = 5;
        self.height = 5;

        self.color = "#FF0000";

        self.x = options.x;
        self.y = options.y;


        TweenMax.to(self, 2, {x: options.move_to_x});
        TweenMax.to(self, 2, {y: options.move_to_y});

        self.life = 5;
    }

    draw() {

        let self = this;

        self.life -= 0.4;

        ctx.beginPath();
        ctx.rect(self.x, self.y, self.width, self.height);
        ctx.closePath();

        ctx.fillStyle = self.color;
        ctx.fill();
    }
}

export default Part;