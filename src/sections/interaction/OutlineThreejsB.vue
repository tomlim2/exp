<template>
  <div id="outline-three-js-a" class="outline-three-js-a">
    <div id="render-three" class="render-three"></div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

interface debugObject {
  clearColor: string;
}

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      /**
       * Base
       */
      // Debug
      const debugObject: debugObject = {
        clearColor: "",
      };

      const gui = new dat.GUI({
        width: 400,
      });

      const canvas = document.querySelector("#render-three") as HTMLElement;

      const sizes = {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      };

      /**
       * Sizes
       */

      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      // Scene
      const scene = new THREE.Scene();

      /**
       * Loaders
       */
      // Texture loader
      const textureLoader = new THREE.TextureLoader();

      // Draco loader
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");

      // GLTF loader
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      /**
       * Models
       */

      /* Texture */
      const bakedTexture = textureLoader.load("/models/portal.jpg");
      bakedTexture.flipY = false;
      bakedTexture.encoding = THREE.sRGBEncoding;

      /* Baked material */
      const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });
      const portalLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });
      const poleLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffe5,
      });

      gltfLoader.load(
        "/models/portal.glb",
        function (gltf) {
          // gltf.scene.traverse((child: any) => {
          //   child.material = bakedMaterial;
          // });
          const bakedtMesh = gltf.scene.children.find(
            (child) => child.name == "baked"
          ) as any;
          const portalLightMesh = gltf.scene.children.find(
            (child) => child.name == "portal"
          ) as any;
          const poleLightAMesh = gltf.scene.children.find(
            (child) => child.name == "poleLightA"
          ) as any;
          const poleLightBMesh = gltf.scene.children.find(
            (child) => child.name == "poleLightB"
          ) as any;

          bakedtMesh.material = bakedMaterial;
          portalLightMesh.material = portalLightMaterial;
          poleLightAMesh.material = poleLightMaterial;
          poleLightBMesh.material = poleLightMaterial;

          scene.add(gltf.scene);
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.log(error);
        }
      );

      /**
       * Fireflies
       */
      // Geometry
      const firefliesGeometry = new THREE.BufferGeometry();
      const firefliesCount = 30;
      const positionArray = new Float32Array(firefliesCount * 3);

      for (let index = 0; index < firefliesCount; index++) {
        positionArray[index * 3 + 0] = Math.random() * 4;
        positionArray[index * 3 + 1] = Math.random() * 4;
        positionArray[index * 3 + 2] = Math.random() * 4;
      }

      firefliesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positionArray, 3)
      );

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      canvas.appendChild(renderer.domElement);
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;

      debugObject.clearColor = "#201919";
      renderer.setClearColor(debugObject.clearColor);
      gui.addColor(debugObject, "clearColor").onChange(() => {
        renderer.setClearColor(debugObject.clearColor);
      });

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        45,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.x = 4;
      camera.position.y = 2;
      camera.position.z = 4;
      // scene.add(camera);

      // Controls

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.update();

      /**
       * Animate
       */
      // const clock = new THREE.Clock();

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.outline-three-js-a {
  width: 100vw;
  height: 100vh;
  background-color: $black-400;

  #render-three {
    width: 400px;
    height: 200px;
  }
}
</style>

