import * as THREE from 'three'
import { Experience } from "../Experience"

export default class Renderer {
    experience
    canvas
    sizes
    scene
    camera
    instance: any

    constructor(canvas: any) {
        this.experience = new Experience(canvas)
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.instance
        this.setInstance()
    }

    setInstance() {
        if (!this.sizes) return

        this.instance = new THREE.WebGLRenderer({
            antialias: true
        })
        this.canvas.appendChild(this.instance.domElement)
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.instance.name = 'hi'

        console.log(this.instance);

    }

    resize() {
        if (!this.sizes) return
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes?.pixelRatio, 2))
    }

    update() {
        if (!this.camera) return

        this.instance.render(this.scene, this.camera.instance)
    }
}
