<template>
  <div id="outline-three-js-c" class="outline-three-js-c">
    <div id="render-three-c" class="render-three-c" />
    <section class="section">
      <h1>TEXT1</h1>
    </section>
    <section class="section">
      <h2>TEXT2</h2>
    </section>
    <section class="section">
      <h2>TEXT3</h2>
    </section>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

import * as THREE from "three";
import * as dat from "lil-gui";

export default defineComponent({
  setup() {
    const state = reactive({});
    onMounted(() => {
      /**
       * Debug
       */
      const gui = new dat.GUI();

      const parameters = {
        materialColor: "#ffeded",
      };

      gui.addColor(parameters, "materialColor");

      /**
       * Base
       */
      // Canvas
      const canvas = document.querySelector("#render-three-c") as HTMLElement;

      // Scene
      const scene = new THREE.Scene();

      /**
       * Objects
       */

      const textureLoader = new THREE.TextureLoader();
      const gradientTexture = textureLoader.load(
        "/assets/texture/gradients/3.jpg"
      );
      gradientTexture.magFilter = THREE.NearestFilter;

      const toonMaterial = new THREE.MeshToonMaterial({
        color: parameters.materialColor,
        gradientMap: gradientTexture,
      });

      const mesh1 = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.4, 16, 60),
        toonMaterial
      );

      const mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 32),
        toonMaterial
      );

      const mesh3 = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
        toonMaterial
      );

      const objectsDistance = 4;

      mesh1.position.y = -objectsDistance * 0;
      mesh2.position.y = -objectsDistance * 1;
      mesh3.position.y = -objectsDistance * 2;

      const sectionMeshes = [mesh1, mesh2, mesh3];

      scene.add(mesh1, mesh2, mesh3);

      /**
       * Lights
       */
      const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
      directionalLight.position.set(1, 1, 0);
      scene.add(directionalLight);

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

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

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 6;
      scene.add(camera);

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(sizes.width, sizes.height);
      canvas.appendChild(renderer.domElement);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        for (const mesh of sectionMeshes) {
          mesh.rotation.x = elapsedTime * 0.1;
          mesh.rotation.y = elapsedTime * 0.12;
        }

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

.outline-three-js-c {
  background-color: $black-0;

  .render-three-c {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
  }

  .section {
    display: flex;
    align-items: center;
    height: 100vh;
    position: relative;
    font-family: "Cabin", sans-serif;
    color: #ffeded;
    text-transform: uppercase;
    font-size: 7vmin;
    padding-left: 10%;
    padding-right: 10%;
  }

  section:nth-child(odd) {
    justify-content: flex-end;
  }
}
</style>

