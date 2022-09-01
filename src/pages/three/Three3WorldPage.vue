<template>
  <div id="three-world" class="three-world">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useSizes } from "@/libs/three/Sizes";
import { useResource } from "@/libs/three/Resources";
import sources from "@/pages/three/Three3WorldPage/Three3WorldResources";
import * as THREE from "three";
import * as dat from "lil-gui";

export default defineComponent({
  setup() {
    const state: any = reactive({
      resources: undefined,
    });

    const sizes = useSizes();
    const resources = useResource(sources);

    const setSunLight = (sunLight: any, scene: any) => {
      sunLight.castShadow = true;
      sunLight.shadow.camera.far = 15;
      sunLight.shadow.mapSize.set(1024, 1024);
      sunLight.shadow.normalBias = 0.05;
      sunLight.position.set(3, 3, -2.25);

      scene.add(sunLight);
    };

    const setCamera = (scene: any, camera: any) => {
      camera.position.set(6, 4, 8);

      scene.add(camera);
    };

    const setRender = (renderer: any, sizes: any) => {
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.CineonToneMapping;
      renderer.toneMappingExposure = 1.75;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const setEnvironmentMap = (envSources: any, scene: any) => {
      const environmentMap: any = {};
      environmentMap.intensity = 0.4;
      environmentMap.texture = envSources.items.environmentMapTexture;
      environmentMap.texture.encoding = THREE.sRGBEncoding;
      scene.environment = environmentMap.texture;

      environmentMap.updateMaterials = () => {
        scene.traverse((child: any) => {
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            child.material.envMap = environmentMap.texture;
            child.material.envMapIntensity = environmentMap.intensity;
            child.material.needsUpdate = true;
          }
        });
      };
      environmentMap.updateMaterials();
    };

    const setFloor = (resources: any, scene: any) => {
      const floorGeo = new THREE.CircleGeometry(5, 64);

      let textures: any = {};

      textures.color = resources.items.grassColorTexture;
      textures.color.encoding = THREE.sRGBEncoding;
      textures.color.repeat.set(1.5, 1.5);
      textures.color.wrapS = THREE.RepeatWrapping;
      textures.color.wrapT = THREE.RepeatWrapping;

      textures.normal = resources.items.grassNormalTexture;
      textures.normal.repeat.set(1.5, 1.5);
      textures.normal.wrapS = THREE.RepeatWrapping;
      textures.normal.wrapT = THREE.RepeatWrapping;

      let material = new THREE.MeshStandardMaterial({
        map: textures.color,
        normalMap: textures.normal,
      });

      let mesh = new THREE.Mesh(floorGeo, material);

      mesh.rotation.x = -Math.PI * 0.5;
      mesh.receiveShadow = true;

      scene.add(mesh);
    };

    onMounted(() => {
      const gui = new dat.GUI();
      let isLoaded = false;
      let animation: any = {};

      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /**
       * Object
       */
      animation.play = (name: any) => {
        const newAction = animation.actions[name];
        const oldAction = animation.actions.current
          ? animation.actions.current
          : newAction;

        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 1);

        animation.actions.current = newAction;
      };

      resources.on("ready", () => {
        setFloor(resources, scene);
        const model = resources.items.foxModel.scene;
        model.scale.set(0.02, 0.02, 0.02);

        scene.add(model);
        animation.mixer = new THREE.AnimationMixer(model);

        animation.actions = {};

        animation.actions.idle = animation.mixer.clipAction(
          resources.items.foxModel.animations[0]
        );
        animation.actions.walking = animation.mixer.clipAction(
          resources.items.foxModel.animations[1]
        );
        animation.actions.running = animation.mixer.clipAction(
          resources.items.foxModel.animations[2]
        );

        animation.play("walking");

        const debugObject = {
            playIdle:()=>animation.play('idle'),
            playWalking:()=>animation.play('walking'),
            playRunning:()=>animation.play('running'),
        };
        const folder = gui.addFolder('fox')
        folder.add(debugObject, 'playIdle')
        folder.add(debugObject, 'playWalking')
        folder.add(debugObject, 'playRunning')
        console.log(gui);
        

        model.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
          }
        });

        setEnvironmentMap(resources, scene);
        isLoaded = true;
      });

      /**
       * Light
       */
      const sunLight = new THREE.DirectionalLight("#ffffff", 4);

      setSunLight(sunLight, scene);

      /**
       * Camera
       */

      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );

      setCamera(scene, camera);

      /**
       * Controls
       */

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
      });

      canvas.appendChild(renderer.domElement);

      setRender(renderer, sizes);

      /**
       * Animate
       */

      //   const clock = new THREE.Clock();
      //   let delta = 0;
      //   const current = Date.now();

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();
        // delta = Date.now() - current;
        if (isLoaded) {
          animation.mixer.update(0.01);
        }

        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
      };

      tick();

      window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    });

    onUnmounted(() => {
      resources.off("ready");
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.three-world {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-200;
  z-index: 20;
}
</style>

