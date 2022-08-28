<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default defineComponent({
  setup() {
    const state = reactive({});

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
        new THREE.MeshBasicMaterial()
      );
      scene.add(cube);

      /**
       * Resize
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
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.z = 3;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
      });
      canvas.appendChild(renderer.domElement);
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

.three-journey-texture {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-200;
  z-index: 20;
}
</style>

