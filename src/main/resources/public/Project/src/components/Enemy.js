import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { Mesh, TextureLoader, MeshPhongMaterial, Vector3 } from "three"
import Animation from './Animation'
import enemy from "./models/hd/two.jpg"

export default class Enemy {
    constructor(scene, manager, x, z) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
        this.x = x
        this.z = z
    }

    load(path) {
        new MD2Loader(this.manager).load(
            path,
            geometry => {

                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(enemy),
                    morphTargets: true
                }))

                this.mesh.scale.set(2.3, 2.3, 2.3)

                console.log(this.geometry.animations)

                this.scene.add(this.mesh);

                this.mesh.position.x = this.x * 150
                this.mesh.position.y = 35
                this.mesh.position.z = this.z * 150
            },
        );
    }

    unload() {
        this.scene.remove(this);
    }
}