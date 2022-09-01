import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './utils/Camera'
import Renderer from './utils/Render'
import World from './world/world'
import * as THREE from 'three'

let instance: any = null

export class Experience {
    canvas: any
    sizes
    time
    scene
    camera
    renderer
    world

    constructor(canvas: any) {
        if (instance) {
            return instance
        }
        instance = this

        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera(canvas)
        this.renderer = new Renderer(canvas)
        this.world = new World(canvas)

        this.sizes.on('resize', () => {
            console.log('A resize occurred');
        })
        this.time.on('tick', () => {
            this.update()
        })
    }

    update() {
        this.camera?.update()
    }

    resize() {
        this.camera?.resize();
        this.renderer?.resize()
    }
}

export const useExperience = (canvas: any) => {
    new Experience(canvas)
}