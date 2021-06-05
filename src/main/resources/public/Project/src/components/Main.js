import { AxesHelper, Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Model from "./Model"
import Keyboard from "./Keyboard"
import Animation from "./Animation"
import Config from './Config';
import Floor from './Floor';
import Board from './Board';
import Background from './Background';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import player from "./models/unit02/tris.md2"

import {
    BoxGeometry,
    LinePhongMaterial,
    Line,
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    AmbientLight,
    Ray,
    Raycaster
} from 'three';

export default class Main {
    constructor(container, level) {
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.raycaster = new Raycaster()
        this.distance = null
        this.distance2 = null

        new Background(this.scene)
        new Floor(this.scene, level.size)
        this.board = new Board(this.scene, level.list, level.size)
        this.ambient = new AmbientLight(0xffffff, 0.1);
        this.scene.add(this.ambient);

        /* STATIC INPUT AND RANGES - FULL CONSOLE OPTIONS */
        document.getElementById("cienie").addEventListener("change", (e) => {
            this.renderer.threeRenderer.shadowMap.enabled = e.target.checked
            this.scene.traverse(function (child) {
                if (child.material) {
                    child.material.needsUpdate = true
                }
            })
        })
        /* END CONSOLE OPTIONS */

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        // zegar - vide lekcja 4

        this.clock = new Clock()

        // manager loadingu, pozwala monitorować progress oraz fakt zakończenia ładowania

        this.manager = new LoadingManager();

        // this.manager.onProgress = (item, loaded, total) => {
        //     console.log(`progress ${item}: ${loaded} ${total}`);
        // };

        this.model = new Model(this.scene, this.manager);
        this.model.load(player);

        this.manager.onLoad = () => {

            this.isLoaded = true;

            this.animation = new Animation(this.model.mesh)

            var x; var z
            for (let i = 0; i < level.size; i++) {
                var position = true;
                for (let k = 0; k < level.list.length; k++) {
                    if (i == level.list[k].id) position = false
                }
                if (position == true) {
                    x = Math.floor(i / 10) - 5
                    z = i % 10 - 5
                }
            }

            this.model.mesh.position.x = x * 150
            this.model.mesh.position.y = 35
            this.model.mesh.position.z = z * 150
            this.model.mesh.lookAt(new Vector3(0, 35, 0))

            this.animation.playAnim("1stand")

            this.keyboard = new Keyboard(window, this.animation, this.model.mesh);
        }

        this.render();
    }

    render() {
        this.stats.begin()

        var delta = this.clock.getDelta();
        if (this.animation) this.animation.update(delta)

        this.renderer.render(this.scene, this.camera.threeCamera);

        this.board.firePlaces.forEach(fireplace => {
            fireplace.update()
        })

        if (this.model.mesh) {
            if (Config.rotateLeft) {
                this.model.mesh.rotation.y += 0.05
            }
            if (Config.rotateRight) {
                this.model.mesh.rotation.y -= 0.05
            }
            if (Config.moveForward && this.distance > 50) {
                if (Config.sprint) this.model.mesh.translateX(3)
                this.model.mesh.translateX(3)
            }
            if (Config.moveBack && this.distance2 > 50) {
                this.model.mesh.translateX(-1)
            }


            /* DYNAMIC INPUT AND RANGES - FULL CONSOLE OPTIONS */
            if (document.getElementById("widok_gora").checked == false) {
                const camVect = new Vector3(-200, 50, 0)
                const camPos = camVect.applyMatrix4(this.model.mesh.matrixWorld);
                this.camera.threeCamera.position.x = camPos.x
                this.camera.threeCamera.position.y = camPos.y
                this.camera.threeCamera.position.z = camPos.z
                this.camera.threeCamera.lookAt(this.model.mesh.position)
            } else {
                this.camera.threeCamera.position.set(0, 2000, 0)
                this.camera.threeCamera.lookAt(0, 0, 0)
            }
            /* END CONSOLE OPTIONS */
        }

        if (this.board.boolean && this.isLoaded) {
            for (let i = 0; i < this.board.enemies.length; i++) {
                this.board.enemies[i].mesh.lookAt(this.model.mesh.position)
                if (this.board.enemies[i].mesh.position.z > this.model.mesh.position.z) this.board.enemies[i].mesh.rotation.y += Math.PI / 2
                else this.board.enemies[i].mesh.rotation.y -= Math.PI / 2

                this.board.animations[i].update(delta)
            }
        }

        if (this.isLoaded == true) {
            {
                var vector = new Vector3(0, 1, 0)
                var rayvector = new Vector3();
                var ray = new Ray(this.model.mesh.position, this.model.mesh.getWorldDirection(rayvector).multiplyScalar(1).applyAxisAngle(vector, Math.PI / 2))
                this.raycaster.ray = ray
                var intersects = this.raycaster.intersectObjects(this.board.walls);
                this.distance = intersects[0].distance
            }

            {
                var vector = new Vector3(0, -1, 0)
                var rayvector = new Vector3();
                var ray = new Ray(this.model.mesh.position, this.model.mesh.getWorldDirection(rayvector).multiplyScalar(1).applyAxisAngle(vector, Math.PI / 2))
                this.raycaster.ray = ray
                var intersects = this.raycaster.intersectObjects(this.board.walls);
                this.distance2 = intersects[0].distance
            }
        }

        this.stats.end()
        this.renderer.render(this.scene, this.camera.threeCamera);

        requestAnimationFrame(this.render.bind(this));
    }
}