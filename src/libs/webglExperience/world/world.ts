import * as THREE from 'three'
import { Experience } from '../Experience'

export default class World {
    experience
    scene

    constructor(canvas: any) {
        this.experience = new Experience(canvas)
        this.scene = this.experience.scene

        const testMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ wireframe: true }))

        console.log(this.scene);
        
        this.scene?.add(testMesh)

        console.log(2);
    }
}