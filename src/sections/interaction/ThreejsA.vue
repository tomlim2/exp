<template>
  <div id="outline-three-js-a" class="outline-three-js-a">
    <div id="render-three-a" class="render-three-a"></div>
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
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth/2, window.innerHeight/2);
      (document.querySelector("#render-three-a") as HTMLElement).appendChild(
        renderer.domElement
      );

      const controls = new OrbitControls(camera, renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      controls.update()

      function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update()
        controls.enableDamping = true;

        renderer.render(scene, camera);
      }
      animate();
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.outline-three-js-a {
  position: relative;
  width: 100vw;
  height: 50vh;
  background-color: $black-100;
  z-index: 20;
}
</style>

