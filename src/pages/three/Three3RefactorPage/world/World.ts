import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'
import Experience from '../Experience'

export default class World {
    experience
    scene
    resources
    floor: any
    fox: any
    environment: any

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resources.on('ready', () => {
            this.floor = new Floor(this.experience)
            this.fox = new Fox(this.experience)
            this.environment = new Environment(this.experience)
        })
    }

    update() {
        if (this.fox) this.fox.update()
    }
}