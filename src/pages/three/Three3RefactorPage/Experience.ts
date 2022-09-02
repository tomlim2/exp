import * as THREE from 'three'

import Sizes from "@/pages/three/Three3RefactorPage/util/Sizes";
import Time from "@/pages/three/Three3RefactorPage/util/Time";
import Camera from "@/pages/three/Three3RefactorPage/util/Camera";
import Renderer from "@/pages/three/Three3RefactorPage/util/Renderer";
import World from "./world/World";
import sources from "./sources";
import Resources from "./util/Resources";
import Debug from "./util/Debug";

export class Experience {
    canvas
    scene
    debug
    resources
    world
    camera
    renderer
    sizes
    time

    constructor(canvas: any) {
        this.canvas = canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World(this)
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)


        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time.on('tick', () => {
            this.update()
        })

    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active){
            this.debug.ui?.destroy()
        }
    }
}

export const useExperience = (canvas: any) => {
    return new Experience(canvas)
}