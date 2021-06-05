import { Sprite, Vector3 } from "three"

export default class Particle extends Sprite {
    constructor(material, y) {
        super()

        this.material = material.clone()
        this.scale.set(
            Math.random() * 30,
            Math.random() * 30,
            Math.random() * 30
        );

        this.position.y = 10 + (y / 4)
    }

    update() {
        this.position.x = Math.random() * 5
        this.position.z = Math.random() * 5

        if (this.position.y > 35) {
            this.position.y = 10;
            this.material.opacity = 1;
        }

        this.material.opacity -= 0.02;
        this.position.y += 0.6
    }
}