import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
    sources
    items: any
    toLoad
    loaded
    loaders: any

    constructor(sources: any) {
        super()

        this.sources = sources
        this.toLoad = this.sources.length
        this.loaded = 0
        this.items = []
        this.loaders
        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path, (file: any) => {
                        this.sourceLoaded(source, file)
                    }
                )
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file: any) => {
                    this.sourceLoaded(source, file)
                })
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file: any) => {
                    this.sourceLoaded(source, file)
                })
            }
        }
    }

    sourceLoaded(source: any, file: any) {
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    }
}