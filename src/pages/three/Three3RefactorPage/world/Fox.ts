import * as THREE from 'three'
import Experience from '../Experience'

export default class Fox {
    experience
    scene
    resources
    time
    debug
    debugFolder: any
    model: any
    animation: any

    constructor(experience: Experience) {

        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources.items.foxModel
        this.time = this.experience.time

        this.debug = this.experience.debug
        this.debugFolder

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        this.model
        this.setModel()
        this.animation = {}
        this.setAnimation()
    }

    setModel() {
        this.model = this.resources.scene
        this.model.scale.set(.02, .02, .02)
        this.scene.add(this.model)

        this.model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setAnimation() {
        this.animation = {}

        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resources.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resources.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resources.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name: string) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }
        if (this.debug.active) {
            const debugObject = {
                playIdle: () => {
                    this.animation.play('idle')
                },
                playWalking: () => {
                    this.animation.play('walking')
                },
                playRunning: () => {
                    this.animation.play('running')
                },
            }

            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }

    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }


}