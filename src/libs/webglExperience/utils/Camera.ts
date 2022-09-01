import * as THREE from 'three'
import { Experience } from "../Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    experience
    sizes
    scene
    canvas
    instance: any
    controls: any

    constructor(canvas: any) {
        this.experience = new Experience(canvas)
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.instance
        this.controls

        this.setInstance()
        this.setControls()
    }

    setInstance() {
        if (!this.sizes) return

        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, .1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene?.add(this.instance)
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        if (!this.sizes) return

        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectMatrix()
    }
    
    update() {
        this.controls.update()
    }
}