// import EnemiesShip from 'EnemiesShip.es6';
// import Part from "Part";
import ShipFighter from "./ShipFighter.es6";
import EnemyShip from "./EnemyShip.es6";


'use strict';

class Game {

    constructor() {
        let self = this;

        self.canvas = document.getElementById("ship-fighter");
        self.ctx = self.canvas.getContext("2d");
        self.canvas.width = 600;
        self.canvas.height = 500;
        
        self.shipFighter = new ShipFighter(this);
        
        self.enemies = [];
        self.lives = 5;
        self.score = 0;
        init();

        function init() {

            draw();

            self.createEnemies();
        }


        function draw() {

            self.ctx.fillStyle = "rgba(0,0,0,0.6)";
            self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);


            self.shipFighter.draw();

            // render_bullets();

            renderEnemies();


            // updateLives();

            // updateScore();

            // if (self.lives == 0) {
            //     restart();
            // }

            requestAnimationFrame(draw);
        }

        function renderEnemies() {

            self.enemies.forEach(function (enemy, i) {
                enemy.draw();

                if (enemy.y > self.canvas.height) {
                    self.enemies.splice(i, 1);
                    self.lives--;

                }
            })
        }

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

    createEnemies() {

        let self = this;

        let enemy = new EnemyShip(self.canvas, self.ctx);
        self.enemies.push(enemy);

        let emenies_interval = setInterval(function () {

            if (window.blurred) {
                return;
            }

            let enemy = new EnemyShip(self.canvas, self.ctx);

            self.enemies.push(enemy);

        }, 2000)


    }
}

export default Game;