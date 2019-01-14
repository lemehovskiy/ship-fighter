import Bullet from "./Bullet.es6";

class Weapon {
    constructor(args) {
        this.create = args.ship.create;
    }

    shoot(args) {
        let bullet = new Bullet({
            position: {
                x: args.position.x,
                y: args.position.y
            }
        });

        this.create(bullet, 'bullets');
    }


    // draw() {
    //     this.drawBullets();
    //     requestAnimationFrame(this.draw.bind(this));
    // }
    //
    // drawBullets() {
    //     let self = this;
    //
    //     self.bullets.forEach(function (bullet, bulletIndex) {
    //
    //         if (bullet.exploded) {
    //             bullet.draw_parts();
    //
    //             if (bullet.parts.length == 0) {
    //                 self.bullets.splice(bulletIndex, 1);
    //             }
    //         }
    //         else {
    //             bullet.draw();
    //
    //             self.game.enemies.forEach(function (enemy, enemyIndex) {
    //                 if (
    //                     bullet.x > enemy.x &&
    //                     bullet.x < enemy.x + enemy.width &&
    //                     bullet.y <= enemy.y + enemy.height &&
    //                     bullet.y > enemy.y
    //
    //                 ) {
    //
    //                     enemy.explode();
    //
    //                     self.game.enemies.splice(enemyIndex, 1);
    //
    //                     self.score += 10;
    //
    //                     // updateScore();
    //                 }
    //             });
    //         }
    //
    //
    //         if (bullet.y < 0) {
    //             self.bullets.splice(bulletIndex, 1);
    //         }
    //     });
    //
    // }
}

export default Weapon;