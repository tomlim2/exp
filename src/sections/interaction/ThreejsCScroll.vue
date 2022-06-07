<template>
  <div id="outline-three-js-c" class="outline-three-js-c">
    <div id="render-three-c" class="render-three-c" />
    <section class="section">
      <h1>My Portfolio</h1>
    </section>
    <section class="section">
      <h2>My projects</h2>
    </section>
    <section class="section">
      <h2>Contact me</h2>
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
       * Test cube
       */
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: "#ff0000" })
      );
      scene.add(cube);

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
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(sizes.width, sizes.height);
      canvas.appendChild(renderer.domElement);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */
      //   const clock = new THREE.Clock();

      const tick = () => {
        // const elapsedTime = clock.getElapsedTime();

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
  background-color: $black-100;

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

