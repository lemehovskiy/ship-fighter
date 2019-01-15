// import EnemiesShip from 'EnemiesShip.es6';
// import Part from "Part";
import ShipFighter from "./ShipFighter.es6";
import EnemyShip from "./EnemyShip.es6";

const KEY = {
    LEFT:  37,
    RIGHT: 39,
    SPACE: 32
};

'use strict';

class Game {

    constructor() {

        this.state = {
            canvas: document.getElementById("ship-fighter"),
            screen: {
                width: 600,
                height: 500
            },
            lives: 5,
            score: 0,
            keys: {
                left  : 0,
                right : 0,
                space : 0
            }
        }

        this.state.ctx = this.state.canvas.getContext("2d");
        this.state.canvas.width = this.state.screen.width;
        this.state.canvas.height = this.state.screen.height;

        this.shipFighters = [];
        this.enemies = [];
        this.bullets = [];


        let shipFighter = new ShipFighter({
                position: {
                    x: this.state.canvas.width / 2,
                    y: this.state.canvas.height - 25
                },
                create: this.createObject.bind(this)
            })


        this.createObject(shipFighter, 'shipFighters');


        this.createEnemies();

        this.update();

        window.addEventListener('keyup',   this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));


        
        // function render_bullets() {
        //     self.shipFighter.bullets.forEach(function (bullet, bullet_index) {
        //
        //         if (bullet.exploded) {
        //             bullet.draw_parts();
        //
        //             if (bullet.parts.length == 0) {
        //                 self.shipFighter.bullets.splice(bullet_index, 1);
        //             }
        //         }
        //         else {
        //             bullet.draw();
        //
        //             self.enemies.forEach(function (enemy, enemy_index) {
        //                 if (
        //                     bullet.x > enemy.x &&
        //                     bullet.x < enemy.x + enemy.width &&
        //                     bullet.y <= enemy.y + enemy.height &&
        //                     bullet.y > enemy.y
        //
        //                 ) {
        //                     self.enemies.splice(enemy_index, 1);
        //
        //                     bullet.explode();
        //
        //
        //                     self.score += 10;
        //
        //                     updateScore();
        //                 }
        //             });
        //         }
        //
        //
        //         if (bullet.y < 0) {
        //             self.shipFighter.bullets.splice(bullet_index, 1);
        //         }
        //
        //
        //     });
        //
        // }
        //

        function updateLives() {

            self.ctx.font = "20px Comic Sans MS";
            self.ctx.fillStyle = "green";
            self.ctx.textAlign = "start";

            if (self.lives === 0) {
                restart();
            }

            self.ctx.fillText('Lives: ' + self.lives, 20, 30);
        }

        function updateScore() {

            self.ctx.font = "20px Comic Sans MS";
            self.ctx.fillStyle = "green";
            self.ctx.textAlign = "end";

            self.ctx.fillText('Score: ' + self.score, self.canvas.width - 20, 30);
        }


        function restart() {
            self.lives = 5;
            self.score = 0;
            self.enemies = [];

        }

    }


    handleKeys(value, e){
        let keys = this.state.keys;
        if(e.keyCode === KEY.LEFT ) keys.left  = value;
        if(e.keyCode === KEY.RIGHT) keys.right = value;
        if(e.keyCode === KEY.SPACE) keys.space = value;
        this.state.keys = keys;
    }

    createObject(item, group){
        this[group].push(item);
    }

    createEnemies() {
        let self = this;

        this.createEnemy();

        let emenies_interval = setInterval(function () {
            if (window.blurred) return;

            self.createEnemy();

        }, 1000)
    }


    createEnemy(){
        let enemy = new EnemyShip({
            screen: {
                width: this.state.screen.width
            }
        });

        this.createObject(enemy, 'enemies');
    }

    checkCollisionsWith(items1, items2) {
        var a = items1.length - 1;
        var b;
        for(a; a > -1; --a){
            b = items2.length - 1;
            for(b; b > -1; --b){
                var item1 = items1[a];
                var item2 = items2[b];
                if(this.checkCollision(item1, item2)){
                    item1.destroy();
                    item2.destroy();
                }
            }
        }
    }

    checkCollision(obj1, obj2){
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if(length < obj1.radius + obj2.radius){
            return true;
        }
        return false;
    }

    updateObjects(items, group){
        let index = 0;
        for (let item of items) {
            if (item.delete) {
                this[group].splice(index, 1);
            }else{
                items[index].render(this.state);
            }
            index++;
        }
    }

    update() {

        this.state.ctx.fillStyle = "rgba(0,0,0,0.6)";
        this.state.ctx.fillRect(0, 0, this.state.screen.width, this.state.screen.height);



        // updateLives();

        // updateScore();

        // if (self.lives == 0) {
        //     restart();
        // }

        // this.checkCollisionsWith(this.bullets, this.asteroids);
        // this.checkCollisionsWith(this.ship, this.asteroids);

        // Remove or render
        // this.updateObjects(this.particles, 'particles')
        // this.updateObjects(this.asteroids, 'asteroids')
        this.updateObjects(this.bullets, 'bullets')
        this.updateObjects(this.shipFighters, 'shipFighters')
        this.updateObjects(this.enemies, 'enemies');
        //
        //
        // this.enemies.forEach(function(enemy){
        //     // console.log(enemy);
        //
        //     // console.log(self.ctx);
        //     enemy.render(this.state.ctx.bind(this));
        // })
        //
        requestAnimationFrame(this.update.bind(this));

    }
}

export default Game;