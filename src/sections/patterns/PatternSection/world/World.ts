import DisplayMesh from './DisplayMesh'
import Experience from '../Experience'

export default class World {
    experience
    scene
    resources
    displayMesh: DisplayMesh | undefined

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resources.on('ready', () => {
            this.displayMesh = new DisplayMesh(this.experience)
        })
    }

    update() {
        
    }
}