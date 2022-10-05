import * as THREE from 'three'
import Experience from '../Experience'
import shaderPattern from "@/shaders/patterns/index";

export default class DisplayMesh {
    experience
    scene
    resources
    geometry: any
    material: any
    mesh: any

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.geometry
        this.material
        this.mesh

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 20, 20);
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: shaderPattern.pattern1.vertexShader,
            fragmentShader: shaderPattern.pattern1.fragmentShader,
            side: THREE.DoubleSide,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}