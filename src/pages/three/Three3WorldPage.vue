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
import sources from "@/pages/three/Three3WorldResources";
import * as THREE from "three";

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

    const setEnvironmentMap = async (envSources: any, scene: any) => {
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

    onMounted(() => {
      const canvas = document.querySelector(
        "#render-journey-texture"
      ) as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /**
       * Object
       */
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial()
      );

      scene.add(cube);

      /**
       * Light
       */
      const sunLight = new THREE.DirectionalLight("#ffffff", 4);

      setSunLight(sunLight, scene);

      resources.on("ready", () => {
        setEnvironmentMap(resources, scene);
      });

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

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();
        // console.log(elapsedTime);

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

